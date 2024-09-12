import Sidebar from '../../components/Sidebar';
import { Heading, Card, CardHeader, CardBody, Stack, Text, Button, Select, chakra } from '@chakra-ui/react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Chapters = () => {
  // const navigate = useNavigate();
  
  // const [chapters, setChapters] = useState(false);
  // interface ChapterProps {
  //   title: string;
  //   outline: string;
  //   roles: string[];
  //   scenario: string;
  // }

  // const createChapter = (chapterInfo: ChapterProps) => {
    
  // }

  class Chapter {
    title: string;
    outline: string;
    roles: string[];
    opponents: string[];
    scenario: string;

    constructor(title: string, outline: string, roles: string[], opponents: string[], scenario: string) {
      this.title = title;
      this.outline = outline;
      this.roles = roles;
      this.opponents = opponents;
      this.scenario = scenario;
    }
  }
  
  // class ChapterList {
  //   list: Chapter[];

  //   constructor()
  // }
  // function Chapters() {
  //   const chapter1 = new Chapter('', 'アウトライン1', ['教師'], '台本が入ります')
  //   const chapter2 = new Chapter('', 'アウトライン2', ['教師'], '台本が入ります')
  //   const chapter3 = new Chapter('', 'アウトライン3', ['教師'], '台本が入ります')
  //   return [chapter1, chapter2, chapter3]
  // }

  const chapter1 = new Chapter('タイトル1', 'アウトライン1', ['教師'], ['生徒'], '台本が入ります')
  const chapter2 = new Chapter('タイトル2', 'アウトライン2', ['インシデント対応者'], ['クライアント'], '台本が入ります')
  const chapter3 = new Chapter('タイトル3', 'アウトライン3', ['教授', '研究室の先輩'], ['研究室の後輩'], '台本が入ります')

  const chapters: Chapter[] = [chapter1, chapter2, chapter3]

  // const handleClick = (chapter: Chapter) => {
  //   navigate('/chat', {state: chapter})
  // }
  
  return (
    <>
      <Heading>チャプター選択画面</Heading>
      <Stack spacing='10'>
        {chapters.map((chapter) => (
          <Card key={chapter.title} variant='elevated' direction={{ base: 'column', sm: 'row' }} width={'80%'}>
            <CardHeader>
              <Heading size='md'> {chapter.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{chapter.outline}</Text>
            </CardBody>
            <Select width={'30%'}>
              {chapter.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>

            <Select width={'30%'}>
              {chapter.opponents.map((opponent) => (
                <option key={opponent} value={opponent}>
                  {opponent}
                </option>
              ))}
            </Select>
            <Button colorScheme='blue'>選択</Button>
          </Card>
        ))}
      </Stack>
      {/* <Sidebar /> */}
    </>
  )
}

export default Chapters