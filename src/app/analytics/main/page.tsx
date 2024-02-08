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
  Heading,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import IconBox from 'components/icons/IconBox';
import {
  MdEditCalendar,
} from 'react-icons/md';
// Assets
import { useEffect, useState } from 'react';
import { fetchLogic } from 'utils/fetchData';
import { getNameCookie } from 'utils/cookie';
import MiniCalendar from 'components/calendar/MiniCalendar';
import IPRangeBox from 'components/calendar/IPRange';

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

  return (
    <Box pt={{ base: '0px', md: '0px' }}>
      <MiniCalendar startDate={startDate} setStartDate={setStartDate}
      endDate={endDate} setEndDate={setEndDate}
      ></MiniCalendar>
      <IPRangeBox ipRange={ipRange} setIpRange={setIpRange}></IPRangeBox>
      
    </Box>
  );
}
