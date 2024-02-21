'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Text,
  Icon,
  Heading,
  Input,
  InputGroup,
  Flex,
  Badge,
  FormLabel,
  Textarea,
  Box,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
// Chakra imports
// Custom components
import Card from 'components/card/Card';
import { fetchLogic } from 'utils/fetchData';

export default function Keywords(props: {
  checkedKeywords: any;
  setCheckedKeywords: any;
}) {
  const { checkedKeywords, setCheckedKeywords } = props;

  const [allCheckBtn, setAllCheckBtn] = useState(false);
  const [keywordList, setKeywordList] = useState([]);
  const [checkedKeywordsObj, setCheckedKeywordsObj] = useState<any>({});
  let keyset = [
    '주민번호',
    '핸드폰번호',
    '핸드폰번호핸드폰번호핸드폰번호',
    '핸드폰번호핸드폰번호핸드폰번호',
    'Test',
    '등등',
    '넘겨',
    'size',
    '자자',
    'ㅅㄷㄴㅅ',
    'apfhd',
    '등등',
    '넘겨',
    'size',
    '자자',
    'ㅅㄷㄴㅅ',
    'apfhd',
    '주민번호',
    '핸드폰번호',
    '핸드폰번호핸드폰번호핸드폰번호',
    '핸드폰번호핸드폰번호핸드폰번호',
    'Test',
    '등등',
    '넘겨',
    'size',
    '자자',
    'ㅅㄷㄴㅅ',
    'apfhd',
    '등등',
    '넘겨',
    'size',
    '자자',
    'ㅅㄷㄴㅅ',
    'apfhd',
    'Test',
    '등등',
    '넘겨',
    'size',
    '자자',
    'ㅅㄷㄴㅅ',
    'apfhd',
    '등등',
    '넘겨',
    'size',
    '자자',
    'ㅅㄷㄴㅅ',
    'apfhd',
  ];

  useEffect(() => {
    fetchLogic('analysis/keywordList', setKeywordList);
  }, []);

  useEffect(() => {
    const initialCheckState: { [key: string]: boolean } = {};

    // const initialKeyword
    keywordList.forEach((keyword) => {
      initialCheckState[keyword] = true;
    });
    console.log('initialCheckState', initialCheckState);

    setCheckedKeywordsObj(initialCheckState);
    setCheckedKeywords(keywordList);
  }, [keywordList]);

  // 체크 상태 변경 핸들러
  const handleCheckboxChange = (keyword: any) => {
    console.log('keyword', keyword);

    let newChecked: any;
    if (checkedKeywords.includes(keyword)) {
      newChecked = checkedKeywords.filter((data: any) => data !== keyword);
    } else {
      newChecked = [...checkedKeywords, keyword];
    }
    console.log('newChecked', newChecked);

    setCheckedKeywords(newChecked);

    const newCheckedKeywords = {
      ...checkedKeywordsObj,
      [keyword]: !checkedKeywordsObj[keyword],
    };
    setCheckedKeywordsObj(newCheckedKeywords);

    // 모든 키워드가 체크되었는지 확인
    const allChecked = keywordList.length === newChecked.length ? true : false;
    setAllCheckBtn(!allChecked); // 전체 선택/해제 버튼 상태 업데이트
  };

  const handleBtn = () => {
    setAllCheckBtn(!allCheckBtn);

    const newCheckedKeywords: any = {};
    Object.keys(checkedKeywordsObj).forEach((keyword, index) => {
      newCheckedKeywords[index] = allCheckBtn;
    });

    setCheckedKeywordsObj(newCheckedKeywords);
  };

  return (
    <Card
      w={'100%'}
      h={'150px'}
      backgroundColor={'white'}
      borderRadius={'10px'}
    >
      <Flex h={'100%'} justifyContent={'center'}>
        <Box w={'10%'} justifyItems={'center'} p={'15px'}>
          <>
            키워드
          </>
          <Button
            value={allCheckBtn === true ? '전체 선택' : '전체 해제'}
            onClick={handleBtn}
            w={'100%'}
            mt={'10px'}
            fontSize={'sm'}
          >
            {allCheckBtn === true ? '전체 선택' : '전체 해제'}
          </Button>
        </Box>
        <Flex
          flexWrap={'wrap'}
          overflowY={'scroll'}
          w={'100%'}
          h={'100%'}
          p={'20px'}
        >
          {keywordList !== undefined ? (
            keywordList.map((data, i) => {
              return (
                <Flex key={i} h={'25px'} w={'20%'}>
                  <Checkbox
                    value={data}
                    defaultChecked={true}
                    p={'5px'}
                    isChecked={checkedKeywordsObj[i]}
                    onChange={() => handleCheckboxChange(data)}
                  ></Checkbox>
                  <Text fontSize={'md'}>{data}</Text>
                </Flex>
              );
            })
          ) : (
            <Text>데이터가 없습니다.</Text>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
