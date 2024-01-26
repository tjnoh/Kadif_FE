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

type ProcessData = {
	process: string,
	count: number,
	hcount: number,
	day: number
}

export default function Conversion(props: { [x: string]: any }) {
	const { ...rest } = props !== undefined && props
	const [count, setCount] = React.useState<ProcessData[]>([]);	//
	const [select, setSelect] = React.useState('Network');
	const chartData = [
		count?.[0]?.hcount ?? 0,
		count?.[1]?.hcount ?? 0,
		count?.[2]?.hcount ?? 0,
		count?.[3]?.hcount ?? 0,
		count?.[4]?.hcount ?? 0,
		count ? 100 - (count?.[0]?.hcount ?? 0) - (count?.[1]?.hcount ?? 0) - (count?.[2]?.hcount ?? 0) - (count?.[3]?.hcount ?? 0) - (count?.[4]?.hcount ?? 0) : 0
	];
	const chartOptionData = [
		count?.[0]?.process ?? "",
		count?.[1]?.process ?? "",
		count?.[2]?.process ?? "else",
		count?.[3]?.process ?? "else",
		count?.[4]?.process ?? "else",
	];

	// 나머지 코드...
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');

	const cardRef = React.useRef(null);
	const [cardWidth, setCardWidth] = React.useState<string>();

	React.useEffect(() => {
		const fetchData = async () => {
			const userNameCookie = await getNameCookie();
			await fetchCount(userNameCookie);
		}
		fetchData();
	}, [select, rest.day])	

	const fetchCount = async (userNameCookie:string) => {
		try {
			const response = await fetch(`${backIP}/pie/count/${select}?day=${rest.day}&username=${userNameCookie}`);
			const data = await response.json();
			setCount(data);
		} catch (error) {
			console.error('에러 등장 : ', error);
		}
	}

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
					Process 별 유출 건수
				</Text>
				<Select fontSize='sm' variant='subtle' defaultValue='Network' width='unset' fontWeight='700'
					onChange={(e) => setSelect(e.target.value)}>
					<option value='Network'>Network</option>
					<option value='Media'>Media</option>
					<option value='Outlook'>Outlook</option>
					<option value='Print'>Print</option>
				</Select>
			</Flex>

			<Flex h={'100%'} w={'100%'} alignContent={'center'}>
				<Flex flex={1} direction={'column'} alignSelf={'center'} pt={'15px'}><PieChart chartData={chartData} chartOptions={pieChartOptions(chartOptionData)} width={cardWidth} /></Flex>
			</Flex>
		</Card>
	);
}
