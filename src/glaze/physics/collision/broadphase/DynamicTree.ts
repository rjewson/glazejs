import { AABB2 } from "../../../geom/AABB2";
import { BFProxy } from "../BFProxy";
import { Ray } from "../Ray";
import { RayAABB, Collide } from "../Intersect";
import { DebugRenderer } from "../../../graphics/render/debug/DebugRenderer";
import { Pool } from "../../../util/Pool";
import { MAXINT } from "../../../util/Maths";

const boundsPadding: number = 5;
const dynamicTreeVelocityMultiplyer: number = 3;

export class TreeNode {
    public parent: TreeNode;
    public left: TreeNode;
    public right: TreeNode;
    public bounds: AABB2 = new AABB2();
    public height: number;
    public body: BFProxy;

    constructor(parent?: TreeNode) {
        this.reset(parent);
    }

    reset(parent?: TreeNode) {
        this.parent = parent || null;
        this.body = null;
        this.bounds.reset();
        this.left = null;
        this.right = null;
        this.height = 0;
    }

    public isLeaf(): boolean {
        return !this.left && !this.right;
    }
}

export class DynamicTree {
    public root: TreeNode;
    public nodes: Map<number, TreeNode>;
    public tempBounds: AABB2;
    public nodePool: Pool<TreeNode>;

    constructor(
        public worldBounds: AABB2 = new AABB2(-Number.MAX_VALUE, -Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)
    ) {
        this.root = null;
        this.nodes = new Map(); //{};
        this.tempBounds = new AABB2();
        this.nodePool = new Pool(() => new TreeNode());
        this.nodePool.addCapacity(10000);
    }

    private insertNode(leaf: TreeNode): void {
        // If there are no nodes in the tree, make this the root leaf
        if (this.root === null) {
            this.root = leaf;
            this.root.parent = null;
            return;
        }

        // Search the tree for a node that is not a leaf and find the best place to insert
        var leafAABB = leaf.bounds;
        var currentRoot = this.root;
        while (!currentRoot.isLeaf()) {
            const left = currentRoot.left;
            const right = currentRoot.right;

            const area = currentRoot.bounds.perimeter();
            // var combinedAABB = currentRoot.bounds.combine(leafAABB);
            // var combinedArea = combinedAABB.perimeter();
            const combinedArea = this.tempBounds.combine2(currentRoot.bounds, leafAABB).perimeter();

            // Calculate cost heuristic for creating a new parent and leaf
            const cost = 2 * combinedArea;

            // Minimum cost of pushing the leaf down the tree
            const inheritanceCost = 2 * (combinedArea - area);

            // Cost of descending
            var leftCost = 0;
            const leftCombinedPerimeter = this.tempBounds.combine2(leafAABB, left.bounds).perimeter(); // leafAABB.combine(left.bounds);
            var newArea = 0;
            var oldArea = 0;
            if (left.isLeaf()) {
                leftCost = leftCombinedPerimeter + inheritanceCost;
            } else {
                oldArea = left.bounds.perimeter();
                newArea = leftCombinedPerimeter;
                leftCost = newArea - oldArea + inheritanceCost;
            }

            var rightCost = 0;
            const rightCombinedPerimeter = this.tempBounds.combine2(leafAABB, right.bounds).perimeter(); // leafAABB.combine(right.bounds);
            if (right.isLeaf()) {
                rightCost = rightCombinedPerimeter + inheritanceCost;
            } else {
                oldArea = right.bounds.perimeter();
                newArea = rightCombinedPerimeter;
                rightCost = newArea - oldArea + inheritanceCost;
            }

            // cost is acceptable
            if (cost < leftCost && cost < rightCost) {
                break;
            }

            // Descend to the depths
            if (leftCost < rightCost) {
                currentRoot = left;
            } else {
                currentRoot = right;
            }
        }

        // Create the new parent node and insert into the tree
        var oldParent = currentRoot.parent;
        // var newParent = new TreeNode(oldParent);
        var newParent = this.nodePool.reserve();
        newParent.reset(oldParent);
        // console.log(this.nodePool.assigned);
        // newParent.bounds = leafAABB.combine(currentRoot.bounds);
        newParent.bounds.combine2(leafAABB, currentRoot.bounds);
        newParent.height = currentRoot.height + 1;

        if (oldParent !== null) {
            // The sibling node was not the root
            if (oldParent.left === currentRoot) {
                oldParent.left = newParent;
            } else {
                oldParent.right = newParent;
            }

            newParent.left = currentRoot;
            newParent.right = leaf;

            currentRoot.parent = newParent;
            leaf.parent = newParent;
        } else {
            // The sibling node was the root
            newParent.left = currentRoot;
            newParent.right = leaf;

            currentRoot.parent = newParent;
            leaf.parent = newParent;
            this.root = newParent;
        }

        // Walk up the tree fixing heights and AABBs
        var currentNode = leaf.parent;
        while (currentNode) {
            currentNode = this.balanceNode(currentNode);

            if (!currentNode.left) {
                throw new Error("Parent of current leaf cannot have a null left child" + currentNode);
            }
            if (!currentNode.right) {
                throw new Error("Parent of current leaf cannot have a null right child" + currentNode);
            }

            currentNode.height = 1 + Math.max(currentNode.left.height, currentNode.right.height);
            // currentNode.bounds = currentNode.left.bounds.combine(currentNode.right.bounds);
            currentNode.bounds.combine2(currentNode.left.bounds, currentNode.right.bounds);

            currentNode = currentNode.parent;
        }
    }

    private removeNode(leaf: TreeNode) {
        if (leaf === this.root) {
            this.root = null;
            return;
        }

        const parent = leaf.parent;
        const grandParent = parent.parent;
        var sibling: TreeNode;
        if (parent.left === leaf) {
            sibling = parent.right;
        } else {
            sibling = parent.left;
        }

        if (grandParent) {
            if (grandParent.left === parent) {
                grandParent.left = sibling;
            } else {
                grandParent.right = sibling;
            }
            sibling.parent = grandParent;
            // DELETE PARENT!!
            this.nodePool.free(parent);

            var currentNode = grandParent;
            while (currentNode) {
                currentNode = this.balanceNode(currentNode);
                // currentNode.bounds = currentNode.left.bounds.combine(currentNode.right.bounds);
                currentNode.bounds.combine2(currentNode.left.bounds, currentNode.right.bounds);
                currentNode.height = 1 + Math.max(currentNode.left.height, currentNode.right.height);

                currentNode = currentNode.parent;
            }
        } else {
            this.root = sibling;
            sibling.parent = null;
            //DELETE PARENT;
            this.nodePool.free(parent);
        }
    }

    /**
     * Tracks a body in the dynamic tree
     */
    public trackBody(body: BFProxy) {
        // var node = new TreeNode();
        var node = this.nodePool.reserve();
        node.reset();
        node.body = body;
        node.bounds.copyAABB(body.aabb);
        node.bounds.expand(2);
        this.nodes.set(body.id, node);
        this.insertNode(node);
    }

    /**
     * Updates the dynamic tree given the current bounds of each body being tracked
     */
    public updateBody(body: BFProxy) {
        var node = this.nodes.get(body.id);
        if (!node) {
            return false;
        }
        // var b = body.aabb.toAABB2();
        // body.aabb.copyToAABB2(this.tempBounds);
        this.tempBounds.copyAABB(body.aabb);

        var multdx = body.body.delta.x;
        var multdy = body.body.delta.y;

        if (multdx < 0) {
            this.tempBounds.l += multdx;
        } else {
            this.tempBounds.r += multdx;
        }

        if (multdy < 0) {
            this.tempBounds.t += multdy;
        } else {
            this.tempBounds.b += multdy;
        }

        // sqthis.tempBounds.transform(body.body.position);
        // if the body is outside the world no longer update it
        // console.log("a");

        // if (!this.worldBounds.contains(this.tempBounds)) {
        //     //    Logger.getInstance().warn('Actor with id ' + body.actor.id +
        //     //       ' is outside the world bounds and will no longer be tracked for physics');
        //     this.untrackBody(body);
        //     return false;
        // }
        // console.log("b");

        // Fixme this is wrong
        if (node.bounds.contains(this.tempBounds)) {
            return false;
        }

        this.removeNode(node);
        this.tempBounds.l -= boundsPadding;
        this.tempBounds.t -= boundsPadding;
        this.tempBounds.r += boundsPadding;
        this.tempBounds.b += boundsPadding;

        multdx = body.body.delta.x * dynamicTreeVelocityMultiplyer;
        multdy = body.body.delta.y * dynamicTreeVelocityMultiplyer;
        // TODO Fix this hack
        // var multdx = (body.body ? body.body.delta.x : 5) * dynamicTreeVelocityMultiplyer;
        // var multdy = (body.body ? body.body.delta.y : 5) * dynamicTreeVelocityMultiplyer;

        if (multdx < 0) {
            this.tempBounds.l += multdx;
        } else {
            this.tempBounds.r += multdx;
        }

        if (multdy < 0) {
            this.tempBounds.t += multdy;
        } else {
            this.tempBounds.b += multdy;
        }

        // node.bounds = b;
        node.bounds.copy(this.tempBounds);
        this.insertNode(node);
        // console.log("rebalance");
        return true;
    }

    /**
     * Untracks a body from the dynamic tree
     */
    public untrackBody(body: BFProxy) {
        var node = this.nodes.get(body.id);
        if (!node) {
            return;
        }
        this.removeNode(node);
        // DELETE NODE
        this.nodePool.free(node);
        // this.nodes[body.id] = null;
        // delete this.nodes[body.id];
        this.nodes.delete(body.id);
    }

    /**
     * Balances the tree about a node
     */
    private balanceNode(node: TreeNode) {
        if (node.isLeaf() || node.height < 2) {
            return node;
        }

        var left = node.left;
        var right = node.right;

        var a = node;
        var b = left;
        var c = right;
        var d = left.left;
        var e = left.right;
        var f = right.left;
        var g = right.right;

        var balance = c.height - b.height;
        // Rotate c node up
        if (balance > 1) {
            // Swap the right node with it's parent
            c.left = a;
            c.parent = a.parent;
            a.parent = c;

            // The original node's old parent should point to the right node
            // this is mega confusing
            if (c.parent) {
                if (c.parent.left === a) {
                    c.parent.left = c;
                } else {
                    c.parent.right = c;
                }
            } else {
                this.root = c;
            }

            // Rotate
            if (f.height > g.height) {
                c.right = f;
                a.right = g;
                g.parent = a;

                // a.bounds = b.bounds.combine(g.bounds);
                a.bounds.combine2(b.bounds, g.bounds);
                // c.bounds = a.bounds.combine(f.bounds);
                c.bounds.combine2(a.bounds, f.bounds);

                a.height = 1 + Math.max(b.height, g.height);
                c.height = 1 + Math.max(a.height, f.height);
            } else {
                c.right = g;
                a.right = f;
                f.parent = a;

                // a.bounds = b.bounds.combine(f.bounds);
                a.bounds.combine2(b.bounds, f.bounds);

                // c.bounds = a.bounds.combine(g.bounds);
                c.bounds.combine2(a.bounds, g.bounds);

                a.height = 1 + Math.max(b.height, f.height);
                c.height = 1 + Math.max(a.height, g.height);
            }

            return c;
        }
        // Rotate left node up
        if (balance < -1) {
            // swap
            b.left = a;
            b.parent = a.parent;
            a.parent = b;

            // node's old parent should point to b
            if (b.parent) {
                if (b.parent.left === a) {
                    b.parent.left = b;
                } else {
                    if (b.parent.right !== a) {
                        throw "Error rotating Dynamic Tree";
                    }
                    b.parent.right = b;
                }
            } else {
                this.root = b;
            }

            // rotate
            if (d.height > e.height) {
                b.right = d;
                a.left = e;
                e.parent = a;

                // a.bounds = c.bounds.combine(e.bounds);
                a.bounds.combine2(c.bounds, e.bounds);
                //b.bounds = a.bounds.combine(d.bounds);
                b.bounds.combine2(a.bounds, d.bounds);

                a.height = 1 + Math.max(c.height, e.height);
                b.height = 1 + Math.max(a.height, d.height);
            } else {
                b.right = e;
                a.left = d;
                d.parent = a;

                // a.bounds = c.bounds.combine(d.bounds);
                a.bounds.combine2(c.bounds, d.bounds);

                // b.bounds = a.bounds.combine(e.bounds);
                b.bounds.combine2(a.bounds, e.bounds);

                a.height = 1 + Math.max(c.height, d.height);
                b.height = 1 + Math.max(a.height, e.height);
            }
            return b;
        }

        return node;
    }

    /**
     * Returns the internal height of the tree, shorter trees are better. Performance drops as the tree grows
     */
    public getHeight(): number {
        if (this.root === null) {
            return 0;
        }
        return this.root.height;
    }

    /**
     * Queries the Dynamic Axis Aligned Tree for bodies that could be colliding with the provided body.
     *
     * In the query callback, it will be passed a potential collider. Returning true from this callback indicates
     * that you are complete with your query and you do not want to continue. Returning false will continue searching
     * the tree until all possible colliders have been returned.
     */
    public query(body: BFProxy) {
        // , callback: (other: BFProxy) => boolean): void {
        var b = this.nodes.get(body.id);
        var bounds = b.bounds;
        //var bounds = body.aabb.toAABB2();
        DynamicTree.queryHelper(body, bounds, this.root);
    }
    // var helper = (currentNode: TreeNode): boolean => {
    //     // console.log(currentNode && currentNode.body ? currentNode.body.userData1 : "?", currentNode.bounds, body.userData1, bounds);
    //     if (currentNode && currentNode.bounds.intersect(bounds)) {
    //         if (currentNode.isLeaf() && currentNode.body !== body) {
    //             if (callback.call(body, currentNode.body)) {
    //                 return true;
    //             }
    //         } else {
    //             return helper(currentNode.left) || helper(currentNode.right);
    //         }
    //     }
    //     return false;
    // };
    // helper(this.root);
    // 443 289 110
    static stack = new Array(100);
    static queryHelper(body: BFProxy, bounds: AABB2, currentNode: TreeNode): boolean {
        let sp = 1;
        DynamicTree.stack[0] = currentNode;
        while (sp>0) {
            const node = DynamicTree.stack[--sp];
            if (node.bounds.intersect(bounds)) {
                if (node.isLeaf()) {
                    if (node.body !== body) {
                        Collide(body, node.body);
                    }
                } else {
                    DynamicTree.stack[sp++] = node.left;
                    DynamicTree.stack[sp++] = node.right;
                }
            }
        }
        return false;
    }

    static queryHelper2(body: BFProxy, bounds: AABB2, currentNode: TreeNode): boolean {
        if (currentNode && currentNode.bounds.intersect(bounds)) {
            if (currentNode.isLeaf() && currentNode.body !== body) {
                Collide(body, currentNode.body);
                return false;
            } else {
                return (
                    DynamicTree.queryHelper(body, bounds, currentNode.left) ||
                    DynamicTree.queryHelper(body, bounds, currentNode.right)
                );
            }
        }
        return false;
    }

    //  /**
    //   * Queries the Dynamic Axis Aligned Tree for bodies that could be intersecting. By default the raycast query uses an infinitely
    //   * long ray to test the tree specified by `max`.
    //   *
    //   * In the query callback, it will be passed a potential body that intersects with the racast. Returning true from this
    //   * callback indicates that your are complete with your query and do not want to continue. Return false will continue searching
    //   * the tree until all possible bodies that would intersect with the ray have been returned.
    //   */
    public rayCastQuery(ray: Ray, max: number = MAXINT, callback: (other: BFProxy) => boolean): void {
        var helper = (currentNode: TreeNode): boolean => {
            if (currentNode && RayAABB(ray, currentNode.body)) {
                //if (currentNode && currentNode.bounds.rayCast(ray, max)) {

                if (currentNode.isLeaf()) {
                    if (callback.call(ray, currentNode.body)) {
                        // ray hit a leaf! return the body
                        return true;
                    }
                } else {
                    // ray hit but not at a leaf, recurse deeper
                    return helper(currentNode.left) || helper(currentNode.right);
                }
            }
            return false; // ray missed
        };
        helper(this.root);
    }

    public queryArea(area: AABB2, callback: (other: BFProxy) => boolean): void {
        // var helper = (currentNode: TreeNode): boolean => {
        //     if (currentNode && currentNode.bounds.intersect(area)) {
        //         if (currentNode.isLeaf()) {
        //             callback(currentNode.body);
        //             return false;
        //         } else {
        //             return helper(currentNode.left) || helper(currentNode.right);
        //         }
        //     }
        //     return false;
        // };
        // helper(this.root);
        DynamicTree.queryAreaHelper(this.root, area, callback);
    }

    static queryAreaHelper(currentNode: TreeNode, area: AABB2, callback: (other: BFProxy) => boolean): boolean {
        let sp = 1;
        DynamicTree.stack[0] = currentNode;
        while (sp>0) {
            const node = DynamicTree.stack[--sp];
            if (node.bounds.intersect(area)) {
                if (node.isLeaf()) {
                    callback(node.body);
                } else {
                    DynamicTree.stack[sp++] = node.left;
                    DynamicTree.stack[sp++] = node.right;
                }
            }
        }
        return false;
    }

    // static queryAreaHelper(currentNode: TreeNode, area: AABB2, callback: (other: BFProxy) => boolean): boolean {
    //     if (currentNode && currentNode.bounds.intersect(area)) {
    //         if (currentNode.isLeaf()) {
    //             callback(currentNode.body);
    //             return false;
    //         } else {
    //             return (
    //                 DynamicTree.queryAreaHelper(currentNode.left, area, callback) ||
    //                 DynamicTree.queryAreaHelper(currentNode.right, area, callback)
    //             );
    //         }
    //     }
    //     return false;
    // }

    //  public getNodes(): TreeNode[] {
    //     var helper = (currentNode: TreeNode): TreeNode[] => {
    //        if (currentNode) {
    //           return [currentNode].concat(helper(currentNode.left), helper(currentNode.right));
    //        } else {
    //           return [];
    //        }
    //     };
    //     return helper(this.root);
    //  }

    public debugDraw(render: DebugRenderer) {
        // draw all the nodes in the Dynamic Tree
        var helper = (currentNode: TreeNode) => {
            if (currentNode) {
                if (currentNode.isLeaf()) {
                    //  ctx.lineWidth = 1;
                    //  ctx.strokeStyle = 'green';
                    render.DrawAABB2(currentNode.bounds, "green");
                } else {
                    //  ctx.lineWidth = 1;
                    //  ctx.strokeStyle = 'white';
                    render.DrawAABB2(currentNode.bounds, "white");
                }

                if (currentNode.left) {
                    helper(currentNode.left);
                }
                if (currentNode.right) {
                    helper(currentNode.right);
                }
            }
        };

        helper(this.root);
    }
}
