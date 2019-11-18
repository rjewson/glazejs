import { Entity } from "../ecs/Entity";
import { Signal } from "../signals/Signal";
import { State } from "../core/components/State";
import { EntityState } from "../core/state/EntityStates";

// enum GroupEvent {
// 	MemberAdded;
// 	MemberRemoved;
// }

export class EntityGroup {
    // public var groupManager:Entity;
    public members: Set<Entity>;
    public maxMembers: number;
    public messages: Signal;

    constructor(maxMembers: number) {
        // this.groupManager = groupManager;
        this.maxMembers = maxMembers;
        this.members = new Set();
        this.messages = new Signal();
        this.onMemberMessage = this.onMemberMessage.bind(this);
    }

    public addMember(entity: Entity, state: State) {
        if (!this.hasCapacity()) return;
        this.members.add(entity);
        state.messages.add(this.onMemberMessage);
        // entity.messages.add(this.onMemberMessage);
        // this.messages.dispatch(GroupEvent.MemberAdded,entity);
    }

    public removeMember(entity: Entity) {
        this.members.delete(entity);
    }

    public onMemberMessage(entity: Entity, state: string) {
        switch (state) {
            case EntityState.Destroy:
                this.removeMember(entity);
        }
    }

    public hasCapacity(): boolean {
        return this.members.size < this.maxMembers;
    }
}
