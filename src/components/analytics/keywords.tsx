'use client';
import { useEffect, useState } from 'react';
import {
  Text,
  Heading,
  Flex,
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
    const uniqueKeywords = [...new Set(keywordList)];
    setKeywordList(uniqueKeywords);
    setCheckedKeywords(uniqueKeywords);
  }, [keywordList.length]);

  // 체크 상태 변경 핸들러
  const handleCheckboxChange = (keyword: any) => {

    let newChecked: any;
    if (checkedKeywords.includes(keyword)) {
      newChecked = checkedKeywords.filter((data: any) => data !== keyword);
    } else {
      newChecked = [...checkedKeywords, keyword];
    }

    setCheckedKeywords(newChecked);

    // 모든 키워드가 체크되었는지 확인
    const allChecked = keywordList.length === newChecked.length ? true : false;
    setAllCheckBtn(!allChecked); // 전체 선택/해제 버튼 상태 업데이트
  };

  const handleBtn = () => {
    setAllCheckBtn(!allCheckBtn);

    // 전체 선택
    if(!allCheckBtn === true) {
        setCheckedKeywords([]);
    } 
    // 전체 해제
    else {
        setCheckedKeywords(keywordList);
    }
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
          <Heading w={'100%'} textAlign={'center'}>
            키워드
          </Heading>
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
              const chkflag = checkedKeywords.includes(data) ? true : false;

              return (
                <Flex key={i} h={'25px'} w={'20%'}>
                  <Checkbox
                    value={data}
                    defaultChecked={true}
                    p={'5px'}
                    isChecked={chkflag}
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
