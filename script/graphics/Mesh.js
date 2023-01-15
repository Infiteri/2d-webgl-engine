import * as core from "../core.js";

//Utils
import { mat4 } from "../../src/index.js";
import { gl } from "../Engine.js";

export default class Mesh {
  constructor({
    width = 100,
    height = 100,
    x = 100,
    y = 100,
    z = -10,
    color = new core.Color(0, 125, 255, 255),
    texture = true,
  }) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
    this.texture = texture;

    this.width = width;
    this.height = height;

    this.CheckForTexture(); //If there is a texture: update shaders; else: do nothing (stays the same)

    this.buffer = new core.Buffer(3);
    this.shader = new core.Shader(
      "Mesh Shader",
      core.shaders.vsShader,
      core.shaders.fsShader
    );

    //Initial position
    this.model = mat4.create();
    mat4.translate(this.model, this.model, [this.x, this.y, this.z]);

    this.data = [
      0,
      0,
      0,
      //
      0,
      height,
      0,
      //
      width,
      height,
      0,
      //
      width,
      height,
      0,
      //
      width,
      0,
      0,
      0,
      //
      0,
      0,
    ];

    this.buffer.PushBackData(this.data);

    this.Init();
  }

  CheckForTexture() {
    //Update the bits if the texture exists
    if (this.texture) core.shaders.UpdateShaderCode({});
  }

  Init() {
    //Add Vertex Data
    this.vertexInfo = new core.AttributeInfo(0, 0, 3);
    this.buffer.AddAttribute(this.vertexInfo);

    this.buffer.Upload();
  }

  /**
   * @param {Camera2D} camera
   */
  Draw(camera) {
    this.shader._use();

    this.Bind(camera);

    this.buffer.Bind();

    this.buffer.Draw();
  }

  /**
   * @param {Camera2D} camera
   */
  Bind(camera) {
    //Projection and model multiply
    const projectionLocation =
      this.shader.GetUniformLocation("uProjectionMatrix");

    gl.uniformMatrix4fv(
      projectionLocation,
      false,
      new Float32Array(camera.projection)
    );

    const modelLocation = this.shader.GetUniformLocation("uModelMatrix");
    gl.uniformMatrix4fv(modelLocation, false, new Float32Array(this.model));

    //Bind the tint
    const tintLocation = this.shader.GetUniformLocation("uTint");
    gl.uniform4fv(tintLocation, this.color.ToFloatArray());
  }

  SetPosition(x, y, z) {
    //Reset the x, y, z
    this.x = x;
    this.y = y;
    this.z = z;

    //Set with the new x, y, z ont he mesh instance (what it was reset up above)
    mat4.setPosition(this.model, this.x, this.y, this.z);
  }

  UpdateShaderCode() {
    vsShader = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTexCoord;

    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelMatrix;

    varying vec2 vTexCoord;

    void main() {
        gl_Position = uProjectionMatrix * uModelMatrix * aVertexPosition;
        vTexCoord = aTexCoord;
    }
`;

    fsShader = `
    precision highp float;

    uniform vec4 uTint;

    uniform sampler2D uImage;
		varying vec2 vTexCoord;

    void main() {
        gl_FragColor = uTint ${shaders.textureVsMul};
    }
`;
  }
}
