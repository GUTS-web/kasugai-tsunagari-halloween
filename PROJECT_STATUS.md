# Project Status

最終更新: 2026-08-21

## 目的

同じ「春日井つながり祭り2026」について、対象とCTAが異なる2本のLPを同一リポジトリで管理する。

- 来場者向け: 小学生から中学生と保護者へ、イベントの楽しさ・日時・会場を伝える
- 出店者向け: 店舗・事業者・団体へ、募集ジャンル・料金・締切・申込方法を伝える

## ディレクトリ

```text
kasugai-tsunagari-halloween/
├── index.html                 # 来場者向けLP
├── styles.css
├── script.js
├── assets/images/            # 来場者向け画像
├── status/
│   └── festival-lp.md        # 来場者向けの引継ぎ状況
├── exhibitor/
│   ├── index.html            # 出店者向けLP
│   ├── styles.css
│   ├── script.js
│   ├── assets/images/
│   ├── brief.md
│   ├── copy.md
│   ├── research.md
│   ├── build-log.md
│   └── STATUS.md             # 出店者向けの引継ぎ状況
├── brief.md                  # 来場者向け
├── copy.md
├── research.md
├── build-log.md
└── screenshots/
```

## 共通の変更不可条件

- イベント名: 春日井つながり祭り
- 会場: 泰岳寺
- 会場住所: 愛知県春日井市上条町10丁目198
- コンセプト: 楽しく、おいしく、学べるハロウィーン / 未来へつむぐ 食とまち
- 開催日: 2026年10月31日（土）10:00-15:00（予定）
- 来場者向けの中心ターゲット: 小学生から中学生
- 怖いホラー表現を避け、明るい昼間のハロウィーンとする
- 募集ページの正式表記は「出店」「出店者募集」「出店料」とする

## 現在地

- 来場者向けLP: 実装・画像生成・主要QA完了。詳細は `status/festival-lp.md`
- 出店者向けLP: 実装・画像生成・主要QA完了。詳細は `exhibitor/STATUS.md`
- GitHub: `GUTS-web/kasugai-tsunagari-halloween`（Public）の `main` へ保存済み
  - GitHub Pages を有効化して公開（Settings > Pages / source: `main` ブランチのルート）
- 公開サイト: GitHub Pages で一般公開済み（URL・QRコードでのみ到達、検索は `noindex` + `robots.txt` で回避）
  - 来場者向け: https://guts-web.github.io/kasugai-tsunagari-halloween/
  - 出店者向け: https://guts-web.github.io/kasugai-tsunagari-halloween/exhibitor/
  - QRコード: `assets/qr/kasugai-tsunagari-2026-visitor.(png|svg)` / `assets/qr/kasugai-tsunagari-2026-exhibitor.(png|svg)`
  - 旧 `*.chatgpt.site` の URL はプレビュー用で恒久性がないため使用しない
- 公開サイトは1サイト内の2パスとして運用し、ソースは各ディレクトリで分離している
- スマホ390pxで両ページの横はみ出しなし、主要画像読込、来場者向け画像領域の空白再発なしを確認
- 来場者向け問い合わせ・SNS導線は未接続、出店者向けのみ申込・問い合わせ導線を掲載
- 来場者向けスマホオープニングを短時間表示へ戻し、出店者向けInstagram QRを提供画像へ差し替え

## 情報源

- 来場者向け告知: `D:\一時ダウンロード\つながり祭り.pdf`
- 出店者向け告知: `D:\一時ダウンロード\出店募集REV1.png`
- 泰岳寺公式アクセス: https://www.taigakuji.net/access.html
- 愛知県宗教法人名簿: https://www.pref.aichi.jp/uploaded/attachment/607301.pdf
