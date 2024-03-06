'use client';

import React, { useEffect } from 'react';
// Chakra imports
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
// Assets
import { MdOutlineRemoveRedEye, MdPlaylistAddCheckCircle } from 'react-icons/md';
import { backIP } from 'utils/ipDomain';
import { useRouter } from 'next/navigation';
import { getNameCookie } from 'utils/cookie';

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');

  const [serverPort, setServerPort] = React.useState();
  const [ret, setRet] = React.useState();
  const [auto, setAuto] = React.useState();
  const [interval, setInterval] = React.useState();
  const router = useRouter();

  // Alert 관련
  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = React.useRef();

  React.useEffect(() => {
    fetchSettings();
  }, [])

  const fetchSettings = async () => {
    try {
      const cookieName = await getNameCookie();
      const response = await fetch(`${backIP}/setting/servers?username=${cookieName}`);
      const result = await response.json();
      setServerPort(result.serverPort);
      setRet(result.ret);
      setAuto(result.auto);
      setInterval(result.interval);
    } catch (error) {
      console.log("fetch 에러 : " + error);
    }
  }

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

  const alertOn = () => {
    setIsOpenAlert(true);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onCloseAlert();
    const cookieName = await getNameCookie();
    const response = await fetch(`${backIP}/setting/server?username=${cookieName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serverPort: serverPort,
        ret: ret,
        auto: auto,
        interval: interval
      })
    })

    if (response.ok) {
      router.push('/dashboard/default');
    } else {
      const result: any = await response.json();
      alert("에러 확인 : " + result.error);
    }
  }

  return (
    <Card height="100%">
      <Flex
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100vh"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={'250px'}
        flexDirection="column"
      >
        <Flex
          direction="column"
          w="50%"
          maxW="100%"
          background="transparent"
          
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <form>
            <FormControl border={'1px solid #ccc'} p={'10'}>
              <Flex alignContent="center" justifyContent="start" mb="40px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  // ml={'26px'}
                  mb='0px'
                >
                  <Text w="175px" alignSelf='center' fontSize="md" fontWeight='600'>
                    서버 Port
                  </Text>

                </FormLabel>
                <Flex w={'100%'}>
                  <Input
                    id="serverIp"
                    name="serverIp"
                    fontSize="sm"
                    type="text"
                    placeholder="서버 Port"
                    fontWeight="500"
                    size="sm"
                    width={{lg : '80%', base : '50%'}}
                    onChange={handleServerPort}
                    value={serverPort}
                  />
                  <Text
                    ml='10px'
                    alignSelf='center'
                    fontWeight="500"
                    size="sm"
                    w={'70px'}
                  >Port</Text>
                </Flex>
              </Flex>
              <Flex alignContent="center" justifyContent='flex-start' mb="40px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb='0px'
                  // ml={'26px'}
                >
                  <Text w="175px" alignSelf='center' fontSize="md" fontWeight='600'>
                    다운로드 파일 보관기간
                  </Text>

                </FormLabel>
                <Flex w={'100%'}>
                  <Input
                    id="serverIp"
                    name="serverIp"
                    fontSize="sm"
                    type="text"
                    placeholder="일"
                    fontWeight="500"
                    size="sm"
                    width={{lg : '80%', base : '50%'}}
                    onChange={handleRet}
                    value={ret}
                  />
                  <Text
                    ml='10px'
                    alignSelf='center'
                    fontWeight="500"
                    size="sm"
                    w={'70px'}
                  >일 보관</Text>
                </Flex>
              </Flex>
              <Flex alignContent="center" justifyContent='flex-start' mb="40px">
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
                  <Text w="100%" alignSelf='center' fontSize="md" fontWeight='600'>
                    탐지파일 서버로 자동 다운로드
                  </Text>
                </FormLabel>
              </Flex>
              <Flex alignContent="center" justifyContent='flex-start' mb="60px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb='0px'
                  // ml={'26px'}
                >
                  <Text w="175px" alignSelf='center' fontSize="md" fontWeight='600'>
                    서버 업데이트 주기
                  </Text>
                </FormLabel>
                <Flex w={'100%'}>
                  <Input
                    id="serverIp"
                    name="serverIp"
                    fontSize="sm"
                    type="text"
                    placeholder="초"
                    fontWeight="500"
                    size="sm"
                    width={{lg : '80%', base : '50%'}}
                    onChange={handleInterval}
                    value={interval}
                  />
                  <Text
                    ml='10px'
                    alignSelf='center'
                    fontWeight="500"
                    size="sm"
                    w={'70px'}
                  >초</Text>
                </Flex>
              </Flex>
              <Flex justifyContent="start" w={'100%'}>
                <Button
                  type='button'
                  fontSize="lg"
                  bgColor={'blue.500'}
                  color={'white'}
                  fontWeight="500"
                  border={'none'}
                  w="25%"
                  h="50"
                  mb="24px"
                  mt="15px"
                  mr='20px'
                  ml='20%'
                  _hover={{
                    backgroundColor: 'white',
                    color: 'blue.500',
                    borderStyle: 'solid',
                    borderColor: 'blue.500',
                    borderWidth: '1px'
                  }

                  }
                  onClick={alertOn}
                >
                  설정하기
                </Button>
                {isOpenAlert === true ? (
                  <AlertDialog
                    isOpen={isOpenAlert}
                    onClose={onCloseAlert}
                    leastDestructiveRef={cancelRef}
                  >
                    <AlertDialogOverlay display={'flex'} justifyContent={'center'} alignItems={'center'} />
                    <AlertDialogContent
                      width='500px'
                      height='150px'
                      borderRadius='15px'
                      margin={'15%'}
                    >
                      <AlertDialogBody>
                        <Flex alignContent={'center'} pt={'15px'}>
                          <MdPlaylistAddCheckCircle fontSize={'50px'} color='#FFA500'></MdPlaylistAddCheckCircle >
                          <Text fontSize={'md'} fontWeight={'500'} alignSelf={'center'} pl={'5px'}>서버 설정을 변경하시겠습니까?</Text>
                        </Flex>
                      </AlertDialogBody>
                      <AlertDialogFooter justifyContent={'center'}>
                        <Button bgColor='#FFA500' color={'white'} onClick={handleSubmit} ml={3} w={'80px'} h={'30px'}>
                          OK
                        </Button>
                        <Button ref={cancelRef} onClick={onCloseAlert} w={'80px'} h={'30px'}>
                          Cancel
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <></>
                )}
                <Link w={"25%"} onClick={() => router.back()}>
                  <Button
                    type='button'
                    fontSize="lg"
                    color={'red.300'}
                    fontWeight="500"
                    border={'1px solid red'}
                    borderColor={'red.500'}
                    w="100%"
                    h="50"
                    mb="24px"
                    mt="15px"
                    _hover={{
                      backgroundColor: 'red.500',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    취소
                  </Button>
                </Link>
              </Flex>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </Card>
  );
}