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

import React, { useEffect, useState } from 'react';
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
import { redirect, useRouter } from 'next/navigation';
import { backIP } from 'utils/ipDomain';
import Swal from 'sweetalert2';
import styles from "../../../styles/Swal.module.css"

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const handleUsernameChange = (e: any) => {
    const nameValue = e.target.value;
    setUsername(nameValue);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPasswd(passwordValue);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // 클라이언트 측에서 직접 API로 데이터 전송
    try {
      const response = await fetch(`${backIP}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, passwd }),
        credentials: 'include', // or 'same-origin' depending on your CORS setup
      });

      const result = await response.json();
      if (response.ok) {
        // 로그인 성공 시 넘어온 값에 따라서 바로 dashboard로 이동할지 아니면 비밀번호 변경 페이지로 이동할지
        if (result.freq) {
          router.push(`/pwd/freq?username=${result.username}`);
        } else {
          router.push('/dashboard/default');
        }
      } else {
        // 로그인 실패 시 에러 처리
        Swal.fire({
          title: '로그인 오류',
          text: '계정명 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요.',
          confirmButtonText: '닫기',
          confirmButtonColor: '#7A4C07',
          focusConfirm: false,
          customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            loader: 'custom-content-class',
            confirmButton: 'custom-confirm-button-class'
          },
        })
        // ("아이디나 비밀번호가 틀렸습니다. 다시 한번 확인해주세요");
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };

  return (
    <DefaultAuthLayout
      illustrationBackground={'/img/auth/auth.png'}
    >
      <Flex
        // maxW={{ base: '100%', md: 'max-content' }}
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
        {/* <Box me="auto"> */}
        <Box>
          <Heading color={textColor} fontSize="36px" mb="10px">
            로그인
          </Heading>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <form method='post' action={`${backIP}/user/login`} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                사용자 계정명<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                id='username'
                name='username'
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: '0px', md: '0px' }}
                type="text"
                placeholder="5자리 이상 15자 이하"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={handleUsernameChange}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                비밀번호<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id='passwd'
                  name='passwd'
                  isRequired={true}
                  fontSize="sm"
                  placeholder="비밀번호는 8자리 이상"
                  mb="24px"
                  size="lg"
                  type={show ? 'text' : 'password'}
                  variant="auth"
                  onChange={handlePasswordChange}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Button
                type='submit'
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                로그인
              </Button>
            </FormControl>
          </form>
          <Link
            href="/admin/default"
            style={{
              width: 'fit-content',
              marginTop: '40px',
            }}
          >
          </Link>
        </Flex>
      </Flex>
      {/* 여기에 모달 컴포넌트 추가해서 질문하는 */}
    </DefaultAuthLayout>
  );
}
