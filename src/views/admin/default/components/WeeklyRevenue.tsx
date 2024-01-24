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

export default function WeeklyRevenue(props: { [x: string]: any }) {
  const { ...rest } = props;

  const Chname = rest.data?.name ? rest.data?.name.charAt(0).toUpperCase() + rest.data?.name.slice(1) : '';
  const newData = [{
    name: Chname || 'Default Name',
    data: rest.data?.data || []
  }];
  let titleName = '';

  rest.data?.name === 'media' ? titleName = '이동식 저장매체 유출 건수'
  : (rest.data?.name === 'outlook' ? titleName = 'Outlook 메일 발송 건수' 
  : (rest.data?.name === 'print' ? titleName = '프린터 인쇄 건수' : titleName = '사외 네트워크 유출 건수'));

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
          {titleName} TOP 10
        </Text>
      </Flex>
      <Box h='120px'
        mt='auto'
      >
        {newData[0].data.length > 0 ? (
          <Card p='0' height='120px'>
            <BarChart
              chartData={newData}
              chartOptions={barChartOptionsConsumption(rest.data?.category)}
            />
              <Text fontSize='smaller' my='3'>
                {rest.data?.category.slice(0, 3).map((category:any, index:number) => (
                  <span key={index}>
                    {index < 2 ? `Top ${index+1} : ` : ' Top 3 : '}{category+' '}
                  </span>
                ))}

              </Text>
          </Card>
        ) : (
          <Text mt='50px' px='30px'
            color={textColor} fontSize='17px' textAlign='start' fontWeight='700' lineHeight='100%'
          >해당 데이터가 존재하지 않습니다!</Text>
        )}
      </Box>

    </Card>
  )
}
