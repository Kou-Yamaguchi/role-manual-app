// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  // アップロードディレクトリが存在しない場合、作成する
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true, // ファイルの拡張子を維持
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ error: 'File upload error', details: err.message });
      }

      console.log('Uploaded files:', files); // アップロードされたファイルをコンソールで確認

      res.status(200).json({ message: 'File uploaded successfully', files });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
