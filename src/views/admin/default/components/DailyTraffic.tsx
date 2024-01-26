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
	let dayStr;

	switch(rest.day) {
		case 'day':
			dayStr = '금일'
		break;
		case 'month':
			dayStr = '금월'
		break;
		default :
			dayStr = '금주'
		break;
	}

	return (
		<Card alignItems='center' flexDirection='column'  w='100%' h={'100%'} maxH={'100%'} minH={'100%'}
		borderRadius={'0px'} p={'0px'} {...rest}>
			<Flex height={'40px'} maxH={'40px'} minH={'40px'} alignSelf={'start'} width={'100%'} mt={'10px'} mb='8px' pl={'10px'} pr={'10px'}
			>
				<Text w='100%' justifySelf={'center'} lineHeight={'40px'} color={'#03619E'} fontSize={'18px'} fontWeight={900}
				>
						{dayStr} 중요 패턴/키워드 유출 주요 내역
				</Text>
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
