<template>
  <canvas width="800" height="600"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";
import GirlSpritesJson from "@/assets/sailor_girl_sprites_tansio.json";
import GirlSpritesPng from "@/assets/sailor_girl_sprites_tansio.png";

export default {
  name: "CharacterMovement",
  methods: {
    /** Assetsデータ読み込み後の非同期処理 */
    onAssetsLoaded: function() {
      // 2.pngファイルを元にBaseTextureを生成する
      const baseTexture = PIXI.BaseTexture.from(GirlSpritesPng);
      // 3.Spritesheetオブジェクトを生成開始する
      const spritesheet = new PIXI.Spritesheet(baseTexture, GirlSpritesJson);
      spritesheet.parse(this.onSpritesheetLoaded);
    },
    /** Spritesheet生成完了後の非同期処理 */
    onSpritesheetLoaded: function(textures) {
      // girl関連SpriteをまとめるContainerを作る
      this.girlContainer = new PIXI.Container();

      // 8方向セーラー少女を生成
      this.girls = this.createDirectionSprites(textures);
      for (let key of Object.keys(this.girls)) {
        this.girlContainer.addChild(this.girls[key]);
      }
      // 初期値としてdown方向を設定する
      this.setDirection(this.girls, "down");

      this.girlContainer.x = this.app.view.width / 2;
      this.girlContainer.y = this.app.view.height / 2;
      this.girlContainer.scale.x = 2;
      this.girlContainer.scale.y = 2;

      this.app.stage.addChild(this.girlContainer);

      // キーボードが押されたイベント
      this.keyPressed = {};
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);

      // ゲームループを実装
      this.app.ticker.add(delta => this.gameloop(delta));
    },
    /** 方向ごとのAnimatedSpriteを作成しHashで返す */
    createDirectionSprites: function(textureHash) {
      let spriteHash = {};

      spriteHash["down"] = this.createAnimatedSprite([
        textureHash["sailor_girl_01"],
        textureHash["sailor_girl_00"],
        textureHash["sailor_girl_01"],
        textureHash["sailor_girl_02"]
      ]);

      spriteHash["downleft"] = this.createAnimatedSprite([
        textureHash["sailor_girl_04"],
        textureHash["sailor_girl_03"],
        textureHash["sailor_girl_04"],
        textureHash["sailor_girl_05"]
      ]);

      spriteHash["left"] = this.createAnimatedSprite([
        textureHash["sailor_girl_07"],
        textureHash["sailor_girl_06"],
        textureHash["sailor_girl_07"],
        textureHash["sailor_girl_08"]
      ]);

      spriteHash["downright"] = this.createAnimatedSprite([
        textureHash["sailor_girl_10"],
        textureHash["sailor_girl_09"],
        textureHash["sailor_girl_10"],
        textureHash["sailor_girl_11"]
      ]);

      spriteHash["right"] = this.createAnimatedSprite([
        textureHash["sailor_girl_13"],
        textureHash["sailor_girl_12"],
        textureHash["sailor_girl_13"],
        textureHash["sailor_girl_14"]
      ]);

      spriteHash["upleft"] = this.createAnimatedSprite([
        textureHash["sailor_girl_16"],
        textureHash["sailor_girl_15"],
        textureHash["sailor_girl_16"],
        textureHash["sailor_girl_17"]
      ]);

      spriteHash["up"] = this.createAnimatedSprite([
        textureHash["sailor_girl_19"],
        textureHash["sailor_girl_18"],
        textureHash["sailor_girl_19"],
        textureHash["sailor_girl_20"]
      ]);

      spriteHash["upright"] = this.createAnimatedSprite([
        textureHash["sailor_girl_22"],
        textureHash["sailor_girl_21"],
        textureHash["sailor_girl_22"],
        textureHash["sailor_girl_23"]
      ]);

      return spriteHash;
    },
    /** AnimatedSpriteを作成して返す */
    createAnimatedSprite: function(textureArray) {
      let sprite = new PIXI.AnimatedSprite(textureArray);
      sprite.anchor.set(0.5);
      sprite.animationSpeed = 0.05;
      sprite.play();

      return sprite;
    },
    /** キーダウン時処理 */
    handleKeyDown: function(e) {
      var key = e.key;
      this.keyPressed[key] = true;
    },
    /** キーアップ時処理 */
    handleKeyUp: function(e) {
      var key = e.key;
      this.keyPressed[key] = false;
    },
    /** ゲームループ本体 */
    gameloop: function(delta) {
      // 速度初期化
      let vx = 0;
      let vy = 0;
      // 加速度定義
      const ACCELERATION = 3;

      // WASDのキー情報を確認して、速度を変更する。
      if (this.keyPressed["w"]) {
        vy -= ACCELERATION;
      }
      if (this.keyPressed["a"]) {
        vx -= ACCELERATION;
      }
      if (this.keyPressed["s"]) {
        vy += ACCELERATION;
      }
      if (this.keyPressed["d"]) {
        vx += ACCELERATION;
      }

      // delta(前回実行時からの時間)と算出した速度をかけあわせて
      // this.girlContainerを移動させる。
      this.girlContainer.x += vx * delta;
      this.girlContainer.y += vy * delta;

      // 方向を計算する。
      let direction = this.getDirection(vx, vy);
      if (direction) {
        this.setDirection(this.girls, direction);
      }
    },
    /** 方向計算用メソッド */
    getDirection: function(vx, vy) {
      if (vx === undefined || vy === undefined) {
        return undefined;
      }
      if (vx === 0 && vy === 0) {
        return undefined;
      }

      let rad = Math.atan2(vy, vx);

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
    },
    /** 指定のAnimatedSpriteを表示する */
    setDirection: function(spriteHash, direction) {
      if (!spriteHash[direction]) {
        console.warn("Undefined Key in SpriteHash. key:" + direction);
        console.warn(spriteHash);
        return;
      }

      // 全方向を一旦非表示にする
      for (let key of Object.keys(spriteHash)) {
        spriteHash[key].visible = false;
      }
      // 指定の方向だけ表示する
      spriteHash[direction].visible = true;
    }
  },
  mounted: function() {
    this.app = new PIXI.Application({
      view: this.$el,
      backgroundColor: 0xdae8f4
    });

    const loader = PIXI.Loader.shared;

    // npm run serve時のリロードで同名ファイル名読み込みエラーを防ぐ
    loader.reset();

    // 1.pngファイルを読み込む
    loader.add(GirlSpritesPng);
    loader.load(this.onAssetsLoaded);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
