'use client';

import React, { useState } from 'react';
// Chakra imports
import {
  Alert,
  AlertIcon,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { backIP } from 'utils/ipDomain';

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');

  const decimalNumber = 17;
  const binaryString = decimalNumber.toString(2); // 십진수를 이진수 문자열로 변환
  const calcBinaryArray = binaryString.split(''); // 이진수 문자열을 배열로 분할
  const desiredLength = 8; // 원하는 배열 길이

  while (calcBinaryArray.length < desiredLength) {
    calcBinaryArray.unshift('0'); // 배열 앞에 0 추가
  }

  const [binaryArray, setBinaryArray] = useState(calcBinaryArray);

  console.log('binaryArray', binaryArray);

  const binaryJoin = binaryArray.join('');
  const convertDecimal = parseInt(binaryJoin, 2);

  console.log('convertDecimal', convertDecimal);

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
          direction="column"
          w="50%"
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <form method="post" action={`${backIP}user/login`}>
            <FormControl>
              <Flex alignContent="center" justifyContent="start" mb="24px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb="0px"
                >
                  <Checkbox
                    id="serverIpChk"
                    name="serverIpChk"
                    mr="10px"
                  ></Checkbox>
                  <Text w="120px" alignSelf="center" fontSize="md" fontWeight='600'>
                    서버 IP
                  </Text>
                </FormLabel>
                <Input
                  id="serverIp"
                  name="serverIp"
                  fontSize="sm"
                  type="text"
                  placeholder="서버 IP"
                  fontWeight="500"
                  size="sm"
                  width="70%"
                />
              </Flex>
              <Flex alignContent="center" justifyContent="start" mb="24px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb="0px"
                >
                  <Checkbox
                    id="serverPortChk"
                    name="serverPortChk"
                    mr="10px"
                  ></Checkbox>
                  <Text w="120px" alignSelf="center" fontSize="md" fontWeight='600'>
                    서버 Port
                  </Text>
                </FormLabel>
                <Input
                  id="serverPort"
                  name="serverPort"
                  fontSize="sm"
                  type="text"
                  placeholder="서버 Port"
                  fontWeight="500"
                  size="sm"
                  width="70%"
                />
              </Flex>
              <Flex alignContent="center" justifyContent="start" mb="24px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb="0px"
                >
                  <Checkbox
                    id="serverIntervalChk"
                    name="serverIntervalChk"
                    mr="10px"
                  ></Checkbox>
                  <Text w="120px" alignSelf="center" fontSize="md" fontWeight='600'>
                    서버 접속 주기
                  </Text>
                </FormLabel>
                <Input
                  id="serverInterval"
                  name="serverInterval"
                  fontSize="sm"
                  type="text"
                  placeholder="서버 접속 주기"
                  fontWeight="500"
                  size="sm"
                  width="70%"
                />
              </Flex>
              <Flex alignContent="center" justifyContent="start" mb="24px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  mb="0px"
                >
                  <Checkbox
                    id="serverIntervalChk"
                    name="serverIntervalChk"
                    mr="10px"
                  ></Checkbox>
                  <Text w="120px" alignSelf="center" fontSize="md" fontWeight='600'>
                    라이센스 배포
                  </Text>
                </FormLabel>
                <Input
                  id="serverInterval"
                  name="serverInterval"
                  fontSize="sm"
                  type="text"
                  placeholder="라이센스"
                  fontWeight="500"
                  size="sm"
                  width="70%"
                />
              </Flex>
              <Flex alignContent="center" justifyContent="start" mb="24px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="start"
                  mb="0px"
                >
                  <Checkbox
                    id="screenShotChk"
                    name="screenShotChk"
                    mr="10px"
                  ></Checkbox>
                  <Text alignSelf="center" fontSize="md" fontWeight='600'>
                    탐지 시 스크린샷 자동 생성 및 다운로드
                  </Text>
                </FormLabel>
              </Flex>
              <Flex alignContent="center" justifyContent="start" mb="24px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignSelf="start"
                  mb="0px"
                >
                  <Checkbox
                    id="exceptionListChk"
                    name="exceptionListChk"
                    mr="10px"
                  ></Checkbox>
                  <Text w="120px" alignSelf="center" fontSize="md" fontWeight='600'>
                    감시 예외대역
                  </Text>
                </FormLabel>
                <Textarea
                  name="exceptionListChk"
                  id="exceptionListChk"
                  w="100%"
                  h="180px"
                  resize="none"
                  placeholder="검색 패턴/키워드"
                  _hover={{ borderColor: 'inherit' }}
                  _focus={{ boxShadow: 'none' }}
                ></Textarea>
              </Flex>
              <Flex alignContent="center" justifyContent="start" mb="24px">
                <FormLabel
                  display="flex"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  alignContent="center"
                  alignSelf="start"
                  mb="0px"
                >
                  <Checkbox
                    id="keywordListChk"
                    name="keywordListChk"
                    mr="10px"
                  ></Checkbox>
                  <Text w="125px" alignSelf="center" fontSize="md" fontWeight='600'>
                    검색 패턴/키워드
                  </Text>
                </FormLabel>
                <Textarea
                  name="keywordListChk"
                  id="keywordListChk"
                  w="100%"
                  h="180px"
                  resize="none"
                  placeholder="검색 패턴/키워드"
                  _hover={{ borderColor: 'inherit' }}
                  _focus={{ boxShadow: 'none' }}
                ></Textarea>
              </Flex>
              <Flex mb='24px'>
                <Alert status='info' fontSize='' borderRadius='5px' fontWeight='600'>
                  <AlertIcon />
                    체크 마크하신 항목만 Agent 동기화 대상입니다. <br />
                    특히 서버 IP가 변경되면 현 Server와 Agent간 통신이 바로 차단될 수 있습니다.  
                </Alert>
              </Flex>

              <Flex justifyContent="center">
                <Button
                  type="submit"
                  fontSize="lg"
                  fontWeight="600"
                  w="30%"
                  mr="3%"
                  mb="24px"
                  variant="brand"
                >
                  Agent 설정
                </Button>
                <Button
                  type="submit"
                  fontSize="lg"
                  variant="brand"
                  fontWeight="600"
                  w="30%"
                  mb="24px"
                >
                  취소
                </Button>
              </Flex>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </Card>
  );
}
