// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import BarChart from 'components/charts/BarChart';

// Custom components
import Card from 'components/card/Card';
import { barChartDataDailyTraffic, barChartOptionsDailyTraffic } from 'variables/charts';

// Assets
import { RiArrowUpSFill } from 'react-icons/ri';

export default function DailyTraffic(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card alignItems='center' flexDirection='column'  w='100%' h={'100%'} maxH={'100%'} minH={'100%'}
		borderRadius={'0px'} p={'0px'} {...rest}>
			<Flex justify='space-between' align='start' px='10px' pt='5px' w='100%'>
				<Flex flexDirection='column' align='start' me='20px'>
					<Text color='Black' fontSize='sm' fontWeight='500'>
						금일 중요 패턴/키워드 유출 주요 내역
					</Text>
				</Flex>
			</Flex>
			<Box 
			width='100%' h='250px'
				mt='auto'
			>
				<BarChart
					
					h='150px'
					chartData={barChartDataDailyTraffic} chartOptions={barChartOptionsDailyTraffic} />
			</Box>
		</Card>
	);
}
