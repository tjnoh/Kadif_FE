'use client';
import { ChangeEvent, useState } from 'react';
import { Text, Icon, Heading, Input, InputGroup, Flex, Badge, FormLabel } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
// Chakra imports
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import { FaCalendarAlt } from 'react-icons/fa';

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
      justifyContent={'space-evenly'}
      justifyItems={'center'}
      w="50%"
      maxW="100vw"
      borderRadius={'0px'}
      h="min-content"
      mb={'0px'}
    >
      <Flex justifyContent={'space-evenly'}>
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
          <Input w={'70%'} type="datetime-local" value={startDate} onChange={handleStartDateChange} />
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
          <Input w={'70%'} type="datetime-local" value={endDate} onChange={handleEndDateChange} />
        </Flex>
      </Flex>
    </Card>
  );

}
