# Kasugai Tsunagari Halloween

「春日井つながり祭り2026」の来場者向けLPと出展者募集LPです。

## 公開URL

- 来場者向け: https://kasugai-tsunagari-halloween.guts-2025-job.chatgpt.site/
- 出展者向け: https://kasugai-tsunagari-halloween.guts-2025-job.chatgpt.site/exhibitor/

GitHubリポジトリはPrivateのまま、上記の公開サイトだけを一般閲覧可能にしています。

## ローカル確認

静的ファイルだけで動作します。`index.html`を開くか、任意の静的サーバーで配信してください。

```powershell
python -m http.server 4173
```

その後、次のURLを開きます。

- 来場者向け: `http://127.0.0.1:4173/`
- 出展者向け: `http://127.0.0.1:4173/exhibitor/`

## 構成

- `index.html` - ページ本文
- `styles.css` - レスポンシブデザインとアニメーション
- `script.js` - カウントダウン、スクロール演出、モーダル、紙吹雪
- `assets/images/` - LP用の生成実写素材
- `brief.md` / `copy.md` / `research.md` - 制作根拠
- `build-log.md` - 検証記録
- `exhibitor/` - 出展者募集LP一式と独立した引継ぎ文書
- `PROJECT_STATUS.md` - 2本のLPの共通条件と進捗

## 注意

掲載写真はイメージです。プログラム内容、予約要否、雨天時運用は本公開内容の確定時に最終確認してください。
