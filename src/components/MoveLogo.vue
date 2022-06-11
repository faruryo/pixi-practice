<template>
  <canvas width="800" height="600"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";
import AssetsImageLogo from "@/assets/logo.png";

import { defineComponent } from "vue";

export default defineComponent({
  name: "MoveLogo",

  mounted() {
    //------画像のアニメーション-----//
    // 表示するcanvasを用意
    const app = new PIXI.Application({
      view: this.$el,
      backgroundColor: 0xdae8f4,
    });

    // イメージを指定
    let logo = PIXI.Sprite.from(AssetsImageLogo);

    // 画像のアンカーポイントの指定
    logo.anchor.set(0.5);

    // 画像を画面中央に移動
    logo.x = app.screen.width / 2;
    logo.y = app.screen.height / 2;

    // ステージに表示させる
    app.stage.addChild(logo);

    // キーボードが押されたイベント
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // ゲームループを実装
    app.ticker.add((delta) => gameloop(delta, logo));
  },
});

let keyPressed = {};

function handleKeyDown(e) {
  var key = e.key;
  keyPressed[key] = true;
}

function handleKeyUp(e) {
  var key = e.key;
  keyPressed[key] = false;
}

// ゲームループで動かす関数
function gameloop(delta, logo) {
  // 速度初期化
  let vx = 0;
  let vy = 0;
  // 加速度定義
  const ACCELERATION = 3;

  // WASDのキー情報を確認して、速度を変更する。
  if (keyPressed["w"]) {
    vy -= ACCELERATION;
  }
  if (keyPressed["a"]) {
    vx -= ACCELERATION;
  }
  if (keyPressed["s"]) {
    vy += ACCELERATION;
  }
  if (keyPressed["d"]) {
    vx += ACCELERATION;
  }

  // delta(前回実行時からの時間)と算出した速度をかけあわせて
  // logoを移動させる。
  logo.x += vx * delta;
  logo.y += vy * delta;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
