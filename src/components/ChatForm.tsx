import { useState } from 'react';
import { VStack, Button, Input } from '@chakra-ui/react';

const ChatForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSubmit(message);
    setMessage('');
  };

  return (
    <VStack spacing={4}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="アドバイスを入力してください"
      />
      <Button onClick={handleSubmit} colorScheme="teal">
        送信
      </Button>
    </VStack>
  );
};

export default ChatForm;
