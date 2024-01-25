// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from 'variables/charts';

export default function TotalSpent(props: { [x: string]: any }) {
	const { ...rest } = props;

	let newData:any = [];
	for(let i=0; i < rest.data.length-1; i++) {
		newData.push(rest.data[i]);
	}

	const monthArray = rest.data[4];

	// Chakra Color Mode

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

	const [ mounted, setMounted ] = useState(false);
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

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMounted(true);
		}, 3000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<Card justifyContent='center' alignItems='center' justifyItems='center' flexDirection='column' w='100%' h={rest.height} mb='0px' borderRadius={'0px'} p={'0px'} {...rest}>
			<Flex height={'40px'} maxH={'40px'} minH={'40px'} alignSelf={'start'} width={'100%'} mt={'10px'} mb='8px' pl={'10px'} pr={'10px'}
			>
				<Text w='100%' fontSize={'md'} fontWeight={600} justifySelf={'center'} lineHeight={'40px'} 
				>
						{dayStr} 유출 건수
				</Text>
			</Flex>
			<Flex h={'100%'} w={'100%'}>				
				<Card w={'20%'}>
					<Flex alignItems={'center'} mb={'5px'}>
						<Box h='8px' w='8px' bg='#3498db' borderRadius='50%' me='4px' alignSelf={'center'} />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' h={'100%'} alignSelf={'center'}>
							네트워크
						</Text>
					</Flex>
					<Flex alignContent={'center'} mb={'5px'}>
						<Box h='8px' w='8px' bg='#e74c3c' borderRadius='50%' me='4px' alignSelf={'center'} />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700'>
							저장매체
						</Text>
					</Flex>
					<Flex alignContent={'center'} mb={'5px'}>
						<Box h='8px' w='8px' bg='#2ecc71' borderRadius='50%' me='4px' alignSelf={'center'} />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700'>
							Outlook
						</Text>
					</Flex>
					<Flex alignContent={'center'} mb={'5px'}>
						<Box h='8px' w='8px' bg='#9b59b6' borderRadius='50%' me='4px' alignSelf={'center'} />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700'>
							프린터
						</Text>
					</Flex>
				</Card>
				<LineChart chartData={newData} chartOptions={lineChartOptionsTotalSpent(monthArray)} width='400px' height='100%' />
			</Flex>
		</Card>
	);
}
