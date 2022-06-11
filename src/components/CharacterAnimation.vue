<template>
  <canvas width="800" height="600"></canvas>
</template>



<script>
import * as PIXI from "pixi.js";
import GirlSpritesJson from "@/assets/sailor_girl_sprites_tansio.json";
import GirlSpritesPng from "@/assets/sailor_girl_sprites_tansio.png";

import { defineComponent } from "vue";

export default defineComponent({
  name: "CharacterAnimation",

  methods: {
    /** Assetsデータ読み込み後の非同期処理 */
    onAssetsLoaded: function () {
      // 2.pngファイルを元にBaseTextureを生成する
      const baseTexture = PIXI.BaseTexture.from(GirlSpritesPng);
      // 3.Spritesheetオブジェクトを生成開始する
      const spritesheet = new PIXI.Spritesheet(baseTexture, GirlSpritesJson);
      spritesheet.parse(this.onSpritesheetLoaded);
    },
    /** Spritesheet生成完了後の非同期処理 */
    onSpritesheetLoaded: function (textures) {
      // 4.テクスチャを取り出す
      let texture = textures["sailor_girl_01"];
      let girl = PIXI.Sprite.from(texture);
      girl.anchor.set(0.5);
      girl.x = this.app.view.width / 2;
      girl.y = this.app.view.height / 2;
      this.app.stage.addChild(girl);

      // 5.アニメーション
      let downTextures = [
        textures["sailor_girl_01"],
        textures["sailor_girl_00"],
        textures["sailor_girl_01"],
        textures["sailor_girl_02"],
      ];
      let walk_girl = new PIXI.AnimatedSprite(downTextures);
      walk_girl.anchor.set(0.5);
      walk_girl.x = this.app.view.width / 2 + 64;
      walk_girl.y = this.app.view.height / 2;
      walk_girl.animationSpeed = 0.05;
      walk_girl.play();
      this.app.stage.addChild(walk_girl);
    },
  },

  mounted: function () {
    this.app = new PIXI.Application({
      view: this.$el,
      backgroundColor: 0xdae8f4,
    });

    const loader = PIXI.Loader.shared;

    // npm run serve時のリロードで同名ファイル名読み込みエラーを防ぐ
    loader.reset();

    // 1.pngファイルを読み込む
    loader.add(GirlSpritesPng);
    loader.load(this.onAssetsLoaded);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
