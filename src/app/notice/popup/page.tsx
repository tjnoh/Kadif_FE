'use client';
/* eslint-disable */
import React from 'react';
// Chakra imports
import {
    Box, Text,

} from '@chakra-ui/react';
import { backIP } from 'utils/ipDomain';
// Custom components
// Assets

export default function SignIn() {
    // Chakra color mode
    const [notice, setNotice] = React.useState('');


    React.useEffect(() => {
        fetchNotice();
    }, [])

    const fetchNotice = async () => {
        const response = await fetch(`${backIP}/notice/popup`);
        const result = await response.json();
        setNotice(result[0].description);
    }

    return (
        <Box minW="100%" w="100%" bg={'white'} h={'90vh'}>
            <Text>{notice}</Text>
        </Box>
    );
}
