# README

## 環境構築

```bash
yarn install
```

## 開発環境起動

```bash
yarn dev
```

## デバッグ方法

1. 開発環境起動後、Chromeで `chrome://inspect` にアクセス
2. Remote Target `inspect` をクリック
3. 表示された[DevTools]の画面下部[Start]ボタンをクリック
4. VSCode[実行とデバッグ] の `full stack debug` を選択し実行
5. Chromeが起動し、 `http://localhost:3000/` にアクセスされる
6. .tsx上にブレークポイントを置くとその行でストップする
