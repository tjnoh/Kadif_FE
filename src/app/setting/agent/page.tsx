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
  Textarea,
  background,
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

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
                  <Text w="120px" alignSelf="center" fontSize="md">
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
                  <Text w="120px" alignSelf="center" fontSize="md">
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
                  <Text w="120px" alignSelf="center" fontSize="md">
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
                  <Text w="120px" alignSelf="center" fontSize="md">
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
                  <Text alignSelf="center" fontSize="md">
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
                  <Text w="120px" alignSelf="center" fontSize="md">
                    감시 예외대역
                  </Text>
                </FormLabel>
                <Textarea
                  name="exceptionListChk"
                  id="exceptionListChk"
                  w="100%"
                  h="180px"
                  resize="none"
                  placeholder='검색 패턴/키워드'
                  _hover={{ borderColor: 'inherit' }}
                  _focus={{ boxShadow: 'none' }}
                ></Textarea>
                {/* <Input
                  id="exceptionList"
                  name="exceptionList"
                  fontSize="sm"
                  type="text"
                  placeholder="감시 예외대역"
                  fontWeight="500"
                  size="sm"
                  width="70%"
                /> */}
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
                  <Text w="125px" alignSelf="center" fontSize="md">
                    검색 패턴/키워드
                  </Text>
                </FormLabel>
                <Textarea
                  name="keywordListChk"
                  id="keywordListChk"
                  w="100%"
                  h="180px"
                  resize="none"
                  placeholder='검색 패턴/키워드'
                  _hover={{ borderColor: 'inherit' }}
                  _focus={{ boxShadow: 'none' }}
                ></Textarea>
              </Flex>

              <Flex justifyContent="center">
                <Button
                  type="submit"
                  fontSize="sm"
                  fontWeight="500"
                  w="30%"
                  mr="3%"
                  mb="24px"
                  borderRadius='0px'
                  backgroundColor='black'
                  color='white'
                  _hover={{
                    backgroundColor:'white',
                    color:'black'
                }}
                >
                  Agent 설정
                </Button>
                <Button
                  type="submit"
                  fontSize="sm"
                //   variant="brand"
                  fontWeight="500"
                  w="30%"
                  mb="24px"                  
                //   borderRadius='0px'
                //   backgroundColor='black'
                //   color='white'
                //   _hover={{
                //     backgroundColor:'white',
                //     color:'black'
                // }}
                colorScheme='teal'
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
