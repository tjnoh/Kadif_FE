// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import Card from 'components/card/Card'
// Custom components
import BarChart from 'components/charts/BarChart'
import React from 'react'
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from 'variables/charts'
import { MdBarChart } from 'react-icons/md'

export default function WeeklyRevenue(props: { [x: string]: any }) {
  const { ...rest } = props;
  const Chname = rest.data?.name ? rest.data?.name.charAt(0).toUpperCase() + rest.data?.name.slice(1) : '';
  const newData = [{
    name: Chname || 'Default Name',
    data: rest.data?.data || []
  }];
  console.log("top3 : ", rest.data?.category.slice(0,3));
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <Card w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'
        >
        {(rest.day !== 'month') ? ((rest.day !== 'week') ? '일간' : '주간') : '월간'} {Chname} 송신 TOP 10 IP
        </Text>
      </Flex>
      <Box h='240px'
       mt='auto'
       >
        {newData[0].data.length > 0 ? (
          <BarChart
            chartData={newData}
            chartOptions={barChartOptionsConsumption(rest.data?.category)}
          />
        ) : (
          <Text mt='50px' px='30px'
          color={textColor} fontSize='17px' textAlign='start' fontWeight='700' lineHeight='100%'
          >해당 데이터가 존재하지 않습니다!</Text>
        )}
      </Box>

    </Card>
  )
}
