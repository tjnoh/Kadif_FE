'use client';
import { useEffect, useState } from 'react';
import { Text, Heading, Flex, Box, Button, Checkbox, Select } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
// Chakra imports
// Custom components
import Card from 'components/card/Card';
import { fetchLogic } from 'utils/fetchData';
import IconBox from 'components/icons/IconBox';
import { Icon } from '@chakra-ui/icons';
import { FaCalendarAlt, FaKeyboard } from 'react-icons/fa';
import { MdKeyboard, MdKeyboardAlt, MdOutlineTextFields } from 'react-icons/md';

export default function Keywords(props: {
  checkedKeywords: any;
  setCheckedKeywords: any;
}) {
  const { checkedKeywords, setCheckedKeywords } = props;

  const [allCheckBtn, setAllCheckBtn] = useState(false);
  const [keywordList, setKeywordList] = useState([]);
  const dangerValues = [0,1,2,3,4,5,6,7,8,9,10];
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
    setKeywordList(keyset);
  }, []);

  useEffect(() => {
    const uniqueKeywords = [...new Set(keyset)];
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
    if (!allCheckBtn === true) {
      setCheckedKeywords([]);
    }
    // 전체 해제
    else {
      setCheckedKeywords(keywordList);
    }
  };

  return (
    <Card w={'30%'} h={'min-content'} borderRadius={'0px'} mb={'0px'}>
      <Flex alignItems={'center'} display={'block'}>
        <Text fontSize={'md'} fontWeight={'700'} w={'75px'}>
          키워드
        </Text>
        <Button
          value={allCheckBtn === true ? '전체 선택' : '전체 해제'}
          onClick={handleBtn}
          w={'100px'}
          h={'75px'}
          p={0}
          fontSize={'sm'}
          borderRadius={'0px'}
        >
          {allCheckBtn === true ? '전체 선택' : '전체 해제'}
        </Button>
        <Box w={'20%'}>
          <Text>
            건수/키워드
          </Text>
          <Text>
            위험도
          </Text>
        </Box>

        <Flex flexWrap={'wrap'} overflowY={'scroll'} w={'100%'} h={'110px'}>
          {keywordList !== undefined ? (
            keywordList.map((data, i) => {
              const chkflag = checkedKeywords.includes(data) ? true : false;

              return (
                <Flex key={i} h={'min-content'} w={'100%'} alignItems={'start'}>
                  <Text fontSize={'sm'} h={'min-content'} lineHeight={'35px'}>{data}</Text>
                  <Checkbox
                    value={data}
                    defaultChecked={true}
                    h={'35px'}
                    // pt={'3px'}
                    pl={'10px'}
                    pr={'10px'}
                    isChecked={chkflag}
                    onChange={() => handleCheckboxChange(data)}
                  ></Checkbox>
                  <Select
                    id={data}
                    // onClick={handleMonthChange}
                    pt={'0px'}
                    w={'75px'}
                    h={'35px'}
                    mr={'5px'}
                    mb={'5px'}
                    defaultValue={'10'}
                    // display={selectYear !== undefined ? '' : 'none'}
                  >
                    {
                      dangerValues.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
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
