import * as PIXI from "pixi.js";
import BaseSprite from "@/lib/BaseSprite.js";
import SpritesJson from "@/assets/pipo-btleffect006.json";
import SpritesPng from "@/assets/pipo-btleffect006.png";

/**
 * バトルエフェクトを表示するクラス
 * @extends BaseSprite
 */
export default class BattleEffect extends BaseSprite {
  textureNameArray = [
    "pipo-btleffect006_00",
    "pipo-btleffect006_01",
    "pipo-btleffect006_02",
    "pipo-btleffect006_03",
    "pipo-btleffect006_04",
    "pipo-btleffect006_05",
    "pipo-btleffect006_06"
  ];

  /**
   * @returns スプライトで利用するイメージのURL配列
   */
  static getImageURLs() {
    return [SpritesPng];
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    // pngファイルを読み込む
    const baseTexture = PIXI.BaseTexture.from(SpritesPng);

    const spritesheet = new PIXI.Spritesheet(baseTexture, SpritesJson);

    return new Promise(resolve => {
      spritesheet.parse(textureHash => {
        this.textureHash = textureHash;
        resolve(this);
      });
    });
  }

  /**
   * AnimatedSpriteを作成して返す
   * @param {Array.<PIXI.Texture>} textureArray
   */
  _createAnimatedSprite(textureHash, textureNameArray) {
    const textureArray = textureNameArray.map(name => textureHash[name]);

    let sprite = new PIXI.AnimatedSprite(textureArray);
    sprite.anchor.set(0.5, 1);
    sprite.animationSpeed = 0.2;
    sprite.loop = false;
    sprite.onComplete = () => {
      sprite.destroy();
    };

    return sprite;
  }
  /**
   * 発射エフェクトを開始する
   * @param {Number} x x軸ポジション
   * @param {Number} y y軸ポジション
   * @param {Number} vx x軸進行速度
   * @param {Number} vy y軸進行速度
   */
  launch(x, y, vx, vy, rotation) {
    if (this._sprite && this._sprite.playing) {
      return;
    }

    // 発射位置を指定
    this.x = x;
    this.y = y;

    // 発射速度を指定
    this.vx = vx;
    this.vy = vy;

    // 発射角度を指定
    this.rotation = rotation + Math.PI / 2;

    this._sprite = this._createAnimatedSprite(
      this.textureHash,
      this.textureNameArray
    );
    this.addChild(this._sprite);

    // アニメーション開始
    this._sprite.play();
    this._sprite.visible = true;
  }
}
