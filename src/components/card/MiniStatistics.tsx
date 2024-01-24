// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

export default function Default(props: {
	startContent?: JSX.Element;
	endContent?: JSX.Element;
	name?: string;
	growth?: number;
	value: string | number;
	day?: string;
}) {
	const { startContent, endContent, name, growth, value, day } = props;
	const textColor = useColorModeValue('White', 'white');
	const textColorSecondary = 'white';

	return (
		<Card py='15px'
			backgroundColor='blue'>
			<Flex
				my='auto'
				h='100%'
				align={{ base: 'center', xl: 'center' }}
				justify={{ base: 'center', xl: 'center' }}>
				{startContent}

				<Stat my='auto' ms={startContent ? '18px' : '0px'}>
					<StatLabel
						lineHeight='100%'
						color={textColorSecondary}
						fontSize={{
							base: 'sm'
						}}>
						{(day !== 'month') ? ((day !== 'week') ? '금일' : '금주') : '금월'} {name}
					</StatLabel>
					<StatNumber
						color={textColor}
						fontSize={{
							base: '2xl'
						}}>
						{value}
					</StatNumber>
					{growth !== undefined ? (
						growth >= 0  ? (
							<Flex align='center'>
								<Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
									+ {growth}%
								</Text>
								<Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
									전{(day !== 'month') ? ((day !== 'week') ? '일' : '주') : '월'} 대비 변화 추이
								</Text>
							</Flex>
						) : (
							<Flex align='center'>
								<Text color='red.500' fontSize='xs' fontWeight='700' me='5px'>
									{growth}%
								</Text>
								<Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
									전{(day !== 'month') ? ((day !== 'week') ? '일' : '주') : '월'} 대비 변화 추이
								</Text>
							</Flex>
						)
					) : null}
				</Stat>
				<Flex ms='auto' w='max-content'>
					{endContent}
				</Flex>
			</Flex>
		</Card>
	);
}
