import * as PIXI from "pixi.js";
import BaseSprite from "@/lib/BaseSprite.js";
import GirlSpritesJson from "@/assets/sailor_girl_sprites_tansio.json";
import GirlSpritesPng from "@/assets/sailor_girl_sprites_tansio.png";

/**
 * セーラー少女をまとめたクラス
 * @extends BaseSprite
 */
export default class SailorGirlContainer extends BaseSprite {
  /**
   * @returns スプライトで利用するイメージのURL配列
   */
  static getImageURLs() {
    return [GirlSpritesPng];
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    /**
     * @type {string} 8分割方向文字列
     */
    this._direction = "down";

    const loader = PIXI.Loader.shared;

    // pngファイルを読み込む
    return new Promise((resolve) => {
      if (
        Object.prototype.hasOwnProperty.call(loader.resources, GirlSpritesPng)
      ) {
        this._create_spritesheet(resolve);
      } else {
        loader.add(GirlSpritesPng).load(() => {
          this._create_spritesheet(resolve);
        });
      }
    });
  }

  _create_spritesheet(resolve) {
    const baseTexture = PIXI.BaseTexture.from(GirlSpritesPng);

    const spritesheet = new PIXI.Spritesheet(baseTexture, GirlSpritesJson);
    spritesheet.parse((textureHash) => {
      // 8方向セーラー少女を生成
      this._girls = this._createDirectionSprites(textureHash);
      for (let key of Object.keys(this._girls)) {
        this._girls[key].visible = false;
        this.addChild(this._girls[key]);
      }
      // 初期値としてdown方向を設定する
      this.direction = "down";

      resolve(this);
    });
  }

  get direction() {
    return this._direction;
  }

  set direction(direction) {
    if (!this._girls[direction]) {
      console.warn("Undefined Key in SpriteHash. key:" + direction);
      console.warn(this._girls);
      return;
    }

    // 現在の方向を非表示にする
    if (this.direction) {
      this._girls[this.direction].visible = false;
    }
    // 指定の方向だけ表示する
    this._girls[direction].visible = true;

    this._direction = direction;
  }

  /**
   * セイラー少女が向いている方向をRadianで返す
   * @returns X軸方向を0としたRadian角度
   */
  getDirectionByRadian() {
    switch (this._direction) {
      case "left":
        return Math.PI * 1;
      case "upleft":
        return Math.PI * (-3 / 4);
      case "up":
        return Math.PI * (-1 / 2);
      case "upright":
        return Math.PI * (-1 / 4);
      case "right":
        return Math.PI * 0;
      case "downright":
        return Math.PI * (+1 / 4);
      case "down":
        return Math.PI * (+1 / 2);
      case "downleft":
        return Math.PI * (+3 / 4);
    }
  }

  /**
   * 方向ごとのAnimatedSpriteを作成しHashで返す
   * @param {Object.<string, PIXI.Texture>} textureHash
   */
  _createDirectionSprites(textureHash) {
    /**
     * @type {Object.<string, PIXI.AnimatedSprite>}
     */
    let spriteHash = {};

    spriteHash["down"] = this._createAnimatedSprite([
      textureHash["sailor_girl_01"],
      textureHash["sailor_girl_00"],
      textureHash["sailor_girl_01"],
      textureHash["sailor_girl_02"],
    ]);

    spriteHash["downleft"] = this._createAnimatedSprite([
      textureHash["sailor_girl_04"],
      textureHash["sailor_girl_03"],
      textureHash["sailor_girl_04"],
      textureHash["sailor_girl_05"],
    ]);

    spriteHash["left"] = this._createAnimatedSprite([
      textureHash["sailor_girl_07"],
      textureHash["sailor_girl_06"],
      textureHash["sailor_girl_07"],
      textureHash["sailor_girl_08"],
    ]);

    spriteHash["downright"] = this._createAnimatedSprite([
      textureHash["sailor_girl_10"],
      textureHash["sailor_girl_09"],
      textureHash["sailor_girl_10"],
      textureHash["sailor_girl_11"],
    ]);

    spriteHash["right"] = this._createAnimatedSprite([
      textureHash["sailor_girl_13"],
      textureHash["sailor_girl_12"],
      textureHash["sailor_girl_13"],
      textureHash["sailor_girl_14"],
    ]);

    spriteHash["upleft"] = this._createAnimatedSprite([
      textureHash["sailor_girl_16"],
      textureHash["sailor_girl_15"],
      textureHash["sailor_girl_16"],
      textureHash["sailor_girl_17"],
    ]);

    spriteHash["up"] = this._createAnimatedSprite([
      textureHash["sailor_girl_19"],
      textureHash["sailor_girl_18"],
      textureHash["sailor_girl_19"],
      textureHash["sailor_girl_20"],
    ]);

    spriteHash["upright"] = this._createAnimatedSprite([
      textureHash["sailor_girl_22"],
      textureHash["sailor_girl_21"],
      textureHash["sailor_girl_22"],
      textureHash["sailor_girl_23"],
    ]);

    return spriteHash;
  }

  /**
   * AnimatedSpriteを作成して返す
   * @param {Array.<PIXI.Texture>} textureArray
   */
  _createAnimatedSprite(textureArray) {
    let sprite = new PIXI.AnimatedSprite(textureArray);
    sprite.anchor.set(0.5);
    sprite.animationSpeed = 0.05;
    sprite.play();

    return sprite;
  }

  /**
   * 2次元方向ベクトルを渡して方向を変更するメソッド
   * @param {Number} x x軸方向量
   * @param {Number} y y軸方向量
   */
  setDirectionFrom2D(x, y) {
    const direction = this.calculateDirectionFrom2D(x, y);
    if (!direction) {
      return;
    }
    this.direction = direction;
  }

  /**
   * 2次元方向ベクトルを渡すと該当する8分方向を返すメソッド
   * @param {*} x x軸方向量
   * @param {*} y y軸方向量
   */
  calculateDirectionFrom2D(x, y) {
    if (x === undefined || y === undefined) {
      return undefined;
    }
    if (x === 0 && y === 0) {
      return undefined;
    }

    let rad = Math.atan2(y, x);

    if (rad <= (-7 / 8) * Math.PI || rad >= (+7 / 8) * Math.PI) {
      return "left";
    }
    if (rad >= (-7 / 8) * Math.PI && rad <= (-5 / 8) * Math.PI) {
      return "upleft";
    }
    if (rad >= (-5 / 8) * Math.PI && rad <= (-3 / 8) * Math.PI) {
      return "up";
    }
    if (rad >= (-3 / 8) * Math.PI && rad <= (-1 / 8) * Math.PI) {
      return "upright";
    }
    if (rad >= (-1 / 8) * Math.PI && rad <= (+1 / 8) * Math.PI) {
      return "right";
    }
    if (rad >= (+1 / 8) * Math.PI && rad <= (+3 / 8) * Math.PI) {
      return "downright";
    }
    if (rad >= (+3 / 8) * Math.PI && rad <= (+5 / 8) * Math.PI) {
      return "down";
    }
    if (rad >= (+5 / 8) * Math.PI && rad <= (+7 / 8) * Math.PI) {
      return "downleft";
    }

    throw "Unknown Error in getDirection";
  }
}
