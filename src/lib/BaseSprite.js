import * as PIXI from "pixi.js";

/**
 * スプライトの基本機能を集めたクラス
 * @extends PIXI.Container
 */
export default class BaseSprite extends PIXI.Container {
  /**
   * @returns スプライトで利用するイメージのURL配列
   */
  static getImageURLs() {
    return [];
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }
}
