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
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { MdLock, MdOutlineRemoveRedEye, MdPersonOutline } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { backIP, frontIP } from 'utils/ipDomain';
import Swal from 'sweetalert2';
import styles from "../../../styles/Swal.module.css"
import { userSwal } from 'components/swal/customSwal';

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [show, setShow] = React.useState(false);
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [passwdChk, setPasswdChk] = React.useState('');
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

  const handlePasswdChkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwdChkValue = e.target.value;
    //비밀번호 확인을 state에 저장시키기
    setPasswdChk(pwdChkValue);

  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/;
    // 폼 제출 시 사용자 계정명과 비밀번호의 길이 및 조건 확인

    if(username.length < 5 || username.length > 15){
      userSwal(1, 'new');
      event.preventDefault();
    } else if (!passwordRegex.test(passwd)){
      userSwal(2, 'new');
      event.preventDefault();
    } else if (passwd !== passwdChk){
      userSwal(3, 'new');
      event.preventDefault();
    } else {
      try {
        Swal.fire({
          title: '회원가입',
          html: `<div style="font-size: 14px;">정말 이대로 회원가입을 진행하시겠습니까?</div>`,
          confirmButtonText: '회원가입',
          confirmButtonColor: 'orange',
          focusConfirm: false,
          cancelButtonText: '닫기',
          showCancelButton: true,
          customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              htmlContainer: 'custom-content-class',
              container: 'custom-content-class',
              confirmButton: 'custom-confirm-button-class'
          },
      })
      .then(async (result) => {
        if(result.isConfirmed){
          const response = await fetch(`${backIP}/user/sign-up`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, passwd, privilege:3, ip_ranges:'172.31.168.0-172.31.168.220' }),
            credentials: 'include', // or 'same-origin' depending on your CORS setup
          });

          if(response.ok){
            router.push('/auth/sign-in');
          } else {
            const result = await response.json();
            userSwal(99, 'new', '#d33', result.error);
          }
        } else {

        }
      })
      } catch (error) {
        console.error('회원가입 오류:', error);
      }
    }
  };

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
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '10vh' }}
        flexDirection="column"
      >
        <Box>
          <Heading color={textColor} fontSize="40px" mb="25px">
            회원가입
          </Heading>
        </Box>
        <Flex
          // alignContent="center"
          // alignItems="center"
          // justifyContent="center"
          // zIndex="2"
          // direction="column"
          w={{ base: '100%', md: '500px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          // mx={{ base: 'auto', lg: 'unset', md: '-10vw' }}
          // me="auto"
          // mb={{ base: '20px', md: '15vh' }}
          h={'100%'}
        >
          <form method='post' action={`${backIP}/user/add`} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
                mt={'10vh'}
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
                placeholder="최소 5자 이상 최대 15자 이하"
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
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                비밀번호 확인<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id='passwdChk'
                  name='passwdChk'
                  isRequired={true}
                  fontSize="sm"
                  placeholder="비밀번호를 다시 한번 입력해주세요"
                  mb="10vh"
                  size="lg"
                  type={show ? 'text' : 'password'}
                  variant="auth"
                  onChange={handlePasswdChkChange}
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
                fontSize="larger"
                variant="blue"
                fontWeight="500"
                w="45%"
                h="50"
                mb="24px"
                mr={'5'}
                borderRadius={'md'}
              >
                회원가입
              </Button>
              <Button
                type='button'
                fontSize="larger"
                variant="red"
                fontWeight="500"
                backgroundColor={'red.400'}
                w="45%"
                h="50"
                mb="24px"
                ml={'5'}
                borderRadius={'md'}
                color={'white'}
                onClick={()=> router.push('/auth/sign-in')}
              >
                취소
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
