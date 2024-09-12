// services/openai.ts
import OpenAI from 'openai'; // 最新のモジュールインポート形式

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 環境変数からAPIキーを取得
});

export async function getChatGPTResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // モデルを指定
      messages: [
        { role: 'user', content: prompt }, // ユーザーのプロンプトを渡す
      ],
    });

    return completion.choices[0]?.message?.content || 'No response from the AI';
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return 'Error occurred while communicating with the AI';
  }
}
