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

    const [logData, setLogData] = React.useState();

    const fetchData = async () => {
        await fetchLogic('log/all', setLogData);
        console.log("logData : ", logData);
    }

    function displayLogs(logsData: any) {
        const logContainer = document.getElementById('logContainer');

        logsData?.forEach((yearData: any) => {
            const yearElement = document.createElement('div');
            yearElement.textContent = `Year: ${yearData.year}`;
            logContainer?.appendChild(yearElement);

            yearData.data?.forEach((monthData: any) => {
                const monthElement = document.createElement('div');
                monthElement.textContent = `Month: ${monthData.month}`;
                logContainer?.appendChild(monthElement);

                monthData.data?.forEach((log: any) => {
                    const logElement = document.createElement('div');
                    logElement.textContent = `File: ${log.file}, Content: ${log.content}`;
                    logContainer?.appendChild(logElement);
                });
            });
        });
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    React.useEffect(() => {
        displayLogs(logData);
    }, [logData])
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

                </Box>
            </Flex>
        </DefaultAuthLayout>
    );
}
