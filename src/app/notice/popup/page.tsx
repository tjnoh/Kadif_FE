'use client';
/* eslint-disable */
import React from 'react';
// Chakra imports
import {
    Box, Button, Text,

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
        <Box mt={'5'} minW="100%" w="100%" bg={'white'} h={'85vh'} >
            <Text position={'relative'} p={'8'} minH={'30vh'}>{notice}</Text>
            <Button position={'fixed'} right={'8vh'} bgColor={'cyan.300'} bottom={'8vh'} onClick={() => window.close()}>확인</Button>
        </Box>
    );
}
