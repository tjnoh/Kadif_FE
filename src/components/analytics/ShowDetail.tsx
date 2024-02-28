// Chakra imports
import { Box, Flex, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react';
// import KeywordsDetail from 'components/analytics/keywordsDetail';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import React from 'react';
// Assets
import { lineChartOptionsTotalSpent } from 'variables/charts';
import KeywordsDetail from './keywordsDetail';
import FileSize from './FileSize';

export default function ShowDetail(props: { detailData:any; currentPcname:any; startDate:any,endDate:any}) {
	const { detailData, currentPcname, startDate,endDate} = props;
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
		<Card alignItems='center' w={'48%'} m={'0 auto'}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
				{ `상세분석 : ${currentPcname}` }				
			</Text>
			{/* <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>{startDate}</Text> */}
			<Box w='100%' h={'30%'} mt={'3'}>
				<KeywordsDetail data={detailData?.result[0]}></KeywordsDetail>
			</Box>
			<Box w='100%' h={'30%'}>
				<LineChart chartData={transformedDetailData} chartOptions={lineChartOptionsTotalSpent(detailData?.result[1].average.date)}></LineChart>
			</Box>
			<Box w='100%' h={'30%'}>
				<FileSize></FileSize>
			</Box>
		</Card>
	);
}