// Chakra imports
import { Box, Flex, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import IconBox from 'components/icons/IconBox';
import Menu from 'components/menu/MainMenu';
import React from 'react';
// Assets
import { MdOutlineCloudDone } from 'react-icons/md';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from 'variables/charts';

export default function ShowDetail(props: { detail:any }) {
	const { detail } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

	

	return (
		<Card mb={{ base: '0px', lg: '20px' }} alignItems='center' w={'48%'} m={'0 auto'} display={detail ? '' : 'none'}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
				상세분석
			</Text>
			<Box w='100%'>
				<LineChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent()}></LineChart>
			</Box>
		</Card>
	);
}
