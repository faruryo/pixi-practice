<template>
  <div class="hello">
    <div class="stage" id="stage"></div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import AssetsImageLogo from "@/assets/logo.png";

export default {
  name: 'HelloPixi',
  props: {
    msg: String
  },
  mounted () {
    //------画像のアニメーション-----//
    // 表示するcanvasを用意
    let app = new PIXI.Application(800, 600, {backgroundColor : 0xDAE8F4});
    document.getElementById('stage').appendChild(app.view);

    // イメージを指定
    let logo = PIXI.Sprite.from(AssetsImageLogo);

    // 画像のアンカーポイントの指定
    logo.anchor.set(0.5);

    // 画像を画面中央に移動
    logo.x = app.screen.width / 2;
    logo.y = app.screen.height / 2.5;

    // ステージに表示させる
    app.stage.addChild(logo);

    // アニメーションの再生、ループ
    app.ticker.add(function(delta) {
        // 画像を回転
        logo.rotation += 0.05 * delta;
    });

    //------テキストの描画-----//

    // スタイルを指定
    let styleBig = new PIXI.TextStyle({
        fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
        fontSize: 70,
        align: 'center',
        wordWrapWidth: 1000,
        wordWrap: true
    });
    let styleSmall =  new PIXI.TextStyle({
        fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
        fontSize: 40,
        align: 'center',
        wordWrapWidth: 1000,
        wordWrap: true
    });

    // スタイルを反映
    let textBig = new PIXI.Text('Vue.js', styleBig);
    textBig.anchor.set(0.5);

    let textSmall = new PIXI.Text(this.msg, styleSmall);
    textSmall.anchor.set(0.5);

    // テキストの位置を指定
    textBig.x = 400;
    textBig.y = 430;
    textSmall.x = 400;
    textSmall.y = 530;

    // ステージに表示させる
    app.stage.addChild(textBig);
    app.stage.addChild(textSmall);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
