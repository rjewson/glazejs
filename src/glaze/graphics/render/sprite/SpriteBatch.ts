import { Texture } from "../../texture/Texture";
import { Sprite } from "../../displaylist/Sprite";
import { Stage } from "../../displaylist/Stage";
import { AABB2 } from "../../../geom/AABB2";
import { DisplayObjectContainer } from "../../displaylist/DisplayObjectContainer";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { createQuadIndiciesBuffer } from "../RenderUtils";

const BYTES_PER_QUAD = 5 * 4;

export class WebGLBatch {
    public gl: WebGLRenderingContext;
    public blendMode: number;

    public size: number;
    public dynamicSize: number;

    private indexBuffer: WebGLBuffer;
    private indices: Uint16Array;

    private dataBuffer: WebGLBuffer;
    private data: Float32Array;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.size = 1;
        this.indexBuffer = gl.createBuffer();
        this.dataBuffer = gl.createBuffer();
        this.blendMode = 0;
        this.dynamicSize = 1;
    }

    public Clean() {}

    public ResizeBatch(size: number) {
        this.size = size;
        this.dynamicSize = size;

        this.data = new Float32Array(this.dynamicSize * BYTES_PER_QUAD);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.data, WebGLRenderingContext.DYNAMIC_DRAW);

        this.indices = createQuadIndiciesBuffer(this.dynamicSize);

        this.gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indices, WebGLRenderingContext.STATIC_DRAW);
    }

    public AddSpriteToBatch(sprite: Sprite, indexRun: number) {
        const index = indexRun * BYTES_PER_QUAD;
        const uvs = sprite.texture.uvs;
        //0
        //Verts
        this.data[index + 0] = sprite.transformedVerts[0];
        this.data[index + 1] = sprite.transformedVerts[1];
        //UV
        this.data[index + 2] = uvs[0]; //frame.x / tw;
        this.data[index + 3] = uvs[1]; //frame.y / th;
        //Colour
        this.data[index + 4] = sprite.worldAlpha;

        //1
        //Verts
        this.data[index + 5] = sprite.transformedVerts[2];
        this.data[index + 6] = sprite.transformedVerts[3];
        //UV
        this.data[index + 7] = uvs[2]; //(frame.x + frame.width) / tw;
        this.data[index + 8] = uvs[3]; //frame.y / th;
        //Colour
        this.data[index + 9] = sprite.worldAlpha;

        //2
        //Verts
        this.data[index + 10] = sprite.transformedVerts[4];
        this.data[index + 11] = sprite.transformedVerts[5];
        //UV
        this.data[index + 12] = uvs[4]; //(frame.x + frame.width) / tw;
        this.data[index + 13] = uvs[5]; //(frame.y + frame.height) / th;
        //Colour
        this.data[index + 14] = sprite.worldAlpha;

        //3
        //Verts
        this.data[index + 15] = sprite.transformedVerts[6];
        this.data[index + 16] = sprite.transformedVerts[7];
        //UV
        this.data[index + 17] = uvs[6]; //frame.x / tw;
        this.data[index + 18] = uvs[7]; //(frame.y + frame.height) / th;
        //Colour
        this.data[index + 19] = sprite.worldAlpha;
    }

    public Render(shader: ShaderWrapper, stage: Stage, clip: AABB2) {
        // this.gl.useProgram(shader.program);

        var node: DisplayObjectContainer;
        var stack: Array<DisplayObjectContainer>;
        var top: number;

        node = stage;
        stack = new Array<DisplayObjectContainer>(1000); // Arbitary assignment of 1000 stack slots

        stack[0] = node;
        top = 1;

        var indexRun = 0;
        var currentTexture = null;

        while (top > 0) {
            var thisNode = stack[--top];
            //If there is an adjacent node, push it to the stack
            if (thisNode.next != null) stack[top++] = thisNode.next as DisplayObjectContainer; //Big assumption is only DisplayListContainers, which it is for now.
            //If there is a child list, push the head (this will get processed first)
            if (thisNode.head != null) stack[top++] = thisNode.head as DisplayObjectContainer; //Same assumption.
            //return the result

            if (thisNode.visible && thisNode.renderable) {
                var sprite: Sprite = thisNode as Sprite;

                if (sprite.texture.baseTexture.texture != currentTexture || indexRun == this.size) {
                    this.Flush(shader, currentTexture, indexRun);
                    indexRun = 0;
                    currentTexture = sprite.texture.baseTexture.texture;
                    this.gl.blendEquation(sprite.blendEquation);
                    this.gl.blendFunc(sprite.blendFuncS, sprite.blendFuncD);
                }
                //if (clip == null || sprite.aabb.intersect(clip)) {
                this.AddSpriteToBatch(sprite, indexRun);
                indexRun++;
                // }
            }
        }

        if (indexRun > 0) this.Flush(shader, currentTexture, indexRun);
    }

    private Flush(shader: ShaderWrapper, texture: Texture, size: number) {
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,this.data,WebGLRenderingContext.DYNAMIC_DRAW);
        // this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);
        this.gl.vertexAttribPointer(
            shader.attribute.aVertexPosition,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            BYTES_PER_QUAD,
            0
        );
        this.gl.vertexAttribPointer(
            shader.attribute.aTextureCoord,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            BYTES_PER_QUAD,
            8
        );
        this.gl.vertexAttribPointer(shader.attribute.aColor, 1, WebGLRenderingContext.FLOAT, false, BYTES_PER_QUAD, 16);
        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
        this.gl.drawElements(WebGLRenderingContext.TRIANGLES, size * 6, WebGLRenderingContext.UNSIGNED_SHORT, 0);
    }
}
