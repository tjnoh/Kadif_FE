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
    Select,
    Text,
    Textarea,
    useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { getNameCookie } from 'utils/cookie';
import { useRouter } from 'next/navigation';
import { backIP } from 'utils/ipDomain';
import { userSwal } from 'components/swal/customSwal';
import Swal from 'sweetalert2';

export default function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const brandStars = useColorModeValue('brand.500', 'brand.400');
    const [show, setShow] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [passwd, setPasswd] = React.useState('');
    const [passwdChk, setPasswdChk] = React.useState('');
    const [privilege, setPrivilege] = React.useState('2');
    const [cookieName, setCookieName] = React.useState('');
    const router = useRouter();

    React.useEffect(() => {
        const fetchPrivilege = async () => {
            const response = await fetch(`${backIP}/user/privilege`, {
                credentials: 'include',
            });
            const data = await response.json();
            if (data[0]?.privilege !== 1) {
                Swal.fire({
                    title: '사용자 추가 페이지 오류',
                    html: '<div style="font-size: 14px;">당신은 유저 계정이라 접속이 불가능합니다.</div>',
                    confirmButtonText: '닫기',
                    confirmButtonColor: 'orange',
                    customClass: {
                        popup: 'custom-popup-class',
                        title: 'custom-title-class',
                        confirmButton: 'custom-confirm-button-class',
                        htmlContainer: 'custom-content-class',
                        container: 'custom-content-class'
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/policy/list')
                    }
                });
            } else {
                setCookieName(data[0].username);
            }
        }
        fetchPrivilege();
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

    const handlePrivilegeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPrivilege = e.target.value;
        setPrivilege(selectedPrivilege);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/;
        // 폼 제출 시 사용자 계정명과 비밀번호의 길이를 다시 확인

        if (username.length < 5 || username.length > 15) {
            userSwal(1, 'new');
            event.preventDefault();
        } else if (!passwordRegex.test(passwd)) {
            userSwal(2, 'new');
            event.preventDefault();
        } else if (passwd !== passwdChk) {
            //비밀번호와 비밀번호 확인을 비교하여 같으면 통과
            userSwal(3, 'new');
            event.preventDefault();
        } else {
            try {
                Swal.fire({
                    title: '사용자 계정 생성',
                    html: `<div style="font-size: 14px;">정말 이대로 계정을 생성하시겠습니까?</div>`,
                    confirmButtonText: '생성',
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
                        if (result.isConfirmed) {
                            const response = await fetch(`${backIP}/user/add`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    username: username,
                                    password: passwd,
                                    privilege: privilege,
                                    cookie: cookieName,
                                })
                            });
                            if (response.ok) {
                                router.push('/users/control');
                            } else {
                                const result: any = await response.json();
                                userSwal(99, 'new', '#d33', result.message);
                            }
                        } else {

                        }
                    })
            } catch (error) {
                alert("에러 확인 : " + error);
            }
        }
    };

    return (
        <Card
            flexDirection="column"
            px="0px"
            overflowX={'hidden'}
            m='0 auto'
            height='93vh'
            borderRadius={'0px'}
        >
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
                mt={{ base: '40px', md: '5vh' }}
                flexDirection="column"
            >
                <Box w={'550px'} mb={'5'}>
                    <Heading textAlign={'center'} color={textColor} fontSize="36px" mb={'10'}>
                        사용자 계정 추가
                    </Heading>
                </Box>
                <Flex
                    zIndex="2"
                    direction="column"
                    w={{ base: '100%', md: '550px' }}
                    maxW="100%"
                    background="transparent"
                    borderRadius="15px"
                    m={'0 auto'}
                    border={'1px solid #ccc'}
                    p={'5'}
                    pb={'3'}
                >
                    <form method='post' action={`${backIP}/user/add`}
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
                                id="privilege"
                                name="privilege"
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                                onChange={handlePrivilegeChange}
                            >
                                {<option value="2">유저</option>}
                            </Select>
                        </FormControl>
                    </form>
                </Flex>
                <Flex w={'100%'} justifyContent={'center'} mt={'4'}>
                    <Button
                        type='submit'
                        fontSize="12px"
                        bgColor={"white"}
                        color={'#aaa'}
                        border={'1px solid #ccc'}
                        _focus={{ boxShadow: 'none' }}
                        _active={{ boxShadow: 'none' }}
                        borderRadius={'md'}
                        w="80px"
                        h="25px"
                        p={'3'}
                        onClick={handleSubmit}
                    >
                        추가
                    </Button>
                    <Button
                        type='button'
                        fontSize="12px"
                        bgColor={"white"}
                        color={'black'}
                        border={'1px solid #ccc'}
                        outline={'none'}
                        _focus={{ boxShadow: 'none' }}
                        _active={{ boxShadow: 'none' }}
                        borderRadius={'md'}
                        onClick={() => router.back()}
                        w="80px"
                        h="25px"
                        p={'3'}
                        ml={'2'}
                    >
                        취소
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
}
