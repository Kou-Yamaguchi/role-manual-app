import { useState } from 'react';
import { VStack, HStack, Box, Image, Text } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import ChatForm from './ChatForm';
import Message from './Message';

// 顔の画像パス
const sadFace = '/images/sadFace.png';
const smileFace = '/images/smileFace.png';
const motivatedFace = '/images/motivatedFace.png';
const neutralFace = '/images/neutralFace.png';

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
  const [score, setScore] = useState(50);  // 初期スコアを50に設定
  const [totalScore, setTotalScore] = useState(50); // 初期累積スコアを50に設定

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

    // 点数を抽出するための正規表現（1桁以上の数字＋"点"を検索）
    const scoreMatch = reply.match(/(\d+)\s*点/);  // "1桁以上の数字"を抽出するように修正
    const extractedScore = scoreMatch ? parseInt(scoreMatch[1]) : null;

    // スコアが見つからなかった場合のデフォルト処理
    if (extractedScore !== null) {
      let newPoints = 0;
      if (extractedScore >= 90) {
        newPoints = 10; // 90点以上で+10点
      } else if (extractedScore >= 75) {
        newPoints = 5; // 75点以上で+5点
      } else if (extractedScore < 10) {
        newPoints = -10; // 10点未満で-10点
      } else if (extractedScore < 30) {
        newPoints = -5; // 30点未満で-5点
      }

      setScore((prevScore) => prevScore + newPoints); // スコアを更新
      setTotalScore((prevTotal) => prevTotal + newPoints); // 累積スコアを更新
    }

    // "模範解答"に関連する部分を抽出（模範解答というキーワード以降のテキストを抽出）
    // const modelAnswerMatch = reply.match(/模範解答:\s*([\s\S]*)/);
    // const modelAnswer = modelAnswerMatch ? modelAnswerMatch[1].trim() : '模範解答が見つかりませんでした';


    const allMatches = reply.match(/「(.*?)」/g);

    // allMatchesを出力して確認
    console.log("allMatches:", allMatches);

    // 配列から「」内の評価と模範解答を取得
    const evaluation = allMatches && allMatches.length > 0 ? allMatches[0].replace(/「|」/g, '').trim() : "講評が見つかりませんでした";
    const modelAnswer = allMatches && allMatches.length > 1 ? allMatches[allMatches.length - 1].replace(/「|」/g, '').trim() : "模範解答が見つかりませんでした";



    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'system', text: `点数: ${extractedScore !== null ? extractedScore : 'スコアが見つかりませんでした'} / 100` },
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

  // 現在のスコアに応じて顔の画像を変更
  const getFaceImage = () => {
    if (score < 30) return sadFace;          // 30点以下は悲しい顔
    if (score >= 90) return motivatedFace;   // 90点以上はやる気のある顔
    if (score >= 75) return smileFace;       // 75点以上はニコニコ顔
    return neutralFace;                      // それ以外は真顔
  };

  return (
    <HStack align="start" p={4}>
      <Sidebar />
      <Box flex="1" p={4}>
        <VStack spacing={4}>
          {/* 生徒の顔を表示 */}
          <Image src={getFaceImage()} alt="生徒の顔" boxSize="100px" />

          {/* 累積スコアを表示 */}
          <Text fontSize="lg" fontWeight="bold">累積スコア: {totalScore}</Text>

          {/* メッセージの表示 */}
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
