<template>
  <canvas width="800" height="600"></canvas>
</template>



<script>
import _ from "lodash";
import * as PIXI from "pixi.js";
import SailorGirlContainer from "@/lib/SailorGirlContainer.js";
import BattleEffect from "@/lib/BattleEffect.js";
import { defineComponent } from "vue";
// import BaseSprite from "@/lib/BaseSprite.js";

export default defineComponent({
  name: "BattleEffect1",

  methods: {
    /** Spritesheet生成完了後の非同期処理 */
    loadSprites: function () {
      this.sailorGirl.x = this.app.view.width / 2;
      this.sailorGirl.y = this.app.view.height / 2;
      this.sailorGirl.scale.x = 2;
      this.sailorGirl.scale.y = 2;

      this.app.stage.addChild(this.sailorGirl);

      this.battleEffect.x = this.sailorGirl.x;
      this.battleEffect.y = this.sailorGirl.y;
      this.battleEffect.scale.x = 2;
      this.battleEffect.scale.y = 2;

      this.app.stage.addChild(this.battleEffect);

      // キーボードが押されたイベント
      this.keyPressed = {};
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);

      // マウスクリック時のイベント
      this.mousePressed = {};
      document.addEventListener("mousedown", this.handleMouseDown);
      document.addEventListener("mouseup", this.handleMouseUp);

      // ゲームループを実装
      this.app.ticker.add((delta) => this.gameloop(delta));
    },
    /** キーダウン時処理 */
    handleKeyDown: function (e) {
      this.keyPressed[e.key] = true;
    },
    /** キーアップ時処理 */
    handleKeyUp: function (e) {
      this.keyPressed[e.key] = false;
    },
    /** マウスダウン時処理 */
    handleMouseDown: function (e) {
      this.mousePressed[e.button] = true;
    },
    /** マウスアップ時処理 */
    handleMouseUp: function (e) {
      this.mousePressed[e.button] = false;
    },
    /** ゲームループ本体 */
    gameloop: function (delta) {
      this.moveSailorGirl(delta);
      this.moveBattleEffect(delta);
    },
    /** セーラー少女の操作処理 */
    moveSailorGirl: function (delta) {
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

      // 速度移動量初期化
      let vx = 0;
      let vy = 0;

      // 移動ベクトルノルムが0以上の場合に移動処理する
      const norm = Math.hypot(vvx, vvy);
      if (norm > 0) {
        // 移動速度を計算する
        vx = (vvx / norm) * ACCELERATION * delta;
        vy = (vvy / norm) * ACCELERATION * delta;
        this.sailorGirl.setDirectionFrom2D(vx, vy);

        // 新しい座標を計算する
        let { newx, newy } = this.correctMoving(
          this.sailorGirl.x + vx,
          this.sailorGirl.y + vy
        );
        vx = newx - this.sailorGirl.x;
        vy = newy - this.sailorGirl.y;

        this.sailorGirl.x = newx;
        this.sailorGirl.y = newy;
      }

      // 攻撃処理
      if (this.mousePressed[0]) {
        this.battleEffect.launch(
          this.sailorGirl.x,
          this.sailorGirl.y,
          vx,
          vy,
          this.sailorGirl.getDirectionByRadian()
        );
        console.log(this.sailorGirl.direction);
      }
    },
    /** バトルエフェクトの移動処理 */
    moveBattleEffect: function (delta) {
      // 移動速度を計算する
      const vx = this.battleEffect.vx * delta;
      const vy = this.battleEffect.vy * delta;

      let { newx, newy } = this.correctMoving(
        this.battleEffect.x + vx,
        this.battleEffect.y + vy
      );

      this.battleEffect.x = newx;
      this.battleEffect.y = newy;
    },
    /** 障害物等を考慮し座標を補正をする */
    correctMoving: function (x, y) {
      // 画面外に出ないようにする
      const newx = this.fitInRange(x, 0 + 1, this.app.view.width - 1);
      const newy = this.fitInRange(y, 0 + 1, this.app.view.height - 1);

      return { newx, newy };
    },
    /** 第1引数を第2引数と第3引数の範囲に収めた値を返す */
    fitInRange: function (num, minNum, maxNum) {
      return Math.max(minNum, Math.min(maxNum, num));
    },
    /** イメージロード */
    loadImages: function (imageURLs) {
      const loader = PIXI.Loader.shared;
      loader.reset(); // npm run serve時のリロードで同名ファイル名読み込みエラーを防ぐ
      loader.add(imageURLs);

      return new Promise((resolve) => {
        loader.load(() => {
          resolve();
        });
      });
    },
  },

  mounted: async function () {
    this.app = new PIXI.Application({
      view: this.$el,
      backgroundColor: 0xdae8f4,
    });

    let imageURLs = _.uniqBy([
      ...SailorGirlContainer.getImageURLs(),
      ...BattleEffect.getImageURLs(),
    ]);
    await this.loadImages(imageURLs);

    this.sailorGirl = await new SailorGirlContainer();
    this.battleEffect = await new BattleEffect();

    this.loadSprites();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
