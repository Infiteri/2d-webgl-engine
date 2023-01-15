/**
 * How a Asset might look like
 */
export class IAsset {
  /**
   * @param {String} name
   * @param {any} data
   */
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

/**
 * Loader
 */

export class IAssetLoader {
  static loaders = [];
  loadedAssets = {};

  Init() {}

  RegisterLoader() {}
}

/**
 * Takes care of the assets / manages them
 */
export class AssetManager {}
