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
  barChartOptionsDailyTraffic,
} from 'variables/charts'

interface DataItem {
  [key: string]: {
    [key: string]: number;
  };
}

interface TransformedDataItem {
  name: string;
  data: any[];
}

export default function TcResult(props: { [x: string]: any;
  data: any[];
 }) {
  const { data, ...rest } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const categories: string[] = [];
  const tcData: { name: string; data: any[] }[] = [];

  data?.map((item: { [x: string]: any }, index) => {
    const key = Object.keys(item)[index]; // 첫 번째 키를 가져옴
    categories.push(key); // 카테고리 배열에 키를 추가
    const values = Object.values(item[key]); // 해당 키의 값을 가져옴
    const tcKey = Object.keys(item[key]);
    for (let i = 0; i < tcKey.length; i++) {
      tcData.push({ name: tcKey[i], data: [values[i]]}); // tcData에 추가
    }
  });
  return (
    <Card w='100%' borderRadius={'0px'} p={'0px'} {...rest} h={'100%'}>
      <Flex height={'40px'} maxH={'100%'} minH={'40px'} alignSelf={'start'} width={'100%'} mt={'10px'} mb='8px' pl={'10px'} pr={'10px'}>
        <Text w='100%' justifySelf={'center'} lineHeight={'40px'} color={'#03619E'} fontSize={'18px'} fontWeight={900}>
          정책 유형별 테스트 현황
        </Text>
      </Flex>
      <Box>
        {data?.length > 0 ? (
          <Card p='0' height='250px'>
            <BarChart
              chartData={tcData}
              chartOptions={barChartOptionsDailyTraffic(categories)}
            />
          </Card>
        ) : (
          <Text mt='0px' px='0px' ml={'10px'} color={textColor} fontSize='17px' textAlign='start' fontWeight='700' lineHeight='100%'>
            해당 데이터가 존재하지 않습니다!
          </Text>
        )}
      </Box>
    </Card>
  )
}
