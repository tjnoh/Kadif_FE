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
import { KeywordState } from 'app/analytics/main/page';

export default function Keywords(props: {
  checkedKeywords: any;
  setCheckedKeywords: any;
}) {
  const { checkedKeywords, setCheckedKeywords } = props;

  const [allCheckBtn, setAllCheckBtn] = useState(true); // true : 전체 체크, false : 하나라도 unCheck
  const [keywordList, setKeywordList] = useState([]);
  const dangerValues = [10,9,8,7,6,5,4,3,2,1,0];
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
    // setKeywordList(keyset);
  }, []);

  useEffect(() => {
    const uniqueKeywords = [...new Set(keywordList)];
    setKeywordList(uniqueKeywords);

    const checkedValues = uniqueKeywords.reduce((accumulator:KeywordState, keyword:any) => {
      accumulator[keyword] = {
        check: true,
        level: 10
      };
      return accumulator;
    }, {});    

    setCheckedKeywords(checkedValues);
  }, [keywordList.length]);
  

  // 체크 상태 변경 핸들러
  const handleCheckboxChange = (keyword: any) => {
    const changeKeywords:any = {...checkedKeywords};
    changeKeywords[keyword].check = !changeKeywords[keyword]?.check;

    setCheckedKeywords(changeKeywords);

    // 모든 키워드가 체크되었는지 확인, 전체 선택/해제 버튼 상태 업데이트
    setAllCheckBtn(true);
    for (const key of Object.keys(checkedKeywords)) {
      if (checkedKeywords[key]?.check === false) {
        setAllCheckBtn(false);
        break;
      }
    }
  };

  // 전체 선택, 전체 해제
  const handleBtn = () => {
    setAllCheckBtn(!allCheckBtn);

    const changeKeywords = {...checkedKeywords};

    // 전체 unCheck
    if (allCheckBtn === true) {
      Object.keys(changeKeywords).forEach(keyword => {
        changeKeywords[keyword].check = false;
      });
    }
    // 전체 Check
    else {
      Object.keys(changeKeywords).forEach(keyword => {
        changeKeywords[keyword].check = true;
      });
    }

    setCheckedKeywords(changeKeywords);
  };

  // 위험도 레벨 변경
  const handleLevel = (e: React.ChangeEvent<HTMLSelectElement>,keyword:any) => {
    const changeKeywords:any = {...checkedKeywords};
    changeKeywords[keyword].level = +e.target.value;

    setCheckedKeywords(changeKeywords);
  }

  return (
    <Card w={'30%'} h={'min-content'} borderRadius={'0px'} mb={'0px'}>
      <Flex alignItems={'center'} display={'block'}>
        <Text fontSize={'md'} fontWeight={'700'} w={'75px'}>
          키워드
        </Text>
        <Button
          value={allCheckBtn === true ? '전체 해제' : '전체 선택'}
          onClick={handleBtn}
          w={'100px'}
          h={'75px'}
          p={0}
          fontSize={'sm'}
          borderRadius={'0px'}
        >
          {allCheckBtn === true ? '전체 해제' : '전체 선택'}
        </Button>
        <Box w={'20%'}>
          <Text>
            키워드/건수
          </Text>
          <Text>
            위험도
          </Text>
        </Box>

        <Flex flexWrap={'wrap'} overflowY={'scroll'} w={'100%'} h={'110px'}>
          {keywordList !== undefined ? (
            keywordList.map((data, i) => {
              console.log('checkedKeywords[data]?.level',checkedKeywords[data]?.level);
              
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
                    isChecked={checkedKeywords[data]?.check}
                    onChange={() => handleCheckboxChange(data)}
                  ></Checkbox>
                  <Select
                    id={data}
                    pt={'0px'}
                    w={'75px'}
                    h={'35px'}
                    mr={'5px'}
                    mb={'5px'}
                    defaultValue={checkedKeywords[data]?.level}
                    onChange={(e) => handleLevel(e,data)}
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
