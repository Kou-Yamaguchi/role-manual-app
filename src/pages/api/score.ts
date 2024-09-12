import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message, advice } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: '以下のアドバイスの適切さを100点満点で評価してください。' },
          { role: 'user', content: `質問: ${message}\nアドバイス: ${advice}` },
        ],
      });

      const score = completion.choices[0]?.message?.content;
      res.status(200).json({ score });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'Failed to score the advice' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
