import { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

const ChatForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);  // onSubmitを呼び出す
      setMessage('');     // メッセージをクリア
    }
  };

  return (
    <div>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="アドバイスを入力してください"
      />
      <Button onClick={handleSubmit}>送信</Button>
    </div>
  );
};

export default ChatForm;

