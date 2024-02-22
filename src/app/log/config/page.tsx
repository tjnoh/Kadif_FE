'use client';
/* eslint-disable */
import React from 'react';
// Chakra imports
import {
    Box,
    Button,
    Flex,
    Heading,
    Select,
} from '@chakra-ui/react';
// Custom components
// Assets
import { fetchLogic } from 'utils/fetchData';

export default function SignIn() {
    // Chakra color mode
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const [years, setYears] = React.useState([currentYear]);
    const [selectYear, setSelectYear] = React.useState();
    const [months, setMonths] = React.useState([currentMonth]);
    const [selectMonth, setSelectMonth] = React.useState();
    const [datas, setDatas] = React.useState([]);
    const [selectData, setSelectData] = React.useState();
    const [log, setLog] = React.useState();
    const [show, setShow] = React.useState(true);
    const [average, setAverage] = React.useState();

    const fetchData = async () => {
        await fetchLogic('log/years', setYears);
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const handleYearChange = async (e: any) => {
        const handleYear = e.target.value;
        setSelectYear(handleYear);
        await fetchLogic(`log/months?year=${handleYear}`, setMonths);
    }

    const handleMonthChange = async (e: any) => {
        const handleMonth = e.target.value;
        setSelectMonth(handleMonth);
        await fetchLogic(`log/day?year=${selectYear}&month=${handleMonth}`, setDatas);
    }

    const getFileLog = async (e: any) => {
        const fileLog = e.target.value;
        setSelectData(fileLog);
        await fetchLogic(`log/file?year=${selectYear}&month=${selectMonth}&file=${fileLog}`, setLog);
        setShow(false);
    }

    return (
        <Box minW="100%" w="100%" bg={'white'} h={'90vh'}>
            <Flex
                w="100%"
                me="auto"
                h="100%"
                alignContent="center"
                alignItems="flex-start"
                px={{ base: '25px', md: '0px' }}
                flexDirection="column"
            >
                <Flex flexDirection={'row'} id='logContainer' display={show ? "inline-flex" : "none"} p={'10'}>
                    <Select id='years' onClick={handleYearChange} w={'10vw'}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                    <Select id='months' onClick={handleMonthChange} w={'50%'} display={selectYear !== undefined ? "" : "none"}>
                        {months.map((month) => (
                            <option key={month} value={month} >
                                {month}
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Box display={show ? "block" : "none"} px={'10'}>
                    {datas.map((data) => (
                        <p key={data}><Button borderRadius={'md'} onClick={getFileLog} value={data} id={data}>{data}</Button></p>
                    ))}
                </Box>
                <Box width={'90vw'} p={'10'} fontSize={'smaller'} maxW={"100%"} maxH={"80%"} display={!show ? "block" : "none"}>
                    <Heading as="h2" size="lg" mb={4}>{selectData}</Heading>
                    <Button id={selectData} value={selectData} onClick={() => window.location.reload()}>년도 선택</Button>
                    <Box pt={'5'} style={{ whiteSpace: 'pre-wrap', overflowY: 'auto', maxHeight: '70vh' }}>{log}</Box>
                </Box>

            </Flex>
        </Box>
    );
}
