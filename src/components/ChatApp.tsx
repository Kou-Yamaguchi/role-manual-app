import { useState } from 'react';
import { VStack, HStack, Box, Text, Input, Button } from '@chakra-ui/react';

const ChatApp = () => {
  // 台本の配列
  const script = [
    'こんにちは、先生！今日は何を勉強すればいいですか？',
    '先週、数学のテストで50点しか取れなかったんです。',
    'どうしたらもっと点数が上がりますか？',
    'あと、英語の宿題も難しいです。文法がよくわかりません。',
    '明日、友達と遊ぶ約束があるんですが、勉強もしたほうがいいですよね？',
    '数学の宿題は解けるんですが、時間がかかってしまいます。どうすれば早く解けるようになりますか？',
    '理科の実験レポートもあるんですけど、どう書けばいいかわかりません。',
    '今週の勉強のスケジュールはどのように組めばいいですか？',
  ];

  const [messages, setMessages] = useState([{ role: 'student', text: script[0] }]); // 台本の最初のセリフからスタート
  const [currentScriptIndex, setCurrentScriptIndex] = useState(1); // 次のセリフのインデックス
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input) return;

    // 講師（tutor）のメッセージを追加
    setMessages((prevMessages) => [...prevMessages, { role: 'tutor', text: input }]);

    // ChatGPT API にメッセージを送信してアドバイスの評価を受ける
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // 採点結果のメッセージを表示
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'system', text: `ChatGPTの評価: ${data.reply}` }
    ]);

    // 次の台本のセリフがあれば表示
    if (currentScriptIndex < script.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'student', text: script[currentScriptIndex] }
      ]);
      setCurrentScriptIndex(currentScriptIndex + 1); // 次のセリフに進む
    }

    setInput(''); // 入力フィールドをリセット
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          alignSelf={msg.role === 'student' ? 'flex-start' : 'flex-end'}
          bg={msg.role === 'student' ? 'blue.100' : msg.role === 'tutor' ? 'green.100' : 'gray.200'}
          p={3}
          borderRadius="md"
          maxWidth="70%"
        >
          <Text>{msg.role === 'student' ? `生徒: ${msg.text}` : msg.role === 'tutor' ? `先生: ${msg.text}` : `${msg.text}`}</Text>
        </Box>
      ))}

      <HStack>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="アドバイスを入力してください"
        />
        <Button onClick={handleSendMessage}>送信</Button>
      </HStack>
    </VStack>
  );
};

export default ChatApp;
