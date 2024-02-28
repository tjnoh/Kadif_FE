import { Box, Flex, Text } from "@chakra-ui/react";

export default function KeywordsDetail(props: { data: any; }) {
	const { data } = props;
	return (
		<Flex w={'100%'} h={'100%'}>
            <Box w={'50%'} h={'100%'} border={'1px solid #e0e0e0'}>
                <Text fontSize={'xl'} mb={'15px'} fontWeight={'bold'}>
                    키워드 분석 결과
                </Text>
                <Box h={'95%'} overflowY={'auto'}>
                    {
                        data?.keywords.map((result:any,i:number) => {
                            const key = Object.keys(result)[0]; // 객체의 첫 번째 키를 추출
                            const value = result[key]; // 위에서 추출한 키를 사용하여 값을 추출
                            
                            return (
                                <Flex key={key} justifyContent={'space-between'} 
                                bgColor={i%2===0 ? '#E0E0E0' : 'white'}
                                h={'35px'}
                                >
                                    <Text fontSize={'md'} fontWeight={'bold'} ml={'10px'} lineHeight={'35px'}>{key}</Text>
                                    <Text fontSize={'md'} mr={'10px'} lineHeight={'35px'}>{value}</Text>
                                </Flex>
                            );
                        })
                    }
                </Box>
            </Box>
            <Box pl={'25px'} w={'50%'} border={'1px solid #e0e0e0'}>
                <Text fontSize={'xl'} mb={'15px'} fontWeight={'bold'}>키워드 총 건수</Text>
                <Flex justifyContent={'end'} mr={'25px'}>
                  <Text fontSize={'xl'} mr={'10px'} lineHeight={'160px'}>총</Text>
                  <Text fontSize={'75px'} mr={'10px'} fontWeight={'700'} color={'red'}>{data?.totalCount}</Text>
                  <Text fontSize={'xl'} lineHeight={'160px'}>건</Text>
                </Flex>
            </Box>
		</Flex>
	);
}