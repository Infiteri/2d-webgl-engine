import * as core from "./core.js";

export const gl = document.querySelector("canvas").getContext("webgl2");

export default class Engine {
  constructor() {
    this.canvas = document.querySelector("canvas");

    this.camera = new core.Camera2D(this.canvas);

    gl.clearColor(0, 0, 0, 1);

    this.elements = [];

    core.AssetManager.Init();
  }

  Init() {
    this.elements.forEach(e => {
      e.SetPosition(
        e.position.x - this.camera.x,
        e.position.y - this.camera.y,
        this.camera.z
      );
    });
  }

  AddMesh(e) {
    this.elements.push(e);
  }

  Render() {
    core.MessageBus.Update(0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.elements.forEach(e => {
      e.Draw(this.camera);
    });
  }
}
