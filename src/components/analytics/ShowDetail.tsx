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
import { lineChartOptionsTotalSpent } from 'variables/charts';
import KeywordsDetail from './keywordsDetail';

export default function ShowDetail(props: {
  detailData: any;
  currentPcname: any;
  startDate: any;
  endDate: any;
}) {
  const { detailData, currentPcname, startDate, endDate } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColorSecondary = 'gray.400';
  const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const transformedDetailData = Object.keys(detailData?.result[1] || {}).map(
    (key) => ({
      name: key,
      data: detailData?.result[1][key].data,
    }),
  );

  return (
    <Card alignItems="center" w={'48%'} m={'0 auto'}>
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px">
        {`상세분석 : ${currentPcname}`}
      </Text>
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px">
        {startDate}
      </Text>
      <Flex w="100%" h={'30%'}>
        <Card w={'15%'} px={'15px'}>
          <Flex alignItems={'center'} mb={'5px'}>
            <Box
              h="8px"
              w="8px"
              bg="#3498db"
              borderRadius="50%"
              me="4px"
              alignSelf={'center'}
            />
            <Tooltip label={transformedDetailData[0]?.name}>
            	<Text
	              fontSize="12px"
	              color="secondaryGray.600"
	              fontWeight="700"
	              h={'100%'}
	              alignSelf={'center'}
				  w={'85%'}
				  overflow="hidden"
				  whiteSpace="nowrap"
				  textOverflow="ellipsis"
	            >
	              {transformedDetailData[0]?.name}
	            </Text>
            </Tooltip>
          </Flex>
          <Flex alignContent={'center'} mb={'5px'}>
            <Box
              h="8px"
              w="8px"
              bg="#e74c3c"
              borderRadius="50%"
              me="4px"
              alignSelf={'center'}
            />
            <Tooltip label={transformedDetailData[1]?.name}>
            	<Text
	              fontSize="12px"
	              color="secondaryGray.600"
	              fontWeight="700"
	              h={'100%'}
	              alignSelf={'center'}
				  w={'85%'}
				  overflow="hidden"
				  whiteSpace="nowrap"
				  textOverflow="ellipsis"
	            >
	              {transformedDetailData[1]?.name}
	            </Text>
            </Tooltip>
          </Flex>
        </Card>
        <Box w={'75%'}>
        	<LineChart
	          chartData={transformedDetailData}
	          chartOptions={lineChartOptionsTotalSpent(
	            detailData?.result[1].average.date,
	          )}
	        ></LineChart>
        </Box>
      </Flex>
      <Box w="100%" h={'30%'}>
        <KeywordsDetail data={detailData?.result[0]}></KeywordsDetail>
      </Box>
    </Card>
  );
}
