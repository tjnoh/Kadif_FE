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
		<Card p='20px' mb='20px' alignItems='center' flexDirection='column' w='100%' h={'95%'} {...rest}>
			<Flex
				px={{ base: '10px', '2xl': '20px' }}
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mb='8px'>
				<Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
					Process 별 송신 건수
				</Text>
				<Select fontSize='sm' variant='subtle' defaultValue='Network' width='unset' fontWeight='700'
					onChange={(e) => setSelect(e.target.value)}>
					<option value='Network'>Network</option>
					<option value='Media'>Media</option>
					<option value='Outlook'>Outlook</option>
					<option value='Print'>Print</option>
				</Select>
			</Flex>

			<PieChart h='100%' w='100%' chartData={chartData} chartOptions={pieChartOptions(chartOptionData)} />
			<Card
				bg={cardColor}
				flexDirection='row'
				boxShadow={cardShadow}
				w='100%'
				p='15px'
				px='20px'
				// mt='15px'
				mx='auto'>
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							{count[0]?.process}
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{count[0]?.count} 회
					</Text>
				</Flex>
				<VSeparator mx={{ base: '30%', xl: '25%', '2xl': '10%' }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							{count[1]?.process}
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{count[1]?.count} 회
					</Text>
				</Flex>
			</Card>
		</Card>
	);
}
