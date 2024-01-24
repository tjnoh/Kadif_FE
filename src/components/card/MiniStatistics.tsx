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

	let titleName = '';
	name === 'network' ? titleName = '총 네트워크 유출 건수' : (name === 'outlook' ? titleName = '총 Outlook 메일 유출 건수' : (name === 'media' ? titleName = '총 이동식 저장매체 유출 건수' : titleName = '총 프린터 인쇄 건수'))

	return (
		// background: linear-gradient(to right, #FF0000, #FF9898);
		<Card py={'0px'} background={name === 'network' ? 'linear-gradient(to right, #272263, #0000ff)' 
		: (name === 'media' ? 'linear-gradient(to right, #dd1155, #fff000)' : (name === 'outlook' ? 'linear-gradient(to right, #00dd00, #ffff00)' 
		: 'linear-gradient(to right, #0ddddd, #f0f000)'))}>
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
							base: 'md'
						}}
						p={'5px'}
						fontWeight={'700'}
						>
						{(day !== 'month') ? ((day !== 'week') ? '금일' : '금주') : '금월'} {titleName}
					</StatLabel>
					<StatNumber
						color={textColor}
						fontSize={{
							base: 'xl'
						}}
						pl={"10px"}
						>
						{value}
					</StatNumber>
					{growth !== undefined ? (
						growth >= 0 ? (
							<Flex align='center'>
								<Text color='white' fontSize='xs' fontWeight='700' me='5px'>
									+ {growth}%
								</Text>
								<Text color='White' fontSize='xs' fontWeight='400'>
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
