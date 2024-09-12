import { Box, Text } from '@chakra-ui/react';

const Message = ({ text, role }) => {
  return (
    <Box
      bg={role === 'student' ? 'blue.100' : 'green.100'}
      borderRadius="md"
      p={3}
      alignSelf={role === 'student' ? 'flex-start' : 'flex-end'}
      maxWidth="70%"
    >
      <Text>{role === 'student' ? `生徒: ${text}` : `先生: ${text}`}</Text>
    </Box>
  );
};

export default Message;
