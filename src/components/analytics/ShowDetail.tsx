// Chakra imports
import { Box, Flex, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react';
// import KeywordsDetail from 'components/analytics/keywordsDetail';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import IconBox from 'components/icons/IconBox';
import Menu from 'components/menu/MainMenu';
import React from 'react';
// Assets
import { MdOutlineCloudDone } from 'react-icons/md';
import { lineChartOptionsTotalSpent } from 'variables/charts';

export default function ShowDetail(props: { detailData:any; currentPcname:any; startDate:any,endDate:any}) {
	const { detailData, currentPcname, startDate,endDate} = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	// let days = [];
	// for(let i=0; i<detailData?.average.date.length; i++){
	// // 문자열을 "-"를 기준으로 분리하여 배열로 만듦
	// const dateParts = detailData?.average.date[i].split("-");
	// // 각각의 연도, 월, 일을 추출하여 변수에 저장
	// const year = dateParts[0];
	// const month = dateParts[1];
	// const day = dateParts[2];
	// if(title === '7d' || title === '1m'){
	// 	days.push(day+"일");
	// } else if(title === '3m'){
	// 	days.push(month+"/"+day)
	// } else if (title === '1y')
	// 	days.push(month+"월")
	// }
	const transformedDetailData = Object.keys(detailData || {}).map(key => ({
		name: key,
		data: detailData[key].data
	  }));


	return (
		<Card mb={{ base: '0px', lg: '20px' }} alignItems='center' w={'48%'} m={'0 auto'}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
				{ `상세분석 : ${currentPcname}` }				
			</Text>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>{startDate}</Text>
			<Box w='100%'>
				<LineChart chartData={transformedDetailData} chartOptions={lineChartOptionsTotalSpent(detailData?.average.date)}></LineChart>
			</Box>
			<Box w='100%'>
				{/* <KeywordsDetail data={detailData?.result[0]}></KeywordsDetail> */}
			</Box>
		</Card>
	);
}
