import { useState } from 'react';
import { VStack, Button, Input } from '@chakra-ui/react';

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      onUpload(); // 台本アップロード後にコールバックを呼び出す
    }
  };

  return (
    <VStack spacing={4}>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>アップロード</Button>
    </VStack>
  );
};


export default UploadForm;
