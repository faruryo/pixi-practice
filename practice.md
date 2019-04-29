# 作り方

## プロジェクト準備

参考：[Vue.js を vue-cli を使ってシンプルにはじめてみる](https://qiita.com/567000/items/dde495d6a8ad1c25fa43)

### vue-cliのインストール

```bash
npm install -g @vue/cli
```

### プロジェクトを作成する

```bash
vue create pixi-practice
> default

cd pixi-practice
npm run serve
```

ブラウザで http://localhost:8080/ にアクセスするとサンプルが表示されるはずなので確認しておく。

### pixi.jsインストール

```bash
npm install pixi.js
```

## はじめてのVue.js

Vue.jsのファイル構成がわかるようにファイルを変更していく。

関連ファイルを保存すると http://localhost:8080/ が更新されるはずなので、ファイルの一文言を変更するたびにファイルを保存して動作を確認すると理解が早い。

### HelloPixi

App.vueのtemplateを下記のように書き換えて保存し、ロゴが消え、文言が変わることを確認する。

```vue:App.vue
<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Pixi.js App"/>
  </div>
</template>
```

templateとscriptのHelloWorldをHelloPixiに書き換える。

```vue:App.vue
<template>
  <div id="app">
    <HelloPixi msg="Welcome to Your Pixi.js App"/>
  </div>
</template>

<script>
import HelloPixi from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloPixi
  }
}
</script>
```

scriptのHelloWorld.vueをHelloPixi.vueに書き換え、ブラウザエラーもしくは何も表示されなくなることを確認する。

```vue:App.vue
<script>
import HelloPixi from './components/HelloPixi.vue'
```

ファイル名HelloWorld.vueをHelloPixi.vueに書き換えるとブラウザ表示されるはず。

念の為HelloPixi.vueの下記Script部分もHelloWorldをHelloPixiに書き換える。

```vue:HelloPixi.vue
<script>
export default {
  name: 'HelloPixi',
  props: {
    msg: String
  }
}
</script>
```

## はじめてのPixi.js

参考
[Pixi.jsでCanvasをカンタンに触ってみよう！](https://liginc.co.jp/398188)
[Pixi.js でゲームを作ってみる vol.1](https://ryo620.org/2016/12/pixijs-game-01/)

### 不要なコードを削除する

HelloPixi.vueのtemplateとstyleを色々削除しておく。

```vue:HelloPixi.vue
<template>
  <div class="hello">
    <div class="stage" id="stage"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

### import

HelloPixi.vueのscriptの冒頭に下記を記載する。

1行目でpixi.js読み込みで、2行目は今回のサンプルで利用するlogo.pngを利用する準備。これらのファイルを利用することをvue-cliに教えておくおことで、vue-cliでバンドルする際にパス関連等をうまく調整してくれる。

```vue:HelloPixi.vue
<script>
import * as PIXI from 'pixi.js';
import AssetsImageLogo from "@/assets/logo.png";
```

### logo.pngを表示して回転させてみる

HelloPixi.vueのscriptの`export default`の部分を書き換えて、Vue.jsのロゴを回転させてみる。

```vue:HelloPixi.vue
export default {
  name: 'HelloPixi',
  props: {
    msg: String
  },
  mounted () {
    // 表示するcanvasを用意
    let app = new PIXI.Application(800, 600, {backgroundColor : 0xDAE8F4});
    document.getElementById('stage').appendChild(app.view);

    //------画像のアニメーション-----//

    // イメージを指定
    let logo = PIXI.Sprite.fromImage(AssetsImageLogo);

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
  }
}
```

### 文字を表示させてみる

さらにscript部分を書き換えて文字を表示させてみる。

```vue:HelloPixi.vue
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

    let textSmall = new PIXI.Text('Hello, Pixi.js', styleSmall);
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
```

textSmall初期化部を下記のようにthis.msgを渡してみると、App.vueのtemplate内の`<HelloPixi msg="Welcome to Your Pixi.js App"/>`で渡した文字が表示できる。

```vue:HelloPixi.vue
    let textSmall = new PIXI.Text(this.msg, styleSmall);
```

## buildする

### build

```bash
npm run build
```

デフォルトだとdistディレクトリにビルド結果のファイルを置かれているので確認してみる。

```bash
ls -lt dist
```

### build資材を動かしてみる

```bash
# お試し動作コマンドをインストール
npm install -g serve

# お試し動作させてみる
serve -s dist

   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:5000      │
   │   - On Your Network:  http://192.168.X.X:5000    │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

ブラウザで http://localhost:5000 にアクセスするとさっきと同じように動いているのが確認できるはず。