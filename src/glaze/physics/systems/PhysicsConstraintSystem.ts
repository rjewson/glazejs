// package glaze.physics.systems;

// import glaze.eco.core.System;
// import glaze.eco.core.Entity;
// import glaze.physics.components.PhysicsConstraints;

// class PhysicsConstraintSystem extends System {
    
//     public function new() {
//         super([PhysicsConstraints]);
//     }

//     override public function entityAdded(entity:Entity) {
//     }

//     override public function entityRemoved(entity:Entity) {
//     }

//     updateEntity(entity: Entity, dt: number, ) {
//         for (i in 0...10) {
//             for (entity in view.entities) {
//                 for (constraint in entity.getComponent(PhysicsConstraints).constraints) {
//                     constraint.resolve();
//                 }
//             }            
//         }
//     }
// }