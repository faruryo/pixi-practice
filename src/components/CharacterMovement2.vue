<template>
  <canvas width="800" height="600"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";
import SailorGirlContainer from "@/lib/SailorGirlContainer.js";

export default {
  name: "CharacterMovement",
  methods: {
    /** Spritesheet生成完了後の非同期処理 */
    onSailorGirlLoaded: function() {

      this.sailorGirl.x = this.app.view.width / 2;
      this.sailorGirl.y = this.app.view.height / 2;
      this.sailorGirl.scale.x = 2;
      this.sailorGirl.scale.y = 2;

      this.app.stage.addChild(this.sailorGirl);

      // キーボードが押されたイベント
      this.keyPressed = {};
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);

      // ゲームループを実装
      this.app.ticker.add(delta => this.gameloop(delta));
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
      // this.sailorGirlを移動させる。
      this.sailorGirl.x += vx * delta;
      this.sailorGirl.y += vy * delta;

      // 方向を設定する。
      this.sailorGirl.setDirectionFrom2D(vx, vy);
    }
  },
  mounted: function() {
    this.app = new PIXI.Application({
      view: this.$el,
      backgroundColor: 0xdae8f4
    });

    // npm run serve時のリロードで同名ファイル名読み込みエラーを防ぐ
    PIXI.loader.reset();

    this.sailorGirl = new SailorGirlContainer(this.onSailorGirlLoaded);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
