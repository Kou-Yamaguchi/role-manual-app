This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
### .envにAPIキーをペーストすると動きます
OPENAI_API_KEY=API_KEY

環境変数でOPENAIAPIを取得しています　各自設定すればいいける？
export OPENAI_API_KEY=API_KEY
echo $OPENAI_API_KEY で確認する感じで。。。

## Getting Started

First, run the development server:
### スコア推移計算のロジック

1. **初期スコア**  
   - 初期スコアは **50点** でスタート。

2. **得点に基づく加減点のロジック**  
   - 回答の点数に応じて、次のようにポイントが増減します。
   
   | 条件                   | 加減点  |
   | ---------------------- | ------- |
   | 点数が **90点以上**     | +10点   |
   | 点数が **75点以上**     | +5点    |
   | 点数が **30点未満**     | -5点    |
   | 点数が **10点未満**     | -10点   |
   | その他の点数           | ±0点    |

3. **累積スコアの計算式**
   - 各回答後の累積スコアは、前回の累積スコアに加減点を反映して更新します。

   **累積スコア** = **前回の累積スコア** + **加減点**

   例えば:
   - 初期スコアが50点で、最初の回答が **85点** だった場合、加減点は **±0点**。
   - 次の回答が **95点** なら加減点は **+10点**。
   - 累積スコアの推移は以下のようになります。

   ```text
   初期スコア: 50点
   1回目の回答 (85点): 累積スコア = 50 + 0 = 50点
   2回目の回答 (95点): 累積スコア = 50 + 10 = 60点
   ```

4. **顔の変化**
   - スコアに応じて、生徒の顔が変わります。
     - **90点以上**: やる気のある顔
     - **75点以上**: ニコニコ顔
     - **30点未満**: 悲しい顔
     - その他: 真顔
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


