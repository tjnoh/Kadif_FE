'use client';

import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Card,
  Heading,
  Checkbox,
  Button,
} from '@chakra-ui/react';
// Assets
import { useEffect, useState } from 'react';
import { fetchLogic } from 'utils/fetchData';
import MiniCalendar from 'components/analytics/MiniCalendar';
import IPRangeBox from 'components/analytics/IPRange';
import Keywords from 'components/analytics/keywords';

export default function Default() {
  // Chakra Color Mode
  // 한국 시간대의 현재 날짜 및 시간 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const hour = String(today.getHours()).padStart(2, '0');
  const minute = String(today.getMinutes()).padStart(2, '0');

  const todayString = `${year}-${month}-${day}T${hour}:${minute}`;
  const [startDate, setStartDate] = useState<string>(todayString);
  const [endDate, setEndDate] = useState<string>(todayString);
  const [ipRange, setIpRange] = useState<string>();


  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const [checkedKeywords, setCheckedKeywords] = useState<any>([]);

  console.log('checkedKeywords',checkedKeywords);
  

  return (
    <Box pt={{ base: '0px', md: '0px' }}>
      <MiniCalendar startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
      ></MiniCalendar>
      <IPRangeBox ipRange={ipRange} setIpRange={setIpRange}></IPRangeBox>
      <Keywords checkedKeywords={checkedKeywords} setCheckedKeywords={setCheckedKeywords}></Keywords>
    </Box>
  );
}
