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
  Link,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { backIP } from 'utils/ipDomain';
import { useRouter } from 'next/navigation';

type agentSetting = {
  serverIP?: string,
  serverPort?: string,
  serverInterval?: string,
  licenseDist?: string,
  exceptionList?: string,
  keywordList?: string,
  flag: number
}

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');

  const [uid, setUid] = React.useState(0);
  const [serverIP, setServerIP] = React.useState("");
  const [serverPort, setServerPort] = React.useState("");
  const [serverInterval, setServerInterval] = React.useState(0);
  const [licenseDist, setLicenseDist] = React.useState("");
  const [exceptionList, setExceptionList] = React.useState("");
  const [keywordList, setKeywordList] = React.useState("");
  const [flag, setFlag] = React.useState(0);

  const router = useRouter();

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${backIP}/setting/agents`);
        const result = await response.json();
        console.log("result : ", result);
        setUid(result[0]?.uid);
        setServerIP(result[0]?.clnt_server_ip);
        setServerPort(result[0]?.clnt_server_port);
        setServerInterval(result[0]?.clnt_svr_att_interval);
        setLicenseDist(result[0]?.clnt_license_dist);
        setExceptionList(result[0]?.clnt_exception_list);
        setKeywordList(result[0]?.clnt_keyword_list);
        setFlag(result[0]?.flag_checkbox);
      } catch (error) {
        console.log("fetch 에러 : " + error);
      }
    }
    fetchSettings();
  }, [])


  const handleServerIPChange = (e: any) => {
    setServerIP(e.target.value);
  };

  const handleServerPortChange = (e: any) => {
    setServerPort(e.target.value);
  };

  const handleServerIntervalChange = (e: any) => {
    setServerInterval(e.target.value);
  };

  const handleLicenseDistChange = (e: any) => {
    setLicenseDist(e.target.value);
  }

  const handleExceptionListChange = (e: any) => {
    setExceptionList(e.target.value);
  };

  const handleKeywordListChange = (e: any) => {
    setKeywordList(e.target.value);
  };

  const handleCheckBoxChange = (flagValue: any) => {
    // 특정 체크박스의 값이 변경될 때 호출되는 함수
    setFlag((prevFlags) => {
      // 현재 상태의 값에 새로운 flagValue를 합쳐서 새로운 상태를 반환
      return prevFlags ^ flagValue; // XOR 연산을 사용하여 토글
    });
  };
  const isReadOnly = (flagValue: any) => {
    // 특정 flagValue에 대한 readonly 여부를 반환
    return (flag & flagValue) !== flagValue;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${backIP}/setting/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid + 1,
        serverIP: serverIP,
        serverPort: serverPort,
        serverInterval: serverInterval,
        licenseDist: licenseDist,
        exceptionList: exceptionList,
        keywordList: keywordList,
        flag: flag
      })
    })

    if (response.ok) {
      console.log("response : ", response);
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
          <form method="post" action={`${backIP}/setting/agent`}
            onSubmit={handleSubmit}>
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
                    checked={(flag & 1) === 1}
                    onChange={() => handleCheckBoxChange(1)}
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
                  onChange={handleServerIPChange}
                  readOnly={isReadOnly(1)}
                  value={serverIP}
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
                    checked={(flag & 2) === 2}
                    onChange={() => handleCheckBoxChange(2)}
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
                  onChange={handleServerPortChange}
                  readOnly={isReadOnly(2)}
                  value={serverPort}
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
                    checked={(flag & 32) === 32}
                    onChange={() => handleCheckBoxChange(32)}
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
                  onChange={handleServerIntervalChange}
                  readOnly={isReadOnly(32)}
                  value={serverInterval}
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
                    id="licenseDistChk"
                    name="licenseDistChk"
                    mr="10px"
                    checked={(flag & 8) === 8}
                    onChange={() => handleCheckBoxChange(8)}
                  ></Checkbox>
                  <Text w="120px" alignSelf="center" fontSize="md" fontWeight='600'>
                    라이센스 배포
                  </Text>
                </FormLabel>
                <Input
                  id="licenseDist"
                  name="licenseDist"
                  fontSize="sm"
                  type="text"
                  placeholder="라이센스"
                  fontWeight="500"
                  size="sm"
                  width="70%"
                  onChange={handleLicenseDistChange}
                  readOnly={isReadOnly(8)}
                  value={licenseDist}
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
                    checked={(flag & 128) === 128}
                    onChange={() => handleCheckBoxChange(128)}
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
                    checked={(flag & 16) === 16}
                    onChange={() => handleCheckBoxChange(16)}
                  ></Checkbox>
                  <Text w="120px" alignSelf="center" fontSize="md" fontWeight='600'>
                    감시 예외대역
                  </Text>
                </FormLabel>
                <Textarea
                  name="exceptionList"
                  id="exceptionList"
                  w="100%"
                  h="180px"
                  resize="none"
                  placeholder="감시 예외대역"
                  _hover={{ borderColor: 'inherit' }}
                  _focus={{ boxShadow: 'none' }}
                  onChange={handleExceptionListChange}
                  readOnly={isReadOnly(16)}
                  value={exceptionList}
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
                    checked={(flag & 64) === 64}
                    onChange={() => handleCheckBoxChange(64)}
                  ></Checkbox>
                  <Text w="125px" alignSelf="center" fontSize="md" fontWeight='600'>
                    검색 패턴/키워드
                  </Text>
                </FormLabel>
                <Textarea
                  name="keywordList"
                  id="keywordList"
                  w="100%"
                  h="180px"
                  resize="none"
                  placeholder="검색 패턴/키워드"
                  _hover={{ borderColor: 'inherit' }}
                  _focus={{ boxShadow: 'none' }}
                  onChange={handleKeywordListChange}
                  readOnly={isReadOnly(64)}
                  value={keywordList}
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
                <Link
                  href='/dashboard/default'>
                  <Button
                    type='button'
                    fontSize="lg"
                    variant="brand"
                    fontWeight="600"
                    mb="24px"
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
