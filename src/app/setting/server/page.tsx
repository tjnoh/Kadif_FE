'use client';

import React from 'react';
// Chakra imports
import {
  Box,
  Button,
  Card,
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
import { useRouter } from 'next/navigation';

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [serverPort, setServerPort] = React.useState();
  const [ret, setRet] = React.useState();
  const [auto, setAuto] = React.useState();
  const [interval, setInterval] = React.useState();

  const router = useRouter();

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${backIP}/setting/servers`);
        const result = await response.json();
        console.log("result : ",result);
        setServerPort(result.serverPort);
        setRet(result.ret);
        setAuto(result.auto);
        setInterval(result.interval);
      } catch (error) {
        console.log("fetch 에러 : " + error);
      }
    }
    fetchSettings();
  }, [])

  const handleServerPort = (e: any) => {
    const portValue = e.target.value;
    setServerPort(portValue);
  }

  const handleRet = (e: any) => {
    const retValue = e.target.value;
    setRet(retValue);
  }

  const handleauto = (e: any) => {
    const isChecked = e.target.checked;
    setAuto(isChecked);
  }

  const handleInterval = (e: any) => {
    const intervalValue = e.target.value;
    setInterval(intervalValue);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${backIP}/setting/server`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serverPort: serverPort,
        ret: ret,
        auto: auto,
        interval:interval
      })
    })

    if(response.ok){
      console.log("업데이트 잘 되었나봐용?");
      router.push('/dashboard/default');
    } else {
      const result:any = await response.json();
      alert("에러 확인 : "+result.error);
    }
  }

  return (
    <Card height="100%">
      <Flex
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="75vh"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '100px' }}
        flexDirection="column"
      >
        <Flex
          // zIndex="2"
          direction="column"
          w="60%"
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
        // mb={{ base: '20px', md: 'auto' }}
        >
          <form method="post" action={'http://localhost:8000/setting/server'}
            onSubmit={handleSubmit}>
            <FormControl>
              <Flex
                width='100%'
                alignContent="center" justifyContent='flex-start' mb='24px'>
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb='0px'
                >
                  <Text w="165px" alignSelf='center' fontSize="md">
                    서버 Port
                  </Text>

                </FormLabel>
                <Input
                  id="serverIp"
                  name="serverIp"
                  fontSize="sm"
                  type="text"
                  placeholder="서버 Port"
                  fontWeight="500"
                  size="sm"
                  width='50%'
                  onChange={handleServerPort}
                  value={serverPort}
                />
                <Text
                  ml='10px'
                  alignSelf='center'
                  fontWeight="500"
                  size="sm"
                >Port</Text>
              </Flex>
              <Flex alignContent="center" justifyContent='flex-start' mb='24px'>
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb='0px'
                >
                  <Text w="165px" alignSelf='center' fontSize="md">
                    다운로드 파일 보관기간
                  </Text>

                </FormLabel>
                <Input
                  id="serverIp"
                  name="serverIp"
                  fontSize="sm"
                  type="text"
                  placeholder="일"
                  fontWeight="500"
                  size="sm"
                  width='50%'
                  onChange={handleRet}
                  value={ret}
                />
                <Text
                  ml='10px'
                  alignSelf='center'
                  fontWeight="500"
                  size="sm"
                >일 보관</Text>
              </Flex>
              <Flex alignContent="center" justifyContent='flex-start' mb='24px'>
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb='0px'
                >
                  <Checkbox mr='10px'
                    onChange={handleauto}
                    isChecked={auto}></Checkbox>
                  <Text w="100%" alignSelf='center' fontSize="md">
                    탐지파일 서버로 자동 다운로드
                  </Text>
                </FormLabel>
              </Flex>
              <Flex alignContent="center" justifyContent='flex-start' mb='24px'>
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb='0px'
                >
                  <Text w="165px" alignSelf='center' fontSize="md">
                    서버 업데이트 주기
                  </Text>
                </FormLabel>
                <Input
                  id="serverIp"
                  name="serverIp"
                  fontSize="sm"
                  type="text"
                  placeholder="초"
                  fontWeight="500"
                  size="sm"
                  width='50%'
                  onChange={handleInterval}
                  value={interval}
                />
                <Text
                  ml='10px'
                  alignSelf='center'
                  fontWeight="500"
                  size="sm"
                >초</Text>
              </Flex>
              <Button
                type='submit'
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="25%"
                h="50"
                mb="24px"
                mt="15px"
                mr='20px'
                ml='10%'
              >
                설정하기
              </Button>
              <Link
                href='/dashboard/default'>
                <Button
                  type='button'
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="25%"
                  h="50"
                  mb="24px"
                  mt="15px"
                >
                  취소
                </Button>
              </Link>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </Card>
  );
}