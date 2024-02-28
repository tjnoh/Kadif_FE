// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Progress,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
// import KeywordsDetail from 'components/analytics/keywordsDetail';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import React from 'react';
// Assets
import { lineChartOptionsAverage, lineChartOptionsTotalSpent } from 'variables/charts';
import KeywordsDetail from './keywordsDetail';
import FileSize from './FileSize';

export default function ShowDetail(props: { detailData: any; currentPcname: any; }) {
  const { detailData, currentPcname } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColorSecondary = 'gray.400';
  const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const transformedDetailData = Object.keys(detailData?.result[1] || {}).map(key => ({
    name: key,
    data: detailData?.result[1][key].data
  }));

  return (
    <Card alignItems="center" w={'48%'} m={'0 auto'}>
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px">
        {`상세분석 : ${currentPcname}`}
      </Text>
      <Flex w={'100%'} justifyContent={'space-around'}>
        <Text color={textColorPrimary} fontSize="md" mt="10px">
          {`분석 시작 일자 : ${detailData?.result[3].startDate ? detailData?.result[3].startDate.slice(0, 10) : ''}`}
        </Text>
        <Text color={textColorPrimary} fontSize="md" mt="10px" mb={'10px'}>
        {`분석 종료 일자 : ${detailData?.result[3].endDate ? detailData?.result[3].endDate.slice(0, 10) : ''}`}
        </Text>

      </Flex>
      <Box w="100%" h={'30%'}>
        <KeywordsDetail data={detailData?.result[0]}></KeywordsDetail>
      </Box>
      <Box
        w={'100%'}
        border={'1px solid #ccc'}
      >
        <LineChart
          chartData={transformedDetailData}
          chartOptions={lineChartOptionsAverage(
            detailData?.result[1].average.date,
          )}
        ></LineChart>
      </Box>
      {/* </Flex> */}
      <Box w='100%' h={'35%'} border={'1px solid #ccc'}>
        <FileSize fileSizeData={detailData?.result[2]} ></FileSize>
      </Box>
    </Card>
  );
}
