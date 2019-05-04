<template>
  <canvas width="800" height="600"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";
import GirlSpritesJson from "@/assets/sailor_girl_sprites.json";
import GirlSpritesPng from "@/assets/sailor_girl_sprites.png";

export default {
  name: "CharacterAnimation",
  methods: {
    /** Assetsデータ読み込み後の非同期処理 */
    onAssetsLoaded: function() {
      // 2.pngファイルを元にBaseTextureを生成する
      const baseTexture = PIXI.BaseTexture.fromImage(GirlSpritesPng);
      // 3.Spritesheetオブジェクトを生成開始する
      const spritesheet = new PIXI.Spritesheet(baseTexture, GirlSpritesJson);
      spritesheet.parse(this.onSpritesheetLoaded);
    },
    /** Spritesheet生成完了後の非同期処理 */
    onSpritesheetLoaded: function(textures) {
      // 4.テクスチャを取り出す
      let texture = textures["sailor_girl_01.png"];
      let girl = PIXI.Sprite.from(texture);
      girl.anchor.set(0.5);
      girl.x = this.app.view.width / 2;
      girl.y = this.app.view.height / 2;
      this.app.stage.addChild(girl);

      // 5.アニメーション
      let downTextures = [
        textures["sailor_girl_01.png"],
        textures["sailor_girl_03.png"]
      ];
      let walk_girl = new PIXI.extras.AnimatedSprite(downTextures);
      walk_girl.anchor.set(0.5);
      walk_girl.x = this.app.view.width / 2 + 64;
      walk_girl.y = this.app.view.height / 2;
      walk_girl.animationSpeed = 0.05;
      walk_girl.play();
      this.app.stage.addChild(walk_girl);
    }
  },
  mounted: function() {
    this.app = new PIXI.Application({
      view: this.$el,
      backgroundColor : 0xDAE8F4
    });

    // npm run serve時のリロードで同名ファイル名読み込みエラーを防ぐ
    PIXI.loader.reset();

    // 1.pngファイルを読み込む
    const loader = PIXI.loader.add(GirlSpritesPng);
    loader.load(this.onAssetsLoaded);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
