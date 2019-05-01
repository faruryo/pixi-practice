# 作り方

<!-- TOC depthFrom:2 -->

- [プロジェクト準備](#プロジェクト準備)
    - [vue-cliのインストール](#vue-cliのインストール)
    - [プロジェクトを作成する](#プロジェクトを作成する)
    - [pixi.jsインストール](#pixijsインストール)
- [はじめてのVue.js](#はじめてのvuejs)
    - [HelloPixi](#hellopixi)
- [はじめてのPixi.js](#はじめてのpixijs)
    - [不要なコードを削除する](#不要なコードを削除する)
    - [import](#import)
    - [logo.pngを表示して回転させてみる](#logopngを表示して回転させてみる)
    - [文字を表示させてみる](#文字を表示させてみる)
- [buildする](#buildする)
    - [build](#build)
    - [build資材を動かしてみる](#build資材を動かしてみる)
- [キー入力でロゴを動かす](#キー入力でロゴを動かす)
    - [キーボード入力を受け付ける](#キーボード入力を受け付ける)
    - [Unexpected console statementの表示を止める](#unexpected-console-statementの表示を止める)
    - [キーボード入力状態変数](#キーボード入力状態変数)
    - [ゲームループを実装する](#ゲームループを実装する)
    - [速度計算とロゴ移動](#速度計算とロゴ移動)
- [キャラクターアニメーション](#キャラクターアニメーション)
    - [キャラクター画像生成](#キャラクター画像生成)
    - [スプライトデータ作成](#スプライトデータ作成)
    - [Pixi.jsのテクスチャで画像を読み込む](#pixijsのテクスチャで画像を読み込む)

<!-- /TOC -->

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

ブラウザで <http://localhost:8080/> にアクセスするとサンプルが表示されるはずなので確認しておく。

### pixi.jsインストール

```bash
npm install pixi.js
```

## はじめてのVue.js

Vue.jsのファイル構成がわかるようにファイルを変更していく。

関連ファイルを保存すると <http://localhost:8080/> が更新されるはずなので、ファイルの一文言を変更するたびにファイルを保存して動作を確認すると理解が早い。

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

参考
[Vue.jsでの画像指定方法を間違ってたので、振り返る](https://qiita.com/skmtko/items/a83f836b48f24309916d)

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

textSmall初期化部を下記のように`this.msg`を渡してみると、App.vueのtemplate内の`<HelloPixi msg="Welcome to Your Pixi.js App"/>`で渡した文字が表示できる。

```vue:HelloPixi.vue
    let textSmall = new PIXI.Text(this.msg, styleSmall);
```

## buildする

### build

```bash
npm run build
```

ファイルサイズがどうとかというWarningが出てくるかもしれないが、とりあえず動くのでここでは触れない。

デフォルトだとdistディレクトリにビルド結果のファイルを置かれているので確認してみる。

```bash
ls -lt dist
```

### build資材を動かしてみる

お試し動作コマンドをインストールする。

```bash
npm install -g serve
```

お試し動作させてみる。

```bash
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

ブラウザで <http://localhost:5000> にアクセスするとさっきと同じように動いているのが確認できるはず

## キー入力でロゴを動かす

PCゲーマーならお馴染みのWASDを使ったキーボード入力を実装してみる。

### キーボード入力を受け付ける

src/components/MoveLogo.vueを作成し、下記の通り入力する。

```vue:MoveLogo.vue
<template>
  <canvas width="800" height="600"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";
import AssetsImageLogo from "@/assets/logo.png";

export default {
  name: "MoveLogo",
  mounted() {
    //------画像のアニメーション-----//
    // 表示するcanvasを用意
    const app = new PIXI.Application({
      view: this.$el,
      backgroundColor : 0xDAE8F4
    });

    // イメージを指定
    let logo = PIXI.Sprite.fromImage(AssetsImageLogo);

    // 画像のアンカーポイントの指定
    logo.anchor.set(0.5);

    // 画像を画面中央に移動
    logo.x = app.screen.width / 2;
    logo.y = app.screen.height / 2;

    // ステージに表示させる
    app.stage.addChild(logo);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

参考

- [Canvas の組み込み | 基礎から学ぶ Vue.js](https://cr-vue.mio3io.com/examples/canvas.html)
- [Pixi.js v4で自前のcanvas使う](https://qiita.com/zuya/items/9d5071bba4d98e4d4a9f)

このままでは画面に表示されないので、App.vueのtemplateに下記のように書き加えるとVue.jsのロゴが表示される。

```vue:App.vue
<template>
  <div id="app">
    <h2>HelloPixi</h2>
    <HelloPixi msg="Welcome to Your Pixi.js App"/>
    <h2>MoveLogo</h2>
    <MoveLogo />
  </div>
</template>
```

次に、MoveLogo.vueにキーボードリスナを登録し、キーボード入力をconsoleに表示してみる。

今回使ったのはkeydownイベントとkeyupイベントなので、キーボードを押したタイミングと話したタイミングでconsoleに対応するキー名が表示される。

```vue:MoveLogo.vue
    // ステージに表示させる
    app.stage.addChild(logo);

    // キーボードが押されたイベント
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }
}

function handleKeyDown(e){
  var key = e.key;
  console.log(key);
}

function handleKeyUp(e){
  var key = e.key;
  console.log(key);
}
</script>
```

### Unexpected console statementの表示を止める

上記のコード入力を保存したところでconsoleが未定義というeslintのエラーが出るが、問題なく動くので設定を変更しておく。

いろいろな設定方法があるみたいだけど、package.jsonに書いておくのがスマートそう。

```json:package.json
    "rules": {
      "no-console": "off"
    },
```

保存した後にnpm run serveをCtrl+Cで停止したあともう一度実行するとエラーが出ないはず。

参考

- [Step by Stepで始めるESLint](https://qiita.com/howdy39/items/6e2c75861bc5a14b2acf)
- [Configuration Reference | Vue CLI](https://cli.vuejs.org/config/#eslint)

### キーボード入力状態変数

ゲームでキーの入力状態を利用するために、`keyPressed`変数を作成する。

```vue:MoveLogo.vue
let keyPressed = {};

function handleKeyDown(e){
  var key = e.key;
  keyPressed[key] = true;
  console.log(keyPressed);
}

function handleKeyUp(e){
  var key = e.key;
  keyPressed[key] = false;
  console.log(keyPressed);
}
</script>
```

keyPressedによってユーザがどのキーを押しているのかがわかり、複数キー同時押し状態にも対応できる。

### ゲームループを実装する

ゲームループを実装する。これでconsoleにgameloop中の変数が出力される。
ついでに、handleKeyのconsoleも削除しておく。

```vue:MoveLogo.vue
    // キーボードが押されたイベント
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // ゲームループを実装
    app.ticker.add(delta => gameloop(delta, logo));
  }
}


let keyPressed = {};

function handleKeyDown(e){
  var key = e.key;
  keyPressed[key] = true;
}

function handleKeyUp(e){
  var key = e.key;
  keyPressed[key] = false;
}

// ゲームループで動かす関数
function gameloop(delta, logo) {
  console.log(’delta:’ + delta);
  console.log(logo);
  console.log(keyPressed);
}
</script>
```

### 速度計算とロゴ移動

このgameloop function内でkeyPressedを利用して、logoの位置を移動できるように変更する。

```vue:MoveLogo.vue
// ゲームループで動かす関数
function gameloop(delta, logo) {
  // 速度初期化
  let vx = 0;
  let vy = 0;
  // 加速度定義
  const ACCELERATION = 3;

  // WASDのキー情報を確認して、速度を変更する。
  if (keyPressed['w']) {
    vy -= ACCELERATION;
  }
  if (keyPressed['a']) {
    vx -= ACCELERATION;
  }
  if (keyPressed['s']) {
    vy += ACCELERATION;
  }
  if (keyPressed['d']) {
    vx += ACCELERATION;
  }

  // delta(前回実行時からの時間)と算出した速度をかけあわせて
  // logoを移動させる。
  logo.x += vx * delta;
  logo.y += vy * delta;
}
</script>
```

## キャラクターアニメーション

主に、[Pixi.js でゲームを作ってみる vol.1](https://ryo620.org/2016/12/pixijs-game-01/)を参考にしてキャラクターを表示してアニメーションさせてみる。

### キャラクター画像生成

[WOLF RPGエディターのダウンロード](http://www.silversecond.com/WolfRPGEditor/Download.html)からグラフィック合成器をダウンロードして利用する。

Windowsしか対応していないので注意。。。

こんな感じでセーラー服少女を用意してみた。画像セットをデフォルト企画　大にしたのは、ある程度解像度が欲しかったから。

![グラフィック合成器](images/graphic_gouseiki.png)

src/assets/sailor_girl.pngに画像データを保存する。

### スプライトデータ作成

[ShoeBox](http://renderhjs.net/shoebox/)を使ってpixi.jsで使うsprite用のデータセットを準備する。

まずインストール項目を読んで、インストールし、起動する。

![ShoeBox Home](images/shoebox_home.png)

先ほど保存したsailor_girl.pngをExtract Spritesにドラッグ&ドロップし、Saveを押す。

![ShoeBox Extract Sprites](images/shoebox_extract_sprites.png)
![ShoeBox Extract Sprites Settings](images/shoebox_extract_sprites_settings.png)

するとsailor_girl_01~24.pngとsailor_girl.png.txtが作成されるので、これらのファイルを全て選択してSprite Sheetにドラッグ&ドロップする。

Settingsボタンを押し、Sprite Sheet Settings画面のTemplateでpixi.jsを選択し、Applyを押してからSaveを押すと、sprites.jsとsprites.pngが作成される。

![ShoeBox Sprite Sheet](images/shoebox_sprite_sheet.png)

順番や位置がぐちゃってるけど気にしない。

![ShoeBox Sprite Sheet Settings](images/shoebox_sprite_sheet_settings.png)

sprites.jsはsailor_girl_sprites.jsonに、sprites.pngはsailor_girl_sprites.pngに命名変更する。

sailor_girl_01~24.pngとsailor_girl.png.txtは不要になるので削除する。

### Pixi.jsのテクスチャで画像を読み込む