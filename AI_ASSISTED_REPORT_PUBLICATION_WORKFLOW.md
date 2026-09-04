# AI支援研究レポートの公開ワークフロー

この文書は、AIを利用して作成した研究レポートを、個人ホームページ、GitHub、Wayback Machine、Zenodoで公開し、公開日時とファイルの同一性を第三者が確認できる形で記録するための手順書です。

単にホームページへPDFを置くだけでなく、版番号、ハッシュ値、Git履歴、外部アーカイブ、DOIを組み合わせます。AIは著者にせず、利用範囲を明示し、内容への責任は人間の著者が負います。

## 全体像

推奨する順序は次のとおりです。

1. レポートの内容とAI利用記録を確定する
2. PDFと配布用ソースZIPを作る
3. ファイル名、版番号、日付、SHA-256を固定する
4. 個人ホームページへ掲載する
5. Gitコミット、タグ、GitHub Releaseを作る
6. 公開ページとPDFをWayback Machineへ保存する
7. Zenodoへ同じPDFとZIPを登録し、DOIを取得する
8. DOIや各種記録をホームページと引用情報へ追記する
9. 公開ページとダウンロードファイルを最終確認する

## 1. レポートを確定する

表紙または冒頭に、少なくとも次を記載します。

- レポートの完全なタイトル
- 著者名
- 版番号（例：Version 1.0）
- 最初の公開日
- レポートであることが分かる表示

タイトルの例：

> AI-Assisted Research Report: Report Title

正式な論文を後にarXiv等へ投稿する場合、ホームページ版は研究過程や広い結果を記録した独立の先行レポートとして固定できます。正式論文では内容を取捨選択し、通常の論文タイトルを付け、先行レポートを参考文献で引用します。

### Use of AI

レポートには `Use of AI` の節を設け、次を区別して記載します。

- 使用したAIサービスや製品名
- AIを使った作業の範囲
- 著者自身が行った確認と選択
- 内容に対する最終責任の所在

記載例：

> OpenAI Codex was used for mathematical exploration, proof auditing, finite computation, organization of the research record, and assistance with drafting and preparing the LaTeX manuscript. The author selected the included material and assumes sole responsibility for the contents, including the correctness of its statements, proofs, computations, references, and exposition.

実際に行っていない検証を `verified` や `certified` と表現してはいけません。AI利用の透明性と、数学的主張が確立済みかどうかは別々に扱います。

## 2. 配布ファイルを作る

公開する基本ファイルは次の2つです。

- 完成したPDF
- PDFを再生成するためのTeXソース一式を収めたZIP

ZIPには、コンパイルに必要なTeX、参考文献、図、スタイルファイル等を入れます。一方、次のものは通常含めません。

- Git履歴や `.git` フォルダ
- ビルド途中の一時ファイル
- 個人的な研究メモ
- 非公開資料
- APIキー、認証情報、個人情報
- 配布権限のない第三者資料

アーカイブを作った後は、別の一時フォルダへ展開し、必要なファイルが揃っていることを確認します。可能なら、その展開物からPDFを再ビルドします。

## 3. 版とファイルを固定する

後から内容を区別できるよう、説明的な固定ファイル名を使います。

```text
author-short-title-v1.0.pdf
author-short-title-v1.0-source.zip
```

PDFとZIPについてSHA-256を計算します。

```bash
shasum -a 256 author-short-title-v1.0.pdf
shasum -a 256 author-short-title-v1.0-source.zip
```

この値は、公開後のファイルが当初のファイルと同一かを確認するためにホームページへ掲載します。ファイルを少しでも変更するとハッシュ値も変わるため、変更版は新しい版番号にします。

## 4. ホームページへ掲載する

レポートごとに、次の情報を掲載します。

- 完全なタイトル
- 著者名とORCID
- 版番号と公開日
- 公開状態
- ライセンス
- PDFとソースZIPへのリンク
- PDFとZIPのSHA-256
- コピー可能なBibTeXと通常形式の引用
- GitHub、Wayback Machine、Zenodoの公開記録

複数のレポートを追加する場合は、最初はタイトルだけを表示し、`details` と `summary` を使って詳細を展開できる形にすると一覧性を保てます。

初回掲載時には、まだ存在しないDOIや外部記録を予告値として書かず、後の手順で取得した正確な情報を追記します。

## 5. GitHubで公開記録を作る

### コミットとpush

公開対象だけが変更されていることを確認し、コミットして公開ブランチへpushします。

```bash
git status
git add 対象ファイル
git commit -m "Publish AI-assisted research report"
git push origin main
```

コミットIDは公開内容を指し示す記録になるため、ホームページの公開記録欄からコミットページへリンクします。

### 注釈付きタグ

版を表す注釈付きタグを、公開コミットへ付けます。

```bash
git tag -a ai-report-short-title-v1.0 -m "AI-assisted research report version 1.0"
git push origin ai-report-short-title-v1.0
```

タグを付ける前に、そのタグが意図したコミットを指すことを確認します。公開済みタグを別のコミットへ付け替える運用は避けます。

### GitHub Release

タグからGitHub Releaseを作り、PDFとソースZIPを添付します。Release本文には次を記載します。

- 完全なタイトル
- 著者
- Version 1.0
- 公開日
- ライセンス
- PDFとZIPのSHA-256
- ホームページへのリンク

アップロード後、Releaseの添付ファイルがダウンロードでき、元ファイルとハッシュ値が一致することを確認します。

## 6. Wayback Machineへ保存する

少なくとも次の2つを個別に保存します。

1. レポート情報を掲載したHTMLページ
2. PDFの直接URL

保存後はスナップショットのURLを控え、実際に開けることを確認します。Wayback Machineは外部から確認できる補助的な公開記録ですが、ファイルの永続保存やDOIの代わりではありません。

## 7. ZenodoでDOIを取得する

GitHub連携によるソフトウェアリリースではなく、研究レポートとして手動登録すると書誌情報を適切に設定できます。

推奨項目：

- Resource type: `Publication / Report`
- Title: レポートの完全なタイトル
- Publication date: 最初に公開した日
- Authors/Creators: 著者名とORCID
- Description: 内容の概要、AI利用範囲、責任の所在
- Version: `1.0`
- Language: `English` など本文の言語
- License: 著者が選択したライセンス（例：CC BY 4.0）
- Copyright: 例 `© 2026 Author Name`
- Visibility: `Public`
- Files: ホームページやGitHub Releaseと同一のPDFとZIP

キーワードには、レポートの主要対象、距離・構造、主要な数学的性質などを登録します。

### 公開前の注意

Zenodoでは公開後に添付ファイルを差し替えられません。公開ボタンを押す前に、次をプレビューで照合します。

- タイトルの綴りと記号
- 著者名とORCID
- 日付と版番号
- Resource type
- ライセンス
- 説明文
- 添付ファイル名、サイズ、チェックサム
- PDFが既定のプレビューになっていること

公開後には通常、次の2種類のDOIが表示されます。

- Version DOI: その版だけを特定するDOI
- Concept DOI: 全バージョンをまとめ、最新版へ案内するDOI

特定のVersion 1.0を参考文献で引用する場合は、Version DOIを使用します。

## 8. ホームページと引用情報を更新する

外部記録が揃ったら、ホームページへ次を追記します。

- `Status: Publicly posted`
- Version DOI
- Concept DOI
- ライセンス
- Gitコミット
- GitタグとGitHub Release
- Wayback MachineのHTMLとPDFのスナップショット

BibTeXの例：

```bibtex
@report{AuthorYearAIReport,
  author      = {Family, Given},
  title       = {AI-Assisted Research Report: Report Title},
  institution = {Zenodo},
  type        = {AI-Assisted Research Report},
  version     = {1.0},
  date        = {2026-08-13},
  doi         = {10.5281/zenodo.xxxxxxxx},
  url         = {https://doi.org/10.5281/zenodo.xxxxxxxx},
  urldate     = {2026-08-13}
}
```

Zenodoへ登録した後の標準的な引用では、ホームページのPDF直リンクよりVersion DOIを優先します。ホームページには、引用情報をボタンでコピーできる形と、人間が読める通常形式の両方を用意すると便利です。

## 9. 最終確認

次をすべて確認して公開完了とします。

- [ ] ホームページからPDFとZIPをダウンロードできる
- [ ] PDFの表紙にタイトル、著者、版、日付がある
- [ ] Use of AIと著者責任が明記されている
- [ ] 公開されたPDFとZIPのSHA-256が掲載値と一致する
- [ ] Gitコミット、タグ、Releaseが同じ版を指している
- [ ] GitHub Releaseの添付ファイルが正しい
- [ ] Wayback MachineのHTMLとPDFを開ける
- [ ] ZenodoのResource type、著者、ORCID、版、日付が正しい
- [ ] ZenodoがPublicかつ正しいライセンスになっている
- [ ] Version DOIが解決し、PDFとZIPを取得できる
- [ ] BibTeXと通常引用にVersion DOIが入っている
- [ ] デスクトップとモバイル幅でページを確認した
- [ ] コピー用ボタンが動作する
- [ ] 公開ブランチとリモートが同期している

## 実例：Version 1.0

このワークフローで公開した実例です。

- Report: *AI-Assisted Research Report: Finite Hausdorff Hyperspaces and Gromov–Hausdorff Geometry*
- [ホームページ](https://yoshito-ishiki-math.github.io/ai-research-reports.html)
- [Zenodo Version DOI](https://doi.org/10.5281/zenodo.21913552)
- [Zenodo Concept DOI](https://doi.org/10.5281/zenodo.21913551)
- [GitHub Release](https://github.com/yoshito-ishiki-math/yoshito-ishiki-math.github.io/releases/tag/ai-report-finite-hyperspaces-v1.0)
- [Gitコミット](https://github.com/yoshito-ishiki-math/yoshito-ishiki-math.github.io/commit/e2d7fe539d30f5950e393eabcd260b2ab5d27a78)
- [Wayback Machineのページ記録](https://web.archive.org/web/20260813061750/https://yoshito-ishiki-math.github.io/ai-research-reports.html)
- [Wayback MachineのPDF記録](https://web.archive.org/web/20260813061823/https://yoshito-ishiki-math.github.io/AIResearchReports/finite-hausdorff-hyperspaces-gromov-hausdorff-geometry-v1.0.pdf)

## 運用上の原則

- 公開日は実際の初回公開日を記載し、後から遡及的に作らない
- 公開済みファイルを上書きせず、修正時は新しい版を作る
- 証明済み、計算的証拠、予想、未検証事項を区別する
- AI利用の開示を、内容の正しさの保証として扱わない
- 第三者資料、個人情報、秘密情報をソースZIPへ混入させない
- DOI、Git、Wayback、SHA-256は役割が異なるため、相互補完的に使う

