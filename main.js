import Engine from "./script/Engine.js";
import Mesh from "./script/graphics/Mesh.js";

const engine = new Engine();

const m = new Mesh({
  height: 50,
  width: 50,
});

m.SetPosition(100, 50);
engine.AddMesh(m);

engine.Init();
engine.Render();
