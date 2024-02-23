'use client';
import { ChangeEvent, useState } from 'react';
import { Text, Icon, Heading, Input, InputGroup, Flex, Badge, FormLabel, Button } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
// Chakra imports
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import { FaCalendarAlt } from 'react-icons/fa';

export default function MiniCalendar(props: { startDate: any, setStartDate: any, endDate: any, setEndDate: any, formatDateToDateTimeLocal:any }) {
  const { startDate, setStartDate, endDate, setEndDate,formatDateToDateTimeLocal } = props

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value',event.target.value);
    
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleBtn = (str:string) => {
    let cnt=0;
    const currentDate = new Date();
    let   changeDate = new Date();

    if(str.includes('d')) {
      cnt = +str.at(0);
      changeDate.setDate(currentDate.getDate() - cnt);
    } else if(str.includes('m')) {
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
          <FormLabel
            height={'100%'}
            ms="4px"
            display="flex"
            alignItems={'center'}
            fontWeight={'700'}
          >
            시작 일자 : 
          </FormLabel>
          <Input w={'70%'} type="date" value={startDate} onChange={handleStartDateChange} />
        </Flex>
        <Flex>
          <FormLabel
            height={'100%'}
            ms="4px"
            display="flex"
            alignItems={'center'}
            fontWeight={'700'}
          >
            종료 일자 : </FormLabel>
          <Input w={'70%'} type="date" value={endDate}  onChange={handleEndDateChange} />
        </Flex>
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
      </Flex>
    </Card>
  );

}
