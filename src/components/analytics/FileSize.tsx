// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import Card from 'components/card/Card'
// Custom components
import BarChart from 'components/charts/BarChart'
import React from 'react'
import {
  FileSizeChartOptions,
  barChartDataConsumption,
} from 'variables/charts'

export default function FileSize(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <Card w='100%' borderRadius={'0px'} p={'0px'} {...rest}>
			<Flex height={'40px'} maxH={'40px'} minH={'40px'} alignSelf={'start'} width={'100%'} mt={'10px'} mb='8px' pl={'10px'} pr={'10px'}
			>
				<Text w='100%' justifySelf={'center'} lineHeight={'40px'} color={'#03619E'} fontSize={'18px'} fontWeight={900}>
						파일 사이즈
				</Text>
			</Flex>
      <Box>
          <Card p='0' height='150px'>
            <BarChart
              chartData={barChartDataConsumption}
              chartOptions={FileSizeChartOptions(["h2", "h3"])}
            />
          </Card>
      </Box>
    </Card>
  )
}
