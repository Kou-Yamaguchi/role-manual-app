import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // ChatGPTに講評、点数、模範解答を要求する
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'あなたは教師です。以下の生徒へのアドバイスを100点満点で採点し、簡潔な評価( 必ず「」で囲んで記述してください。)、点数（必ず「数字＋点」の形式で例: 「90点」）、そして短く端的な模範解答を出してください。模範解答は、1-2文以内で、具体的で実行しやすいものにして,必ず「」で囲んで模範解答を記述してください。',
          },
          { role: 'user', content: message },
        ],
      });

      const reply = completion.choices[0]?.message?.content;

      // replyの出力確認
      console.log("ChatGPT reply:", reply);

      // 全ての「」内の内容をリストとして抽出し、最後の要素を模範解答とする
      const allMatches = reply.match(/「(.*?)」/g);

      // allMatchesを出力して確認
      console.log("allMatches:", allMatches);

      // 配列から「」内の評価と模範解答を取得
      const evaluation = allMatches && allMatches.length > 0 ? allMatches[0].replace(/「|」/g, '').trim() : "講評が見つかりませんでした";
      const modelAnswer = allMatches && allMatches.length > 1 ? allMatches[allMatches.length - 1].replace(/「|」/g, '').trim() : "模範解答が見つかりませんでした";

      // 点数を抽出するための正規表現の修正（90点/100なども取得可能にする）
      const scoreMatch = reply.match(/(\d+)\s*点/);  // 90点や80点の形式を抽出
      const score = scoreMatch ? scoreMatch[1] : 'スコアが見つかりませんでした';

      res.status(200).json({
        reply,
        evaluation: evaluation || "講評が見つかりませんでした",
        score: score || "スコアが見つかりませんでした",
        modelAnswer: modelAnswer || "模範解答が見つかりませんでした",
      });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'ChatGPTとの通信に失敗しました' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
