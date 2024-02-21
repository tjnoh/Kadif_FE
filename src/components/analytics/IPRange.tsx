'use client';
import { ChangeEvent, useState } from 'react';
import { Text, Icon, Heading, Input, InputGroup, Flex, Badge, FormLabel, Textarea, Box } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
// Chakra imports
// Custom components
import Card from 'components/card/Card';
import { RiH3 } from 'react-icons/ri';

export default function IPRangeBox(props: { ipRange: any, setIpRange: any }) {
    const { ipRange, setIpRange } = props

    const handleIpRangeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setIpRange(event.target.value);
    };

    return (
        <Card
            mt={'5'}
            mb={'5'}
            justifyContent={'flex-start'}
            justifyItems={'baseline'}
            flexDirection="row"
            w="100%"
            maxW="100vw"
            p="20px 15px"
            h="max-content"
        >
            <>IP 대역폭 선택</>
            <Flex ml={'2vw'}>
                <FormLabel
                    height={'100%'}
                    ms="4px"
                    display="flex"
                    alignItems={'center'}
                >
                    IP 입력<Text fontSize={'12px'}>: </Text></FormLabel>
                <Box h={'100%'}>
                    <Textarea w={{ base: '70vw', md: '65vw', sm: '25vw' }} height={'50px'} value={ipRange} onChange={handleIpRangeChange} overflowY={'scroll'} resize={'none'}  />
                    <Text color='black' fontSize={'12px'} w={{ base: '70vw', md: '65vw', sm: '25vw' }}>
                    ☞ 입력형식 : CIDR 혹은 Range(라인단위 IP범위), 입력 예) CIDR형식 : 192.168.0.0/16, Range형식 : 192.168.10.1-192.168.10.254
                    </Text>
                </Box>
            </Flex>
        </Card>
    );

}
