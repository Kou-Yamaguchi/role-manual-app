import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // ChatGPTに採点を依頼する
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'あなたは教師です。以下の生徒へのアドバイスを採点してください。' },
          { role: 'user', content: message },
        ],
      });

      const reply = completion.choices[0]?.message?.content;
      res.status(200).json({ reply });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'ChatGPTとの通信に失敗しました' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
