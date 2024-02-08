'use client';

import {
  Box,
  Flex,
  FormLabel,
  Image,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Grid,
  GridItem,
  Text,
  Card,
  IconButton,
  Checkbox,
  Heading,
  Button,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {
  MdBarChart,
  MdMail,
  MdPrint,
  MdVideocam,
} from 'react-icons/md';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
// Assets
import { useEffect, useState } from 'react';
import { fetchLogic } from 'utils/fetchData';
import { getNameCookie } from 'utils/cookie';

export default function Default() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const [checkedKeywords, setCheckedKeywords] = useState<any>({});
  const [allCheckBtn, setAllCheckBtn] = useState(false);
  const [keywordList, setKeywordList] = useState([]);
  let keyset = ['주민번호', '핸드폰번호', '핸드폰번호핸드폰번호핸드폰번호', '핸드폰번호핸드폰번호핸드폰번호', 'Test', '등등','넘겨', 'size', '자자', 'ㅅㄷㄴㅅ', 
  'apfhd', '등등','넘겨', 'size', '자자', 'ㅅㄷㄴㅅ', 'apfhd','주민번호', '핸드폰번호', '핸드폰번호핸드폰번호핸드폰번호', '핸드폰번호핸드폰번호핸드폰번호', 'Test', '등등','넘겨', 'size', '자자', 'ㅅㄷㄴㅅ', 
  'apfhd', '등등','넘겨', 'size', '자자', 'ㅅㄷㄴㅅ', 'apfhd', 'Test', '등등','넘겨', 'size', '자자', 'ㅅㄷㄴㅅ', 
  'apfhd', '등등','넘겨', 'size', '자자', 'ㅅㄷㄴㅅ', 'apfhd'];

  useEffect(() => {
    fetchLogic("analysis/keywordList",setKeywordList);
  }, []);

  useEffect(() => {
    const initialCheckState:any = {};
    keywordList.forEach((keyword,index) => {
      initialCheckState[index] = true;
    });
    setCheckedKeywords(initialCheckState);
  }, [keywordList]);

  // 체크 상태 변경 핸들러
  const handleCheckboxChange = (keyword:any) => {
    const newCheckedKeywords = { ...checkedKeywords, [keyword]: !checkedKeywords[keyword] };
    setCheckedKeywords(newCheckedKeywords);

    // 모든 키워드가 체크되었는지 확인
    const allChecked = Object.values(newCheckedKeywords).every(checked => checked);
    setAllCheckBtn(!allChecked); // 전체 선택/해제 버튼 상태 업데이트
  };

  const handleBtn = () => {
    setAllCheckBtn(!allCheckBtn);

    const newCheckedKeywords:any = {};
    Object.keys(checkedKeywords).forEach((keyword,index) => {
      newCheckedKeywords[index] = allCheckBtn;
    });
    
    setCheckedKeywords(newCheckedKeywords);
  }

  return (
    <Box pt={{ base: '0px', md: '0px' }}>
      <Card w={'100%'} h={'150px'} backgroundColor={'white'} borderRadius={'10px'}>
        <Flex h={'100%'} justifyContent={'center'}>
          <Box w={'10%'} justifyItems={'center'} p={'15px'}>
            <Heading w={'100%'} textAlign={'center'}>
              키워드
            </Heading>
            <Button value={allCheckBtn === true ? '전체 선택' : '전체 해제'} onClick={handleBtn} w={'100%'} mt={'10px'} fontSize={'sm'} >
              {allCheckBtn === true ? '전체 선택' : '전체 해제'}
            </Button>
          </Box>
          <Flex flexWrap={'wrap'} overflowY={'scroll'} w={'100%'} h={'100%'} p={'20px'}>
            {
              keywordList !== undefined ?
              keywordList.map((data,i) => {
                return (
                <Flex key={i} h={'25px'} w={'20%'}>
                  <Checkbox value={data} defaultChecked={true} p={'5px'} isChecked={checkedKeywords[i]} onChange={() => handleCheckboxChange(i)}></Checkbox>
                  <Text fontSize={'md'} >{data}</Text>
                </Flex>
                )
              })
              : 
              <Text>데이터가 없습니다.</Text>
            }
          </Flex>
        </Flex>
      </Card>

    </Box>
  );
}
