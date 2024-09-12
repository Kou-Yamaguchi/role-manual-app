import { Box, Text } from '@chakra-ui/react';

const Message = ({ text, role }) => {
  return (
    <Box
      alignSelf={role === 'student' ? 'flex-start' : 'flex-end'}
      bg={role === 'student' ? 'blue.100' : role === 'tutor' ? 'green.100' : 'gray.200'}
      p={3}
      borderRadius="md"
      maxWidth="70%"
    >
      <Text>{role === 'student' ? `生徒: ${text}` : role === 'tutor' ? `先生: ${text}` : `${text}`}</Text>
    </Box>
  );
};

export default Message;
