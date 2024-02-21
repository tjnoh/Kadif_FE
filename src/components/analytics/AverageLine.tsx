// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import { lineChartOptionsAverage } from 'variables/charts';

export default function AverageLine(props: { [x: string]: any }) {
	const { averageData, height, ...rest } = props;

	// props가 없거나 비어있는 경우에는 기본값을 보여줍니다.
	if (!averageData || Object.keys(averageData).length === 0) {
		return <Card w='100%' h={height} mb='0px' borderRadius={'0px'} p={'0px'} {...rest} />;
	}

	const keys = Object.keys(averageData.leakEventsByAllHour).map(Number);
	const values = Object.values(averageData.leakEventsByAllHour).map(Number);
	const lineData = {
		name: "시간대별 건수",
		data: values
	}

	return (
		<Card justifyContent='center' alignItems='center' justifyItems='center' flexDirection='column' w='100%' h={rest.height} mb='0px' borderRadius={'0px'} p={'0px'} {...rest}>
			<LineChart chartData={[lineData]} chartOptions={lineChartOptionsAverage(keys)}></LineChart>
		</Card>
	);
}
