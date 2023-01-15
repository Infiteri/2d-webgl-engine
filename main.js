import Engine from "./script/Engine.js";
import Mesh from "./script/graphics/Mesh.js";

const engine = new Engine();

const m = new Mesh({
  textureName: "crate.png",
});

m.SetPosition(250, 100, -6);
engine.AddMesh(m);
engine.Init();

function r() {
  requestAnimationFrame(r);
  engine.Render();
}

r();
