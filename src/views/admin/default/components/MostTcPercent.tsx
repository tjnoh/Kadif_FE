// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import PieChart from 'components/charts/PieChart';
import { VSeparator } from 'components/separator/Separator';
import * as React from 'react';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import { pieChartData, pieChartOptions } from 'variables/charts';

export default function MostTcPercent(props: { [x: string]: any; data:any; }) {
	const { data, ...rest } = props !== undefined && props
	console.log("data : ", data);
	const chartData: any[] = [];
	const chartOptionData: any[] = [];

	if(data?.length !== 0) {
		data?.map((data: { percentage: any; tc_group: any; }) => {
			chartData.push(data.percentage);
			chartOptionData.push(data.tc_group);
		});
		
		// if(parseFloat(data?.toFixed(2)) !== 0) {
		// 	chartData.push(parseFloat(data?.toFixed(1)));
		// 	chartOptionData.push('etc');
		// }
	}
	

	// 나머지 코드...
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');

	const cardRef = React.useRef(null);
	const [cardWidth, setCardWidth] = React.useState<string>();

	return (
		<Card alignItems='center' flexDirection='column' w='100%' h={'100%'} maxH={'100%'} minH={'100%'} borderRadius={'0px'} p={'0px'} {...rest}
		>
			<Flex
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mt={'10px'}
				mb='8px'
				pl={'10px'} pr={'10px'}>
				<Text color={'#03619E'} fontSize={'18px'} fontWeight={900}>
					정책 유형 비율
				</Text>
			</Flex>
			<Flex h={'100%'} w={'100%'} alignContent={'center'}>
				{data?.length !== 0 ? 
					<Flex flex={1} direction={'column'} h={'75%'} alignSelf={'center'} pt={'15px'}>
						<PieChart chartData={chartData} chartOptions={pieChartOptions(chartOptionData)} />
					</Flex> :
				 	<Text ml={'10px'} fontSize={'17px'} fontWeight={'700'}>해당 데이터가 존재하지 않습니다!</Text>
				}
			</Flex>
		</Card>
	);
}
