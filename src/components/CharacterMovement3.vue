<template>
  <canvas width="800" height="600"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";
import SailorGirlContainer from "@/lib/SailorGirlContainer.js";

export default {
  name: "CharacterMovement3",
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
      this.moveSailorGirl(delta);
    },
    /** セーラー少女の移動処理 */
    moveSailorGirl: function(delta) {
      // 加速度定義
      const ACCELERATION = 3;

      // 速度ベクトル初期化
      let vvx = 0;
      let vvy = 0;
      // WASDのキー情報を確認して、速度ベクトルを変更する。
      if (this.keyPressed["w"]) {
        vvy -= 1;
      }
      if (this.keyPressed["a"]) {
        vvx -= 1;
      }
      if (this.keyPressed["s"]) {
        vvy += 1;
      }
      if (this.keyPressed["d"]) {
        vvx += 1;
      }

      // 移動ベクトルノルムが0以上の場合に移動処理する
      const norm = Math.hypot(vvx, vvy);
      if (norm > 0) {
        // 移動速度を計算する
        const vx = (vvx / norm) * ACCELERATION * delta;
        const vy = (vvy / norm) * ACCELERATION * delta;

        // 新しい座標を計算する
        let { newx, newy } = this.correctMoving(
          this.sailorGirl.x + vx,
          this.sailorGirl.y + vy
        );

        // セーラー少女
        this.sailorGirl.x = newx;
        this.sailorGirl.y = newy;

        // 方向を設定する。
        this.sailorGirl.setDirectionFrom2D(vx, vy);
      }
    },
    /** 障害物等を考慮し座標を補正をする */
    correctMoving: function(x, y) {
      // 画面外に出ないようにする
      const newx = this.fitInRange(x, 0 + 1, this.app.view.width - 1);
      const newy = this.fitInRange(y, 0 + 1, this.app.view.height - 1);

      return { newx, newy };
    },
    /** 第1引数を第2引数と第3引数の範囲に収めた値を返す */
    fitInRange: function(num, minNum, maxNum) {
      return Math.max(minNum, Math.min(maxNum, num));
    }
  },
  mounted: async function() {
    this.app = new PIXI.Application({
      view: this.$el,
      backgroundColor: 0xdae8f4
    });

    // npm run serve時のリロードで同名ファイル名読み込みエラーを防ぐ
    PIXI.Loader.shared.reset();

    this.sailorGirl = await new SailorGirlContainer();
    this.onSailorGirlLoaded();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
