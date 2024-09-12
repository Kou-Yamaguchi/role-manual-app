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
          { role: 'system', 
           //   content: 'あなたは教師です。生徒のアドバイスを100点満点で採点し、講評、点数、模範解答を出してください。' 
           content: 'あなたは教師です。以下の生徒へのアドバイスを100点満点で採点し、簡潔な評価、点数（必ず「数字＋点」の形式で）、そして短く端的な模範解答を出してください。模範解答は、1-2文以内で、具体的で実行しやすいものにしてください。必ず「点数」を「数字＋点」の形式で返してください。例: 「90点」',
          },
          { role: 'user', content: message },
        ],
      });

      const reply = completion.choices[0]?.message?.content;

      // replyの出力確認
      console.log("ChatGPT reply:", reply);

      // 講評、点数、模範解答をパースして応答
      // const evaluation = reply.match(/講評[\s\S]*?:(.*)/)?.[1]?.trim();
      // const score = reply.match(/点数[\s\S]*?:\s*(\d+)\s*\/\s*100/)?.[1]?.trim();
      // const modelAnswer = reply.match(/模範解答[\s\S]*?:(.*)/)?.[1]?.trim();

      const evaluation = reply.match(/「(.*?)」/)?.[1]?.trim();
      const score = reply.match(/点数[\s\S]*?:\s*(\d+)\s*\/\s*100/)?.[1]?.trim();
      const modelAnswer = reply.match(/「(.*?)」(?!.*「.*」)/)?.[1]?.trim(); // 最後の「」内の内容を模範解答として抽出
      res.status(200).json({ reply, evaluation, score, modelAnswer });

      res.status(200).json({
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
