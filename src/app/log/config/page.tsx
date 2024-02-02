'use client';
/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaChevronLeft } from 'react-icons/fa';
import { backIP } from 'utils/ipDomain';
import { fetchLogic } from 'utils/fetchData';

export default function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue('navy.700', 'white');

    const [years, setYears] = React.useState([]);
    const [selectYear, setSelectYear] = React.useState();
    const [months, setMonths] = React.useState([]);
    const [selectMonth, setSelectMonth] = React.useState();
    const [datas, setDatas] = React.useState([]);
    const [log, setLog] = React.useState();

    const fetchData = async () => {
        await fetchLogic('log/years', setYears);
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const handleYearChange = async (e: any) => {
        const handleYear = e.target.value;
        console.log("handleYear : ", handleYear);
        setSelectYear(handleYear);
        await fetchLogic(`log/months?year=${handleYear}`, setMonths);
        console.log("months : ", months);
    }

    const handleMonthChange = async (e: any) => {
        const handleMonth = e.target.value;
        console.log("handleMonth : ", handleMonth);
        setSelectMonth(handleMonth);
        await fetchLogic(`log/day?year=${selectYear}&month=${handleMonth}`, setDatas);
        console.log("datas : ", datas);
    }

    const getFileLog = async (e: any) => {
        const fileLog = e.target.value;
        await fetchLogic(`log/file?year=${selectYear}&month=${selectMonth}&file=${fileLog}`, setLog);
        console.log("log : ", log);
    }

    return (
        <DefaultAuthLayout
            illustrationBackground={'/img/auth/auth.png'}
        >
            <Flex
                w="100%"
                mx={{ base: 'auto', lg: '0px' }}
                me="auto"
                h="100%"
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                mb={{ base: '30px', md: '60px' }}
                px={{ base: '25px', md: '0px' }}
                mt={{ base: '40px', md: '14vh' }}
                flexDirection="column"
            >
                <Box id='logContainer'>
                    <Select id='years' onClick={handleYearChange}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                    <Select id='months' onClick={handleMonthChange}>
                        {months.map((month) => (
                            <option key={month} value={month} >
                                {month}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    {datas.map((data) => (
                        <p><button onClick={getFileLog} value={data} id={data}>{data}</button></p>
                    ))}
                </Box>
                <Box>
                    <p>{log}</p>
                </Box>
            </Flex>
        </DefaultAuthLayout>
    );
}
