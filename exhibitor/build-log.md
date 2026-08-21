# 出展者募集LP Build Log

最終更新: 2026-08-21

## 生成・再利用画像

生成モード: Built-in ImageGen / 実写調 / 架空の人物・イベントイメージ

| 保存先 | 種別 | プロンプト要旨 |
| --- | --- | --- |
| `assets/images/exhibitor-hero.webp` | 新規生成 | 晴れた秋の朝、寺院境内で地元事業者がキッチンカー・ハンドメイド・地域ブースを準備。大人中心、自然な共同作業、プロフェッショナルで親しみやすい実写。左側にコピー余白。ホラー、文字、ロゴ、透かしなし。 |
| `assets/images/vendor-collaboration.webp` | 新規生成 | キッチンカー店主、クラフト作家、福祉スタッフが寺院境内で出展計画を確認する様子。明るい自然光、信頼感、地域連携。怖い装飾、文字、ロゴなし。 |
| `assets/images/event-market.webp` | 来場者LPから再利用 | 秋晴れの寺院境内で開かれる家族向け地域マルシェ。 |
| `assets/images/application-qr.png` | 提供チラシから切出し | 物販・福祉関係事業所向けの申込フォームQR。直接URLは推測せずQRのみを掲載。 |
| `assets/images/instagram-qr.png` | ユーザー提供画像 | 出展者連絡用Instagram QR。216×216pxの正方形原寸を使用。 |

## 実装

- `exhibitor/` 内でHTML / CSS / JavaScript / 画像 / 文書を独立管理
- 募集ジャンル3種、料金、締切、応募資格、開催概要、注意事項、FAQをHTMLテキストで実装
- 飲食は `@kasugai.fes`、物販・福祉はQRへ導線を分岐
- オープニング、斜め写真、マルキー、スクロール出現、カード傾き、締切カウント、モーダル、紙吹雪を実装
- `prefers-reduced-motion` に対応

## QA

- 390px: `innerWidth 390 / scrollWidth 375`、横スクロールなし
- 公開URLの390px表示でヒーロー画像読込・横はみ出しなしを再確認
- Instagram QRは自然サイズ216×216px、表示サイズ216×216px、縦横比1:1、`object-fit: contain`を確認
- 390px / 430pxでInstagram QRカードの横はみ出しなしを確認
- 430px: `innerWidth 430 / scrollWidth 415`、横スクロールなし
- 1280px: `innerWidth 1280 / scrollWidth 1265`、3列カード表示
- WebP 3点と申込QR: 読込成功
- モーダル: 上部の閉じるボタンと確認ボタンで開閉成功
- FAQ: 開く / 閉じるを確認
- 内部アンカー: `#categories` へ正しく移動
- 外部リンク: Instagram / Google Maps とも `target="_blank"`・`rel="noopener noreferrer"`
- ブラウザコンソール: warning / error なし
- `node --check exhibitor/script.js`: 成功

## 未確定・本公開内容の確定時に確認

- 物販・福祉用フォームの直接URL
- キッチンカー枠の不明瞭な注記
- 区画寸法、設備、電源・給排水、搬入出、キャンセル条件
- 雨天時の判断・連絡方法
- 共催表記の最終確定
