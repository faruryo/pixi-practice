# お勉強ノート

Vue.js 上で pixi.js v5 を用いたゲーム作りをするべく、プロジェクトを作成するところから順を追って説明する。

<!-- TOC depthFrom:2 -->

- [1. プロジェクト準備](#1-プロジェクト準備)
  - [1.1. vue-cli のインストール](#11-vue-cli-のインストール)
  - [1.2. プロジェクトを作成する](#12-プロジェクトを作成する)
  - [1.3. pixi.js インストール](#13-pixijs-インストール)
- [2. はじめての Vue.js](#2-はじめての-vuejs)
  - [2.1. HelloPixi](#21-hellopixi)
- [3. はじめての Pixi.js](#3-はじめての-pixijs)
  - [3.1. 不要なコードを削除する](#31-不要なコードを削除する)
  - [3.2. import](#32-import)
  - [3.3. logo.png を表示して回転させてみる](#33-logopng-を表示して回転させてみる)
  - [3.4. 文字を表示させてみる](#34-文字を表示させてみる)
- [4. build する](#4-build-する)
  - [4.1. build](#41-build)
  - [4.2. build 資材を動かしてみる](#42-build-資材を動かしてみる)
- [5. キー入力でロゴを動かす](#5-キー入力でロゴを動かす)
  - [5.1. キーボード入力を受け付ける](#51-キーボード入力を受け付ける)
  - [5.2. Unexpected console statement の表示を止める](#52-unexpected-console-statement-の表示を止める)
  - [5.3. キーボード入力状態変数](#53-キーボード入力状態変数)
  - [5.4. ゲームループを実装する](#54-ゲームループを実装する)
  - [5.5. 速度計算とロゴ移動](#55-速度計算とロゴ移動)
- [6. キャラクターアニメーション](#6-キャラクターアニメーション)
  - [6.1. キャラクター画像生成](#61-キャラクター画像生成)
  - [6.2. Texture Atras データ作成](#62-texture-atras-データ作成)
  - [6.3. (おまけ)Texture Atras データ作成 もう一つのやり方](#63-おまけtexture-atras-データ作成-もう一つのやり方)
  - [6.4. Texture Atras 形式で画像読み込み](#64-texture-atras-形式で画像読み込み)
  - [6.5. AnimatedSprite でキャラクターアニメーション](#65-animatedsprite-でキャラクターアニメーション)
- [7. キャラクターを歩かせてみる](#7-キャラクターを歩かせてみる)
  - [7.1. セーラー少女を動かしてみる](#71-セーラー少女を動かしてみる)
  - [7.2. 方向概念の導入](#72-方向概念の導入)
  - [7.3. 方向の AnimatedSprite を作成する](#73-方向の-animatedsprite-を作成する)
  - [7.4. Sprite をまとめる Container](#74-sprite-をまとめる-container)
  - [7.5. セーラー少女を歩かせる](#75-セーラー少女を歩かせる)
- [8. セーラー少女リファクタリング](#8-セーラー少女リファクタリング)
  - [8.1. SailorGirlContainer のコンストラクタ](#81-sailorgirlcontainer-のコンストラクタ)
  - [8.2. SailorGirlContainer の getter/setter](#82-sailorgirlcontainer-の-gettersetter)
- [9. 移動速度と移動制限](#9-移動速度と移動制限)
- [10. Vue Router](#10-vue-router)
- [11. 攻撃エフェクトアニメーション](#11-攻撃エフェクトアニメーション)
  - [11.1. 攻撃エフェクト素材準備](#111-攻撃エフェクト素材準備)

<!-- /TOC -->

## 1. プロジェクト準備

参考：[Vue.js を vue-cli を使ってシンプルにはじめてみる](https://qiita.com/567000/items/dde495d6a8ad1c25fa43)

### 1.1. vue-cli のインストール

```bash
npm install -g @vue/cli
```

### 1.2. プロジェクトを作成する

```bash
vue create pixi-practice
> default

cd pixi-practice
npm run serve
```

ブラウザで <http://localhost:8080/> にアクセスするとサンプルが表示されるはずなので確認しておく。

### 1.3. pixi.js インストール

```bash
npm install pixi.js@5
```

## 2. はじめての Vue.js

Vue.js のファイル構成がわかるようにファイルを変更していく。

関連ファイルを保存すると <http://localhost:8080/> が更新されるはずなので、ファイルの一文言を変更するたびにファイルを保存して動作を確認すると理解が早い。

### 2.1. HelloPixi

App.vue の template を下記のように書き換えて保存し、ロゴが消え、文言が変わることを確認する。

```vue:App.vue
<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Pixi.js App" />
  </div>
</template>

<script>
import HelloPixi from "./components/HelloPixi.vue";
import MoveLogo from "./components/MoveLogo.vue";

export default {
  name: "app",
  components: {
    HelloPixi,
    MoveLogo
  }
};
</script>
```

template と script の HelloWorld を HelloPixi に書き換える。

```vue:App.vue
<template>
  <div id="app">
    <HelloPixi msg="Welcome to Your Pixi.js App" />
  </div>
</template>

<script>
import HelloPixi from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloPixi
  }
};
</script>
```

script の HelloWorld.vue を HelloPixi.vue に書き換え、ブラウザエラーもしくは何も表示されなくなることを確認する。

```vue:App.vue
<script>
import HelloPixi from './components/HelloPixi.vue'
```

ファイル名 HelloWorld.vue を HelloPixi.vue に書き換えるとブラウザ表示されるはず。

念の為 HelloPixi.vue の下記 Script 部分も HelloWorld を HelloPixi に書き換える。

```vue:HelloPixi.vue
<script>
export default {
  name: "HelloPixi",
  props: {
    msg: String
  }
};
</script>
```

## 3. はじめての Pixi.js

- 参考
  - [Pixi.js で Canvas をカンタンに触ってみよう！](https://liginc.co.jp/398188)
  - [Pixi.js でゲームを作ってみる vol.1](https://ryo620.org/2016/12/pixijs-game-01/)

### 3.1. 不要なコードを削除する

HelloPixi.vue の template と style を色々削除しておく。

```vue:HelloPixi.vue
<template>
  <div class="hello">
    <div class="stage" id="stage"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
```

### 3.2. import

HelloPixi.vue の script の冒頭に下記を記載する。

1 行目で pixi.js 読み込みで、2 行目は今回のサンプルで利用する logo.png を利用する準備。これらのファイルを利用することを vue-cli に教えておくおことで、vue-cli でバンドルする際にパス関連等をうまく調整してくれる。

```vue:HelloPixi.vue
<script>
import * as PIXI from 'pixi.js';
import AssetsImageLogo from "@/assets/logo.png";
```

参考：[Vue.js での画像指定方法を間違ってたので、振り返る](https://qiita.com/skmtko/items/a83f836b48f24309916d)

### 3.3. logo.png を表示して回転させてみる

HelloPixi.vue の script の`export default`の部分を書き換えて、Vue.js のロゴを回転させてみる。

```javascript
export default {
  name: "HelloPixi",
  props: {
    msg: String
  },
  mounted() {
    // 表示するcanvasを用意
    let app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0xdae8f4
    });
    document.getElementById("stage").appendChild(app.view);

    //------画像のアニメーション-----//

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
  }
};
```

### 3.4. 文字を表示させてみる

さらに script 部分を書き換えて文字を表示させてみる。

```javascript
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

textSmall 初期化部を下記のように`this.msg`を渡してみると、App.vue の template 内の`<HelloPixi msg="Welcome to Your Pixi.js App"/>`で渡した文字が表示できる。

```vue:HelloPixi.vue
let textSmall = new PIXI.Text(this.msg, styleSmall);
```

## 4. build する

### 4.1. build

```bash
npm run build
```

ファイルサイズがどうとかという Warning が出てくるかもしれないが、とりあえず動くのでここでは触れない。

デフォルトだと dist ディレクトリにビルド結果のファイルを置かれているので確認してみる。

```bash
ls -lt dist
```

### 4.2. build 資材を動かしてみる

お試し動作コマンドをインストールする。

```bash
npm install -g serve
```

お試し動作させてみる。

```bash
$ serve -s dist

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

## 5. キー入力でロゴを動かす

PC ゲーマーならお馴染みの WASD を使ったキーボード入力を実装してみる。

### 5.1. キーボード入力を受け付ける

src/components/MoveLogo.vue を作成し、下記の通り入力する。

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
      backgroundColor: 0xdae8f4
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
```

- 参考
  - [Canvas の組み込み | 基礎から学ぶ Vue.js](https://cr-vue.mio3io.com/examples/canvas.html)
  - [Pixi.js v4 で自前の canvas 使う](https://qiita.com/zuya/items/9d5071bba4d98e4d4a9f)

このままでは画面に表示されないので、App.vue の template に下記のように書き加えると Vue.js のロゴが表示される。

```vue:App.vue
<template>
  <div id="app">
    <h2>HelloPixi</h2>
    <HelloPixi msg="Welcome to Your Pixi.js App" />
    <h2>MoveLogo</h2>
    <MoveLogo />
  </div>
</template>
```

次に、MoveLogo.vue にキーボードリスナを登録し、キーボード入力を console に表示してみる。

今回使ったのは keydown イベントと keyup イベントなので、キーボードを押したタイミングと話したタイミングで console に対応するキー名が表示される。

```javascript
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

### 5.2. Unexpected console statement の表示を止める

上記のコード入力を保存したところで console が未定義という eslint のエラーが出るが、問題なく動くので設定を変更しておく。

いろいろな設定方法があるみたいだけど、package.json に書いておくのがスマートそう。

```json:package.json
    "rules": {
      "no-console": "off"
    },
```

保存した後に npm run serve を Ctrl+C で停止したあともう一度実行するとエラーが出ないはず。

- 参考
  - [Step by Step で始める ESLint](https://qiita.com/howdy39/items/6e2c75861bc5a14b2acf)
  - [Configuration Reference | Vue CLI](https://cli.vuejs.org/config/#eslint)

### 5.3. キーボード入力状態変数

ゲームでキーの入力状態を利用するために、`keyPressed`変数を作成する。

```javascript
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

keyPressed によってユーザがどのキーを押しているのかがわかり、複数キー同時押し状態にも対応できる。

### 5.4. ゲームループを実装する

ゲームループを実装する。これで console に gameloop 中の変数が出力される。
ついでに、handleKey の console も削除しておく。

```javascript
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
  console.log('delta:' + delta);
  console.log(logo);
  console.log(keyPressed);
}
</script>
```

### 5.5. 速度計算とロゴ移動

この gameloop function 内で keyPressed を利用して、logo の位置を移動できるように変更する。

```javascript
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

## 6. キャラクターアニメーション

主に、[Pixi.js でゲームを作ってみる vol.1](https://ryo620.org/2016/12/pixijs-game-01/)を参考にしてキャラクターを表示してアニメーションさせてみる。

### 6.1. キャラクター画像生成

[WOLF RPG エディターのダウンロード](http://www.silversecond.com/WolfRPGEditor/Download.html)からグラフィック合成器をダウンロードして利用する。

Windows しか対応していないので注意。。。

こんな感じでセーラー服少女を用意してみた。画像セットをデフォルト企画　大にしたのは、ある程度解像度が欲しかったから。

![グラフィック合成器](images/graphic_gouseiki.png)

src/assets/sailor_girl.png に画像データを保存する。

### 6.2. Texture Atras データ作成

たんしおレモンさんのサイトの[Pixi.js のスプライト json ファイル生成ツール](http://www.tansio.net/mobile/twitter/00002/)を利用して作成したキャラクター画像から Texture Atras 形式のデータを生成する。

まず src/assets/sailor_girl.png を src/assets/sailor_girl_sprites_tansio.png にコピーしておこう。

つぎに src/assets/sailor_girl_sprites_tansio.json をテキストファイルとして生成しておく。

[Pixi.js のスプライト json ファイル生成ツール](http://www.tansio.net/mobile/twitter/00002/)をブラウザで表示して、下記の通り入力してから生成ボタンを押す。

```form
ファイル名：sailor_girl_sprites_tansio.png
テクスチャ名：sailor_girl_@@
取り出しＸサイズ：32
取り出しＹサイズ：48
取り出し総数：24
画像Ｘサイズ：192
画像Ｙサイズ：192
パディング：0
```

下部フォームに json 情報が生成されるので、そのデータを sailor_girl_sprites_tansio.json に入力する。

### 6.3. (おまけ)Texture Atras データ作成 もう一つのやり方

[ShoeBox](http://renderhjs.net/shoebox/)というツールを使い、作成したキャラクター画像から Texture Atras 形式のデータを生成することもできる。

たんしおさんツールで作成した時と比べ、画像サイズが最小になって良かったりもするのだが、余白がすべて削り取られることにより、アニメーション位置がずれるので調整が必要になるので、アニメーションする場合は注意を要する。

まずインストール項目を読んで、インストールし、起動する。

![ShoeBox Home](images/shoebox_home.png)

先ほど保存した sailor_girl.png を Extract Sprites にドラッグ&ドロップし、Save を押す。

![ShoeBox Extract Sprites](images/shoebox_extract_sprites.png)
![ShoeBox Extract Sprites Settings](images/shoebox_extract_sprites_settings.png)

上記を実行すると sailor_girl_01~24.png と sailor_girl.png.txt が作成されるので、これらのファイルを全て選択して Sprite Sheet にドラッグ&ドロップする。

Settings ボタンを押し、Sprite Sheet Settings 画面の Template で pixi.js を選択し、Apply を押してから Save を押すと、sprites.js と sprites.png が作成される。

![ShoeBox Sprite Sheet](images/shoebox_sprite_sheet.png)
![ShoeBox Sprite Sheet Settings](images/shoebox_sprite_sheet_settings.png)

png ファイルは見ての通り全ての画像を合体した一つのファイルになっていて、json ファイルは個々の画像を png ファイルのどこにあるかなどをまとめた形になっている。

なので、順番や位置がぐちゃってるけど気にしない。

sprites.js は sailor_girl_sprites_shoebox.json に、sprites.png は sailor_girl_sprites_shoebox.png に命名変更する。

json ファイルの中にもファイル名が書かれているので、sailor_girl_sprites_shoebox.json の meta 情報も変更する。

```json:sailor_girl_sprites_shoebox.json
  "meta": {
    "image": "sailor_girl_sprites_shoebox.png",
      "size": { "w": 172, "h": 152 },
    "scale": "1"
  }
```

sailor_girl_01~24.png と sailor_girl.png.txt は不要になるので削除する。

### 6.4. Texture Atras 形式で画像読み込み

下記の通り、src/components/CharacterAnimation.vue を新しく作成する。

```vue:CharacterAnimation.vue
<template>
  <canvas width="800" height="600"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";
import GirlSpritesJson from "@/assets/sailor_girl_sprites_tansio.json";
import GirlSpritesPng from "@/assets/sailor_girl_sprites_tansio.png";

export default {
  name: "CharacterAnimation",
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
      // 4.テクスチャを取り出す
      let texture = textures["sailor_girl_01"];
      let girl = PIXI.Sprite.from(texture);
      girl.anchor.set(0.5);
      girl.x = this.app.view.width / 2;
      girl.y = this.app.view.height / 2;
      this.app.stage.addChild(girl);
    }
  },
  mounted: function() {
    this.app = new PIXI.Application({
      view: this.$el,
      backgroundColor: 0xdae8f4
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
<style scoped></style>
```

App.vue に作成した CharacterAnimation を記述して画面表示してみよう。

```vue:App.vue
<template>
  <div id="app">
    <h2>HelloPixi</h2>
    <HelloPixi msg="Welcome to Your Pixi.js App" />
    <h2>MoveLogo</h2>
    <MoveLogo />
    <h2>CharacterAnimation</h2>
    <CharacterAnimation />
  </div>
</template>

<script>
import HelloPixi from "./components/HelloPixi.vue";
import MoveLogo from "./components/MoveLogo.vue";
import CharacterAnimation from "./components/CharacterAnimation.vue";

export default {
  name: "app",
  components: {
    HelloPixi,
    MoveLogo,
    CharacterAnimation
  }
};
</script>
```

- 参考

  - [Refactors the spritesheet, texture and bitmap font loaders by bigtimebuddy · Pull Request #3676 · pixijs/pixi.js](https://github.com/pixijs/pixi.js/pull/3676)
  - [Reloading a spritesheet · Issue #2419 · pixijs/pixi.js](https://github.com/pixijs/pixi.js/issues/2419)

### 6.5. AnimatedSprite でキャラクターアニメーション

onSpritesheetLoaded に下記の通りコードを追記して歩くセーラー服少女を表示してみよう。

```javascript
    onSpritesheetLoaded: function(textures) {
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
        textures["sailor_girl_03"]
      ];
      let walk_girl = new PIXI.AnimatedSprite(downTextures);
      walk_girl.anchor.set(0.5);
      walk_girl.x = this.app.view.width / 2 + 64;
      walk_girl.y = this.app.view.height / 2;
      walk_girl.animationSpeed = 0.05;
      walk_girl.play();
      this.app.stage.addChild(walk_girl);
    }
  },
```

## 7. キャラクターを歩かせてみる

### 7.1. セーラー少女を動かしてみる

まずは[キー入力でロゴを動かす](#キー入力でロゴを動かす)と[キャラクターアニメーション](#キャラクターアニメーション)を組み合わせてアニメーションさせたセーラー少女を動かしてみよう。

例のごとく CharacterMovement.vue を新しく作成する。一部だけ示すとこんな感じになるだろう。

```javascript
    /** Spritesheet生成完了後の非同期処理 */
    onSpritesheetLoaded: function(textures) {
      let downTextures = [
        textures["sailor_girl_01"],
        textures["sailor_girl_00"],
        textures["sailor_girl_01"],
        textures["sailor_girl_02"]
      ];
      this.walk_girl = new PIXI.AnimatedSprite(downTextures);
      this.walk_girl.anchor.set(0.5);
      this.walk_girl.x = this.app.view.width / 2 + 64;
      this.walk_girl.y = this.app.view.height / 2;
      this.walk_girl.animationSpeed = 0.05;
      this.walk_girl.play();
      this.app.stage.addChild(this.walk_girl);

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
      // this.walk_girlを移動させる。
      this.walk_girl.x += vx * delta;
      this.walk_girl.y += vy * delta;
    }
  },
```

これまで同様に App.vue に要素を追加するとこんな感じで WASD で動くセーラー少女が表示されるはずだ。

![CharacterMovement01.gif](images/CharacterMovement01.gif)

これだと横滑りしているだけで味気ないので、方向の概念を取り入れよう。

### 7.2. 方向概念の導入

下記のコードを書き加えると console に移動方向に応じた方向が表示されるはずだ。

```javascript
      // delta(前回実行時からの時間)と算出した速度をかけあわせて
      // this.walk_girlを移動させる。
      this.walk_girl.x += vx * delta;
      this.walk_girl.y += vy * delta;

      // 方向を計算する。
      let direction = this.getDirection(vx, vy);
      console.log(" dir:" + direction);
    },
    /** 方向計算用メソッド */
    getDirection: function(vx, vy) {
      if( vx === undefined || vy === undefined ) {
        return undefined;
      }
      if( vx === 0 && vy === 0 ) {
        return undefined;
      }

      let rad = Math.atan2(vy, vx);

      if (rad <= - 7/8 * Math.PI || rad >= + 7/8 * Math.PI) {
        return "left";
      }
      if (rad >= - 7/8 * Math.PI && rad <= - 5/8 * Math.PI) {
        return "upleft";
      }
      if (rad >= - 5/8 * Math.PI && rad <= - 3/8 * Math.PI) {
        return "up";
      }
      if (rad >= - 3/8 * Math.PI && rad <= - 1/8 * Math.PI) {
        return "upright";
      }
      if (rad >= - 1/8 * Math.PI && rad <= + 1/8 * Math.PI) {
        return "right";
      }
      if (rad >= + 1/8 * Math.PI && rad <= + 3/8 * Math.PI) {
        return "downright";
      }
      if (rad >= + 3/8 * Math.PI && rad <= + 5/8 * Math.PI) {
        return "down";
      }
      if (rad >= + 5/8 * Math.PI && rad <= + 7/8 * Math.PI) {
        return "downleft";
      }

      throw "Unknown Error in getDirection";
    }
  },
```

getDirection は移動方向に応じた方向を文字列で返すメソッドである。アークタンジェントを使った計算をしているので遅いかもしれない。必要があったら改良の余地があると思う。

### 7.3. 方向の AnimatedSprite を作成する

次に 8 方向の AnimatedSprite を作成する。下記のように createDirectionSprites メソッドと createAnimatedSprite メソッドを追加しよう。

```javascript
    /** AnimatedSpriteを作成して返す */
    createAnimatedSprite: function(textureArray) {
      let sprite = new PIXI.AnimatedSprite(textureArray);
      sprite.anchor.set(0.5);
      sprite.animationSpeed = 0.05;
      sprite.play();

      return sprite;
    },
```

createAnimatedSprite はテスクチャ要素が入った配列オブジェクトを渡すと AnimatedSprite に変換してくれるしろもの。AnimatedSprite 生成時の共通処理をまとめる。

```javascript
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
```

createDirectionSprites は Spritesheet のテクスチャハッシュオブジェクトを渡すと、8 方向の AnimatedSprite を方向をキーとしたハッシュオブジェクトに変換してくれる。コードが長いので関数化したが、そろそろファイル分割もしたいところ。

これで 8 方向の AnimatedSprite を作成する準備が整った。

### 7.4. Sprite をまとめる Container

8 方向の AnimatedSprite を使ったらこれらの Sprite をまとめるために、Container を作成し関連づける。

```javascript
    /** Spritesheet生成完了後の非同期処理 */
    onSpritesheetLoaded: function(textures) {
      // girl関連SpriteをまとめるContainerを作る
      this.girlContainer = new PIXI.Container();

      // 8方向セーラー少女を生成
      this.girls = this.createDirectionSprites(textures);

      // 8方向セーラー少女の位置を設定しContainerに追加する
      let i = 0;
      for (let key in this.girls) {
        this.girls[key].x = 100 + i*64;
        this.girls[key].y = this.app.view.height / 2;
        this.girlContainer.addChild(this.girls[key]);
        i += 1;
      }

      this.app.stage.addChild(this.girlContainer);

      // キーボードが押されたイベント
      this.keyPressed = {};
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);

      // ゲームループを実装
      this.app.ticker.add(delta => this.gameloop(delta));
    },
```

walk_girl の移動は下記の通り girlContainer の移動に書き換える。

```javascript
// delta(前回実行時からの時間)と算出した速度をかけあわせて
// this.girlContainerを移動させる。
this.girlContainer.x += vx * delta;
this.girlContainer.y += vy * delta;
```

ここまで実装すると、8 方向のセーラー少女が画面に表示され、まとめて WASD 移動できるようになっているはず。

![CharacterMovement02.gif](images/CharacterMovement02.gif)

### 7.5. セーラー少女を歩かせる

現在セーラー少女が向いている方向に合わせて、向いている方向の AnimatedSprite だけを表示するようにする。

```javascript
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
```

```javascript
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
```

方向を設定するためのメソッドは setDirection として新規作成した。

```javascript
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
```

![CharacterMovement03.gif](images/CharacterMovement03.gif)

## 8. セーラー少女リファクタリング

セーラー少女をオブジェクト志向にリファクタリングしてみる。

CharacterMovement.vue と同じように動作する[src/components/CharacterMovement2.vue](../src/components/CharacterMovement2.vue)を作成する。

そして、セーラー少女の核となる SailorGirlContainer を[src/lib/SailorGirlContainer.js](../src/lib/SailorGirlContainer.js)に作成する。

SailorGirlContainer を用いることで CharacterMovement2.vue 側のセーラー少女に関する箇所は下記のコードのみとなり、コード行数としても 1/3 程度まで減らすことができる。

```vue:CharacterMovement2.vue
<script>
import SailorGirlContainer from "@/lib/SailorGirlContainer.js";

~~~~

      this.sailorGirl.x = this.app.view.width / 2;
      this.sailorGirl.y = this.app.view.height / 2;
      this.sailorGirl.scale.x = 2;
      this.sailorGirl.scale.y = 2;

      this.app.stage.addChild(this.sailorGirl);

~~~~
      // delta(前回実行時からの時間)と算出した速度をかけあわせて
      // this.sailorGirlを移動させる。
      this.sailorGirl.x += vx * delta;
      this.sailorGirl.y += vy * delta;

      // 方向を設定する。
      this.sailorGirl.setDirection(vx, vy);

~~~~

    this.sailorGirl = await new SailorGirlContainer();
    this.onSailorGirlLoaded();
  }
};
</script>
```

### 8.1. SailorGirlContainer のコンストラクタ

SailorGirlContainer のコンストラクタ部を説明する。

```javascript
  /**
   * @param {Function} onLoadedCallback
   * リソース読み込みが完了した後に呼ばれるコールバック関数
   */
  constructor(onLoadedCallback) {
    super();

    /**
     * @type {string} 8分割方向文字列
     */
    this._direction = "down";

    // pngファイルを読み込む
    return new Promise(resolve => {
      loader.add(GirlSpritesPng).load(() => {
        const baseTexture = PIXI.BaseTexture.from(GirlSpritesPng);

        const spritesheet = new PIXI.Spritesheet(baseTexture, GirlSpritesJson);
        spritesheet.parse( (textureHash) => {
          // 8方向セーラー少女を生成
          this._girls = this._createDirectionSprites(textureHash);
          for (let key of Object.keys(this._girls)) {
            this._girls[key].visible = false;
            this.addChild(this._girls[key]);
          }
          // 初期値としてdown方向を設定する
          this.direction = "down";

          resolve(this);
        });
      });
    })
  }
```

コンストラクタでは継承元の PIXI.Container のコンストラクタ呼び出しを行い、初期値設定、リソース読み込みまで実行している。

JavaScript には Private などのアクセス修飾子はないので、実際には外からでもアクセスできるが、伝統的に`this._direction`のようにアンダーバーから始まる変数や関数は private として扱ってねという暗黙知がある。

セーラー少女のリソース読み込み処理は、CharacterMovement.vue で

1. png ファイル読み込み
1. onAssetsLoaded
1. onSpritesheetLoaded

とコールバック関数チェーンとなっていたが、CharacterMovement2.vue ではすべて SailorGirlContainer コンストラクタ内にまとめて記載している。

また、onAssetsLoaded はアロー関数式`() => {}`の形で置き換えており、onSpritesheetLoaded はアロー関数式およびコンストラクタで渡した onLoadedCallback を実行するところまでと同等である。

動作の流れがコールバックチェーンであることに変わりはないので、new でコンストラクタが返った後にリソース読み込みが着々と実行されることには注意する。

### 8.2. SailorGirlContainer の getter/setter

JavaScript では getter/setter が簡単に定義できるので、メンバ変数 direction はこれを利用している。

```javascript
  get direction() {
    return this._direction;
  }

  set direction(direction) {
    if (!this._girls[direction]) {
      console.warn("Undefined Key in SpriteHash. key:" + direction);
      console.warn(this._girls);
      return;
    }

    // 現在の方向を非表示にする
    if (this.direction) {
      this._girls[this.direction].visible = false;
    }
    // 指定の方向だけ表示する
    this._girls[direction].visible = true;

    this._direction = direction;
  }
```

get では _direction を直接返しており、set では direction に関わる設定変更をまとめて実施するようにしている。

ただ、実際に direction の setter が呼ばれているのはコンストラクタと setDirectionFrom2D の中だけで、vue ファイルからは setDirectionFrom2D から間接的に direction を設定していることになる。

```javascript
 setDirectionFrom2D(x, y) {
    const direction = this.calculateDirectionFrom2D(x, y);
    if (!direction) {
      return;
    }
    this.direction = direction;
  }
```

このように`this.direction = direction;`が setter を通ることになる。

## 9. 移動速度と移動制限

斜め移動時に速度が上がってしまう問題と、画面外への移動制限をコーディングする。

CharacterMovement2.vue をコピーし CharacterMovement3.vue ファイルを作成し、4 つの関数を編集追加する。

gameloop は今後処理が増えるので、セーラー少女の移動を関数化する。

```javascript
    /** ゲームループ本体 */
    gameloop: function(delta) {
      this.moveSailorGirl(delta);
    },
```

斜め移動時処理は 2 次元ベクトルノルムを利用してベクトル正規化することで実装する。

まず、移動速度ベクトルを X 軸：vvx,Y 軸 vvy とし、そのノルムを計算した後、vvx,vvy をそれぞれをノルムで割ることで正規化している。

画面外移動制限は correctMoving で実装する。

```javascript
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
          this.sailorGirl.x+vx,
          this.sailorGirl.y+vy
        );

        // セーラー少女
        this.sailorGirl.x = newx;
        this.sailorGirl.y = newy;

        // 方向を設定する。
        this.sailorGirl.setDirectionFrom2D(vx, vy);
      }
    },
```

correctMoving 移動したい座標を受け取り、画面範囲に入る座標を作成して返す。

```javascript
    /** 障害物等を考慮し座標を補正をする */
    correctMoving: function(x, y) {
      // 画面外に出ないようにする
      const newx = this.fitInRange(x, 0+1, this.app.view.width-1);
      const newy = this.fitInRange(y, 0+1, this.app.view.height-1);

      return {newx, newy};
    },
```

fitInRange は correctMoving の補助関数として作成する。

```javascript
    /** 第1引数を第2引数と第3引数の範囲に収めた値を返す */
    fitInRange: function(num, minNum, maxNum) {
      return Math.max(minNum, Math.min(maxNum, num));
    }
```

## 10. Vue Router

## 11. 攻撃エフェクトアニメーション

### 11.1. 攻撃エフェクト素材準備

エフェクト素材は「ゲーム 素材 エフェクト」で検索して探せる。
今回はサンプルとして[ぴぽや倉庫 エフェクト 戦闘　基本セット](https://pipoya.net/sozai/assets/effects/effect-battle-basic-set/)を使わせていただく。

ダウンロードしたファイルを解凍して 320x240/pipo-btleffect006.png を src/assets/pipo-btleffect006.png にコピーする。

次に[Pixi.js のスプライト json ファイル生成ツール](http://www.tansio.net/mobile/twitter/00002/)をブラウザで表示して、下記の通り入力してから生成ボタンを押す。

```form
ファイル名：pipo-btleffect006.png
テクスチャ名：pipo-btleffect006_@@
取り出しＸサイズ：120
取り出しＹサイズ：120
取り出し総数：7
画像Ｘサイズ：840
画像Ｙサイズ：120
パディング：0
```

生成された json は src/assets/pipo-btleffect006.json に保存する。
