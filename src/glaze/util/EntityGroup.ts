import { Entity } from "../ecs/Entity";
import { Signal } from "../signals/Signal";

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
    }

    public  addMember(entity:Entity) {
    	if (!this.hasCapacity())
    		return;
    	this.members.add(entity);
    	// entity.messages.add(this.onMemberMessage);
    	// this.messages.dispatch(GroupEvent.MemberAdded,entity);
    }

    public  removeMember(entity:Entity) {
        this.members.delete(entity);
    	//  if (members.remove(entity))
    	//  	messages.dispatch(GroupEvent.MemberRemoved,entity);
    }

    // public  onMemberMessage(e:Entity,type:String,data:Dynamic) {
    // 	switch (type) {
    // 		case Entity.DESTROY:
    // 			removeMember(e);
    // 	}
    // }

    public  hasCapacity():boolean {
    	return this.members.size<this.maxMembers;
    }
}
