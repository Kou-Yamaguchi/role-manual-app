//  const script = [
//     'こんにちは、先生！今日は何を勉強すればいいですか？',
//     '先週、数学のテストで50点しか取れなかったんです。',
//     'どうしたらもっと点数が上がりますか？',
//     'あと、英語の宿題も難しいです。文法がよくわかりません。',
//     '明日、友達と遊ぶ約束があるんですが、勉強もしたほうがいいですよね？',
//     '数学の宿題は解けるんですが、時間がかかってしまいます。どうすれば早く解けるようになりますか？',
//     '理科の実験レポートもあるんですけど、どう書けばいいかわかりません。',
//     '今週の勉強のスケジュールはどのように組めばいいですか？',
//   ];
import { useState } from 'react';
import { VStack, HStack, Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import ChatForm from './ChatForm';
import Message from './Message';

const ChatApp = () => {
  const script = [
    'こんにちは、先生！今日は何を勉強すればいいですか？',
    '先週、数学のテストで50点しか取れなかったんです。',
    'どうしたらもっと点数が上がりますか？',
    // その他の台本
  ];

  const [messages, setMessages] = useState([{ role: 'student', text: script[0] }]);
  const [currentScriptIndex, setCurrentScriptIndex] = useState(1);
  const [input, setInput] = useState('');

  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [...prevMessages, { role: 'tutor', text: message }]);
  
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  
    const data = await res.json();
    const reply = data.reply;
  
    // 点数を抽出するための正規表現（二桁の数字＋"点"を検索）
    const scoreMatch = reply.match(/(\d{2})点/);
    const score = scoreMatch ? scoreMatch[1] : 'スコアが見つかりませんでした';
  
    // "模範解答"に関連する部分を抽出（模範解答というキーワード以降のテキストを抽出）
    const modelAnswerMatch = reply.match(/模範解答:\s*([\s\S]*)/);
    const modelAnswer = modelAnswerMatch ? modelAnswerMatch[1].trim() : '模範解答が見つかりませんでした';
  
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'system', text: `点数: ${score} / 100` },
      { role: 'system', text: `模範解答: ${modelAnswer}` }
    ]);
  
    if (currentScriptIndex < script.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'student', text: script[currentScriptIndex] }
      ]);
      setCurrentScriptIndex(currentScriptIndex + 1);
    }
  };
  
  

  
  // const handleSendMessage = async (message) => {
  //   setMessages((prevMessages) => [...prevMessages, { role: 'tutor', text: message }]);

  //   const res = await fetch('/api/chat', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ message }),
  //   });

  //   const data = await res.json();

  //   // データを確認してundefinedが表示されないようにする
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { role: 'system', text: `講評: ${data.evaluation}` },
  //     { role: 'system', text: `点数: ${data.score} / 100` },  // / 100をここでは削除
  //     { role: 'system', text: `模範解答: ${data.modelAnswer}` }
  //   ]);

  //   if (currentScriptIndex < script.length) {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { role: 'student', text: script[currentScriptIndex] }
  //     ]);
  //     setCurrentScriptIndex(currentScriptIndex + 1);
  //   }
  // };

  return (
    <HStack align="start" p={4}>
      <Sidebar />
      <Box flex="1" p={4}>
        <VStack spacing={4}>
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} role={msg.role} />
          ))}
          <ChatForm onSubmit={handleSendMessage} /> {/* onSubmitを渡す */}
        </VStack>
      </Box>
    </HStack>
  );
};

export default ChatApp;
