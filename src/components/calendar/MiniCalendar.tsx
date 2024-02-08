'use client';
import { ChangeEvent, useState } from 'react';
import { Text, Icon, Heading, Input, InputGroup, Flex, Badge, FormLabel } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
// Chakra imports
// Custom components
import Card from 'components/card/Card';

export default function MiniCalendar(props: { startDate: any, setStartDate: any, endDate: any, setEndDate: any }) {
  const { startDate, setStartDate, endDate, setEndDate } = props

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <Card
      justifyContent={'space-around'}
      justifyItems={'center'}
      flexDirection="row"
      w="100%"
      maxW="100vw"
      p="20px 15px"
      h="max-content"
    >
      <Heading>날짜 선택</Heading>
      <Flex>
        <FormLabel
          height={'100%'}
          ms="4px"
          display="flex"
          alignItems={'center'}
        >
          시작 일자 <Text> : </Text></FormLabel>
        <Input w={{ base: '40vw', md: '25vw' }} type="datetime-local" value={startDate} onChange={handleStartDateChange} />
      </Flex>
      <Flex>
        <FormLabel
          height={'100%'}
          ms="4px"
          display="flex"
          alignItems={'center'}
        >
          종료 일자 <Text> : </Text></FormLabel>
        <Input w={{ base: '40vw', md: '25vw' }} type="datetime-local" value={endDate} onChange={handleEndDateChange} />
      </Flex>
    </Card>
  );

}
