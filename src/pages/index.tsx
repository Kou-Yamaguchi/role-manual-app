import { useState } from 'react';
import { HStack, Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import ChatApp from '../components/ChatApp';
import UploadForm from '../components/UploadForm';

const IndexPage = () => {
  const [scriptUploaded, setScriptUploaded] = useState(false);

  return (
    <HStack align="start" p={4}>
      <Sidebar />
      <Box flex="1" p={4}>
        {!scriptUploaded ? (
          <UploadForm onUpload={() => setScriptUploaded(true)} />
        ) : (
          <ChatApp />
        )}
      </Box>
    </HStack>
  );
};

export default IndexPage;
