'use client';
import { ChangeEvent, useState } from 'react';
import { Text, Icon, Heading, Input, InputGroup, Flex, Badge, FormLabel, Button } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
// Chakra imports
// Custom components
import Card from 'components/card/Card';

export default function MiniCalendar(props: { startDate: any, setStartDate: any, endDate: any, setEndDate: any, formatDateToDateTimeLocal: any, dateSelect: any, setDateSelect: any }) {
  const { startDate, setStartDate, endDate, setEndDate, formatDateToDateTimeLocal, dateSelect, setDateSelect } = props

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentDate = new Date(event.target.value);
    let fixDate = modifyDate(currentDate, dateSelect);
    setStartDate(event.target.value);
    //형식 변경 이후 값 저장
    const formatDate = formatDateToDateTimeLocal(fixDate);
    
    setEndDate(formatDate);
  };

  const modifyDate = (currentDate: Date, dateSelect: string): Date => {
    let fixDate = new Date(currentDate);

    if (dateSelect.includes('d')) {
      fixDate.setDate(fixDate.getDate() + parseInt(dateSelect.at(0)) - (fixDate.getDate() > 30 ? 3 : 1));
    } else if (dateSelect.includes('m')) {
      fixDate.setMonth(fixDate.getMonth() + parseInt(dateSelect.at(0)));
    } else if (dateSelect.includes('y')) {
      fixDate.setFullYear(fixDate.getFullYear() + parseInt(dateSelect.at(0)));
    }
    return fixDate;
  }

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleBtn = (str: string) => {
    setDateSelect(str);
    let cnt = 0;
    const currentDate = new Date();
    let changeDate = new Date();

    if (str.includes('d')) {
      cnt = +str.at(0);
      changeDate.setDate(currentDate.getDate() - cnt);
    } else if (str.includes('m')) {
      cnt = +str.at(0);
      changeDate.setMonth(currentDate.getMonth() - cnt);
    } else {
      cnt = +str.at(0);
      changeDate.setFullYear(currentDate.getFullYear() - cnt);
    }

    // 날짜 객체를 포맷팅
    const formattedChangeDate = formatDateToDateTimeLocal(changeDate);
    const formattedCurrentDate = formatDateToDateTimeLocal(currentDate);

    // 포맷팅된 문자열을 상태로 설정
    setStartDate(formattedChangeDate);
    setEndDate(formattedCurrentDate);
  }

  return (
    <Card
      justifyContent={'start'}
      justifyItems={'center'}
      w="100%"
      maxW="100vw"
      borderRadius={'0px'}
      h="min-content"
      mb={'0px'}
    >
      <Flex justifyContent={'start'}>
        <Flex>
          {/* <Button 
          borderRadius={'0px'}
          onClick={() => handleBtn('1d')}>
            오늘
          </Button> */}
          <Button
            borderRadius={'0px'}
            onClick={() => handleBtn('7d')}>
            1주일
          </Button>
          <Button
            borderRadius={'0px'}
            onClick={() => handleBtn('1m')}>
            1개월
          </Button>
          <Button
            borderRadius={'0px'}
            onClick={() => handleBtn('3m')}>
            3개월
          </Button>
          <Button
            borderRadius={'0px'}
            onClick={() => handleBtn('6m')}>
            6개월
          </Button>
          <Button
            borderRadius={'0px'}
            onClick={() => handleBtn('1y')}>
            1년
          </Button>
        </Flex>
        <Flex
          display={dateSelect ? "flex" : "none"}
        >
          <FormLabel
            height={'100%'}
            ms="4px"
            display={"flex"}
            alignItems={'center'}
            fontWeight={'700'}
          >
            시작 일자 :
          </FormLabel>
          <Input w={'70%'} type="date" value={startDate} onChange={handleStartDateChange} />
        </Flex>
        <Flex
          display={dateSelect ? "flex" : "none"}>
          <FormLabel
            height={'100%'}
            ms="4px"
            display={"flex"}
            alignItems={'center'}
            fontWeight={'700'}
          >
            종료 일자 : </FormLabel>
          <Input w={'70%'} type="date" value={endDate} onChange={handleEndDateChange} disabled />
        </Flex>
      </Flex>
    </Card>
  );

}
