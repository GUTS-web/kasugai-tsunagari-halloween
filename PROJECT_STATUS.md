# Project Status

最終更新: 2026-08-21

## 目的

同じ「春日井つながり祭り2026」について、対象とCTAが異なる2本のLPを同一リポジトリで管理する。

- 来場者向け: 小学生から中学生と保護者へ、イベントの楽しさ・日時・会場を伝える
- 出展者向け: 店舗・事業者・団体へ、募集ジャンル・料金・締切・申込方法を伝える

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
│   ├── index.html            # 出展者向けLP
│   ├── styles.css
│   ├── script.js
│   ├── assets/images/
│   ├── brief.md
│   ├── copy.md
│   ├── research.md
│   ├── build-log.md
│   └── STATUS.md             # 出展者向けの引継ぎ状況
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

## 現在地

- 来場者向けLP: 実装・画像生成・主要QA完了。詳細は `status/festival-lp.md`
- 出展者向けLP: 実装・画像生成・主要QA完了。詳細は `exhibitor/STATUS.md`
- GitHub: privateリポジトリ作成前

## 情報源

- 来場者向け告知: `D:\一時ダウンロード\つながり祭り.pdf`
- 出展者向け告知: `D:\一時ダウンロード\出店募集REV1.png`
- 泰岳寺公式アクセス: https://www.taigakuji.net/access.html
- 愛知県宗教法人名簿: https://www.pref.aichi.jp/uploaded/attachment/607301.pdf
