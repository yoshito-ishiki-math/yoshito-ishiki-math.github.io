# yoshito-ishiki-math.github.io

Yoshito Ishikiの個人ホームページです。外部ライブラリやビルド処理を使わない、軽量な静的HTMLサイトです。

## ローカルで表示する

リポジトリのフォルダで次を実行します。

```bash
python3 -m http.server 8000
```

ブラウザで <http://127.0.0.1:8000/index.html> を開きます。終了するときは、ターミナルで `Ctrl+C` を押します。

## 主なファイル

- `index.html`: ホーム、近況、略歴
- `papers.html`: 論文一覧
- `papersindetails.html`: 論文の詳細説明
- `talks.html`: 講演一覧
- `notes.html`: 数学メモ・ノート
- `lecturenotes.html`: 講義ノート
- `yoshitostyle.css`: 全ページ共通の見た目
- `yoshito.js`: 日本語・英語の表示切替

`materials.html` は未完成なので、現在はホームページからリンクしていません。

## 業績を追加する

論文や講演の一覧には、次のような日本語のHTMLコメントがあります。

```html
<!--
  【査読付き論文を追加する場所】
  直前の <li> から </li> までをコピーします。
-->
```

コメントはWebページには表示されません。指定された `<li>` から `</li>` までをコピーし、題名、日付、掲載情報、リンクなどを書き換えてください。

新しい論文を掲載するときは、必要に応じて次の3か所を更新します。

1. `index.html` の「最近の論文」
2. `papers.html` の論文一覧
3. `papersindetails.html` の詳細説明

講演は `talks.html` の「国際講演」または「国内講演」に追加します。

## 画像を追加・交換する

トップページ用の画像は `imagesfolder` に置きます。大きなJPEGは、掲載前に最大辺1200px、品質80%程度に圧縮します。

```bash
sips -Z 1200 -s format jpeg -s formatOptions 80 input.jpg --out output.jpg
```

HTMLの画像には、通信量を抑えるため次の属性を付けます。

```html
loading="lazy" decoding="async"
```

## Gitで保存する

作業前に新しいブランチを作り、表示確認後にコミットします。

```bash
git switch -c codex/変更内容を表す名前
git status
git add 変更したファイル
git commit -m "変更内容の説明"
git push -u origin ブランチ名
```

`main` にマージしてGitHubへpushすると、GitHub Pagesへ反映されます。
