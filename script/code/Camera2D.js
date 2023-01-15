import { mat4 } from "../../src/index.js";

export class Camera2D {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;
    this.z = -6;

    this.projection = mat4.create();

    //Orthographical view
    mat4.ortho(this.projection, 0, canvas.width, canvas.height, 0, 0.1, 1000);

    this.model = mat4.create();
    mat4.translate(this.model, this.model, [this.x, this.y, this.z]);
  }
}
