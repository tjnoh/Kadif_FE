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
import MiniCalendar from 'components/analytics/MiniCalendar';
import { backIP } from 'utils/ipDomain';
import AverageLine from 'components/analytics/AverageLine';
import { fetchLogic } from 'utils/fetchData';

export default function Default() {
  // Chakra Color Mode
  // 한국 시간대의 현재 날짜 및 시간 가져오기
  const today = new Date();
  const stDate = new Date();
  stDate.setDate(today.getDate() - 7);
  
  const [startDate, setStartDate] = useState<string>(formatDateToDateTimeLocal(stDate));
  const [endDate, setEndDate] = useState<string>(formatDateToDateTimeLocal(today));
  const [ipRange, setIpRange] = useState<string>();
  const [average, setAverage] = useState({});

  useEffect(() => {
    submitData();
  }, [startDate, endDate])

  const submitData = async () => {
    const response = await fetch(`${backIP}/analysis/select`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        ipRange: ipRange,
      })
    })
    if (response.ok) {
      const result = await response.json();
      setAverage(result);
      console.log("result : ", result);
    }
  }

  const made = async () => {
    const result = await fetchLogic('analysis/insert');
  }

  // 날짜 객체를 YYYY-MM-DDTHH:mm 형식의 문자열로 변환하는 함수
  function formatDateToDateTimeLocal(date:Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <Box pt={{ base: '0px', md: '0px' }}>
      <MiniCalendar startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate} formatDateToDateTimeLocal={formatDateToDateTimeLocal}
      ></MiniCalendar>
      <Button onClick={made}>만들기</Button>
    </Box>
  );
}
