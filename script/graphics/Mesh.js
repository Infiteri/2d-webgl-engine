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
    color = new core.Color(255, 255, 255, 255),
    textureName,
  }) {
    this.position = new core.Vector3(x, y, z);
    this.color = color;

    this.textureName = textureName;
    this.texture = core.TextureManager.GetTexture(this.textureName);

    this.width = width;
    this.height = height;

    this.buffer = new core.Buffer(5);
    this.shader = new core.Shader(
      "Mesh Shader",
      core.shaders.vsShader,
      core.shaders.fsShader
    );

    //Initial position
    this.model = mat4.create();
    mat4.translate(this.model, this.model, [
      this.position.x,
      this.position.y,
      this.position.z,
    ]);

    //Add Vertex Data
    this.vertexInfo = new core.AttributeInfo(0, 0, 3);
    this.buffer.AddAttribute(this.vertexInfo);

    this.texInfo = new core.AttributeInfo(1, 3, 2);
    this.buffer.AddAttribute(this.texInfo);

    this.data = [
      0,
      0,
      0,
      0,
      0, // End
      0,
      this.height,
      0,
      0,
      1.0, // End
      this.width,
      this.height,
      0,
      1.0,
      1.0, // End
      this.width,
      this.height,
      0,
      1.0,
      1.0, // End
      this.width,
      0,
      0,
      1.0,
      0, // End
      0,
      0,
      0,
      0,
      0, // End
    ];

    this.buffer.PushBackData(this.data);

    this.Init();
  }

  Destroy() {
    this.buffer.Delete();
    core.TextureManager.ReleaseTexture(this.textureName);
  }

  Init() {
    this.buffer.Upload();
  }

  /**
   * @param {Camera2D} camera
   * @param {core.Shader} shader
   */
  Draw(camera) {
    this.shader._use();
    this.Bind(camera);

    this.texture.ActivateAndBind(0);

    const diffuseLocation = this.shader.GetUniformLocation("uDiffuse");
    gl.uniform1i(diffuseLocation, 0);

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
    gl.uniform4fv(tintLocation, this.color.ToFloat32Array());
  }

  SetPosition(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;

    mat4.setPosition(
      this.model,
      this.position.x,
      this.position.y,
      this.position.z
    );
  }
}
