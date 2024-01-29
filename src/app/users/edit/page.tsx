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
  Select,
  Text,
  Textarea,
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
import { fetchLogic } from 'utils/fetchData';
import { useParams, useRouter } from 'next/navigation';
import { getCookie, getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import Swal from 'sweetalert2';

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [passwdChk, setPasswdChk] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [mngRange, setMngRange] = React.useState('');
  const [oldName, setOldName] = React.useState('');
  const router = useRouter();
  React.useEffect(() => {
    getNameCookie().then((userNameCookie) => {
      console.log("username 제발:", userNameCookie);

      if (userNameCookie) {
        fetch(`${backIP}/profile/edit/` + userNameCookie)
          .then((response) => response.json())
          .then((result) => {
            console.log("result : ", result);
            setUsername(result[0].username);
            setOldName(result[0].username);
            setPasswd(result[0].passwd);
            setGrade(result[0].grade);
            setMngRange(result[0].mng_ip_ranges);
          })
          .catch((error) => {
            console.log('error 발생 : ' + error);
          });
      }
    });
  }, []);

  const handleClick = () => setShow(!show);

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
    // 폼 제출 시 사용자 계정명과 비밀번호의 길이를 다시 확인
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (username.length < 5 || username.length > 15) {
      Swal.fire({
        title: '계정 수정 오류',
        text: '사용자 계정명은 5자 이상, 15자 이하이어야 합니다.',
        icon: 'warning',
        confirmButtonText: '닫기',
        confirmButtonColor: 'orange',
        focusConfirm: false,
      });
      event.preventDefault();
    } else if (!passwordRegex.test(passwd)) {
      Swal.fire({
        title: '계정 수정 오류',
        text: '비밀번호 조건이 맞지 않습니다.',
        icon: 'warning',
        confirmButtonText: '닫기',
        confirmButtonColor: 'orange',
        focusConfirm: false,
      });
      event.preventDefault();
    } else if (passwd !== passwdChk) {
      //비밀번호와 비밀번호 확인을 비교하여 같으면 통과
      Swal.fire({
        title: '계정 수정 오류',
        text: '비밀번호 확인이 틀렸습니다.',
        icon: 'warning',
        confirmButtonText: '닫기',
        confirmButtonColor: 'orange',
        focusConfirm: false,
      });
      event.preventDefault();
    } else {
      try {
        const response = await fetch(`${backIP}/profile/update/${oldName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            passwd: passwd,
          })
        })

        if (response.ok) {
          router.push('/profile/logout');
        } else {
          const result: any = await response.json();
          Swal.fire({
            title: '계정 수정 에러',
            text: `${result.error}`,
            icon: 'error',
            confirmButtonText: '닫기',
            confirmButtonColor: '#d33',
            focusConfirm: false,
          });
        }
      } catch (error) {
        alert("에러 확인 : " + error);
      }
    }
  };

  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'} >
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
        <Box>
          <Heading color={textColor} fontSize="36px" mb="40px">
            개인 정보 수정
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
          <form method='post' action={`${backIP}/profile/update/${oldName}`}
            onSubmit={handleSubmit}>
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
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={handleUsernameChange}
                value={username}
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
                  value={passwd}
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
                  mb="24px"
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
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                사용자 권한<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                id="grade"
                name="grade"
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: '0px', md: '0px' }}
                mb="24px"
                fontWeight="500"
                size="lg"
                value={grade}
                isReadOnly
                style={{ pointerEvents: 'none', userSelect: 'none', cursor: 'default' }}
                _hover={{ borderColor: 'inherit' }}
                _focus={{ boxShadow: 'none' }}
                backgroundColor={"#DDDDDD"}
                color={"#555555"}
              >
                {/* 여기에 옵션을 추가합니다 */}
                <option value="1">관리자</option>
                <option value="2">영역별 관리자</option>
                <option value="3">모니터</option>
              </Select>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                관리 대역 설정<Text color={brandStars}>*</Text>
              </FormLabel>
              <Textarea
                name='mng_ip_ranges'
                id='mng_ip_ranges'
                w='100%'
                h='180px'
                resize='none'
                value={mngRange}
                readOnly
                style={{ pointerEvents: 'none', userSelect: 'none', cursor: 'default' }}
                _hover={{ borderColor: 'inherit' }}
                _focus={{ boxShadow: 'none' }}
                backgroundColor={"#DDDDDD"}
                color={"#555555"}
              >

              </Textarea>
              <Button
                type='submit'
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="45%"
                h="50"
                mb="24px"
                mt="15px"
                mr='20px'

              >
                수정하기
              </Button>
              <Link
                href='/dashboard/default'>
                <Button
                  type='button'
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="45%"
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
    </DefaultAuthLayout>
  );
}
