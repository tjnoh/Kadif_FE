'use client';
/* eslint-disable */

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
  const [oldPwd, setOldPwd] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [passwdChk, setPasswdChk] = React.useState('');
  const [oldName, setOldName] = React.useState('');
  const router = useRouter();
  const username = useParams();

  const handleClick = () => setShow(!show);

  const handleOldPwdChange = (e: any) => {
    const nameValue = e.target.value;
    setOldPwd(nameValue);
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

    if (!passwordRegex.test(passwd)) {
      Swal.fire({
        title: '계정 수정 오류',
        html: '<div style="font-size: 14px;">비밀번호 조건이 맞지 않습니다.</div>',
        confirmButtonText: '닫기',
        confirmButtonColor: 'orange',
        focusConfirm: false,
        customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            htmlContainer: 'custom-content-class',
            container: 'custom-content-class'
        },
      });
      event.preventDefault();
    } else if (passwd !== passwdChk) {
      //비밀번호와 비밀번호 확인을 비교하여 같으면 통과
      Swal.fire({
        title: '계정 수정 오류',
        html: '<div style="font-size: 14px;">비밀번호 확인이 틀렸습니다.</div>',
        confirmButtonText: '닫기',
        confirmButtonColor: 'orange',
        focusConfirm: false,
        customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            htmlContainer: 'custom-content-class',
            container: 'custom-content-class'
        },
      });
      event.preventDefault();
    } else {
      try {
        const response = await fetch(`${backIP}/user/pwd?username=${username}`, {
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
        Swal.fire({
          title: '계정 수정 오류',
          html: '<div style="font-size: 14px;">현재 비밀번호가 일치하지 않습니다.</div>',
          confirmButtonText: '닫기',
          confirmButtonColor: 'orange',
          focusConfirm: false,
          customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              htmlContainer: 'custom-content-class',
              container: 'custom-content-class'
          },
        });
      }
    }
  };

  return (
    // <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
      <Flex alignContent={'center'} justifyContent={'center'} w={'100vw'} h="100vh">
        <Flex
          w="30%"
          mt={'5%'}
          h={'70%'}          
          alignContent="flex-start"
          justifyContent="flex-start"
          flexDirection="column"
          backgroundColor={'white'}
        >
          <Box mt={'5%'} mb="15px" pl={'5%'}>
            <Text color={textColor} fontSize={'2xl'} fontWeight={'700'}>
              비밀번호 변경
            </Text>
          </Box>
          <Box mb="40px" pl={'5%'}>
            <Text color={textColor} fontSize={'sm'}>
              보다 안전한 서비스 이용을 위해 비밀번호를 변경하세요.
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={'100%'}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            alignContent={'center'}
            justifyItems={'center'}
            me="auto"
            mb={{ base: '20px', md: 'auto' }}
          >
            <form method='post' action={`${backIP}/profile/update/${oldName}`}
              onSubmit={handleSubmit} style={{alignItems:'center', justifyItems:'center'}}>
              <FormControl w={'75%'} justifySelf={'center'} margin={'0 auto'}>
                <InputGroup size="md">
                  <Input
                    id='oldpasswd'
                    name='oldpasswd'
                    isRequired={true}
                    fontSize="sm"
                    placeholder='현재 비밀번호'
                    mb="24px"
                    size="lg"
                    type={show ? 'text' : 'password'}
                    variant="auth"
                    onChange={handleOldPwdChange}
                    value={oldPwd}
                    
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
                <InputGroup size="md">
                  <Input
                    id='passwd'
                    name='passwd'
                    isRequired={true}
                    fontSize="sm"
                    placeholder='새 비밀번호'
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
                <InputGroup size="md">
                  <Input
                    id='passwdChk'
                    name='passwdChk'
                    isRequired={true}
                    fontSize="sm"
                    placeholder='새 비밀번호 확인'
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
                <Button
                  type='submit'
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w={'100%'}
                  h="50"
                  mb="24px"
                  mt="15px"
                  mr='20px'
  
                >
                  변경하기
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Flex>
    // </DefaultAuthLayout>
  );
}
