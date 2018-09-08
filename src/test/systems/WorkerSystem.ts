import { System } from "../../glaze/ecs/System";
import Worker from "worker-loader!./worker";
import { Entity } from "../../glaze/ecs/Entity";
import { Player } from "../components/Player";

export class WorkerSystem extends System {
  private worker: Worker;
  private i:number = 0;
  constructor() {
    super([Player]);
    this.worker = new Worker();
    this.worker.addEventListener("message", event => {this.i++});
  }
  updateEntity(entity: Entity, player: Player) {
    // console.log(this.i);
    this.i++;
    this.worker.postMessage({ a: this.i });
  }
}
