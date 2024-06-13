// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

export default function SessionCount(props: {[x: string]: any;
	startContent?: JSX.Element;
	endContent?: JSX.Element;
	data:number;
	result?:string;
}) {
	const { startContent,endContent, result, data, ...rest } = props;
	const textColor = useColorModeValue('Black', 'Black');
	const textColorSecondary = 'Black';
	
	return (
		<Card py={'0px'} h={'100%'} 
		>
			<Flex
				h='100%'
				align={{ base: 'center', xl: 'center' }}
				justify={{ base: 'center', xl: 'center' }}>
				{startContent}
				<Stat ms={startContent ? '18px' : '0px'} pt='5px'>
					<StatLabel
						lineHeight='100%'
						color={textColorSecondary}
						fontSize={{
							base: '15px'
						}}
						// p={'5px'}
						fontWeight={'100'}
						>
							{result} 세션 수
					</StatLabel>
					<StatNumber
						color={textColor}
						fontSize={{
							base: '3xl'
						}}
						pl={"10px"}
						>
						{data}
					</StatNumber>
					{/* {growth !== undefined ? (
						growth >= 0 ? (
							<Flex align='center'>
								<Text color='white' fontSize='xs' fontWeight='500' me='5px'>
									+ {growth}%
								</Text>
								<Text color='White' fontSize='xs' fontWeight='100'>
									전{(day !== 'month') ? ((day !== 'week') ? '일' : '주') : '월'} 대비 변화 추이
								</Text>
							</Flex>
						) : (
							<Flex align='center'>
								<Text color='red.100' fontSize='xs' fontWeight='500' me='5px'>
									{growth}%
								</Text>
								<Text color='White' fontSize='xs' fontWeight='100'>
									전{(day !== 'month') ? ((day !== 'week') ? '일' : '주') : '월'} 대비 변화 추이
								</Text>
							</Flex>
						)
					) : null} */}
				</Stat>
				<Flex ms='auto' w='max-content'>
					{endContent}
				</Flex>
			</Flex>
		</Card>
	);
}
