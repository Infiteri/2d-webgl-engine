/**
 * Helps organize the imports
 */

//Stuff that must be called first (for extending reasons)
export * from "./messages/MessageBus.js";
export * from "./graphics/assets/AssetManager.js";

//Graphical stuff
export * as shaders from "./shader/shaders.js";
export * from "./code/Shader.js";
export * from "./code/Buffer.js";
export * from "./graphics/Color.js";

//Messages
export * from "./messages/Message.js";

//Assets
export * from "./graphics/assets/ImageAssetLoader.js";

//Texture
export * from "./graphics/texture/TextureManager.js";
export * from "./graphics/texture/Texture.js";

//Other stuff
export * from "./code/Camera2D.js";
export * from "./code/vector.js";

//Extra data
export const messages = {
  ASSET_LOADED_MESSAGE: "MESSAGE_ASSET_LOADER_ASSET_LOADED::",
};
