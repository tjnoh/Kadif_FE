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
  const newData = [{
    name: rest.data?.name || 'Default Name',
    data: rest.data?.data || []
  }];

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
        {(rest.day !== 'month') ? ((rest.day !== 'week') ? '일간' : '주간') : '월간'} {rest.data?.name} 송신 TOP 10 IP
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
          <Text mt='50px'
          color={textColor} fontSize='30px' textAlign='start' fontWeight='700' lineHeight='100%'
          >아직 데이터가 없습니다!</Text>
        )}
      </Box>

    </Card>
  )
}
