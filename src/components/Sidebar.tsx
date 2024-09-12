import { VStack, Link } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <VStack align="start" p={4} spacing={4} bg="gray.100" h="100vh">
      <Link href="/">トップ</Link>
      <Link href="/chat">チャット</Link>
      <Link href="/upload">台本アップロード</Link>
    </VStack>
  );
};

export default Sidebar;
