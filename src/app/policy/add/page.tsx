'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// Chakra imports
import { Box, Button, Card, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import Tree from 'views/admin/dataTables/components/Tree';
import IconBox from 'components/icons/IconBox';
import { Icon } from '@chakra-ui/icons';
import { MdCancel, MdOutlinePlayCircleOutline } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { IoSettingsOutline } from 'react-icons/io5';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { backIP } from 'utils/ipDomain';
import { getNameCookie } from 'utils/cookie';
import { fetchLogic } from 'utils/fetchData';
import { gParameterAlias } from 'utils/alias';


export default function PolicyAdd() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState(null);
  const searchParams = useSearchParams();
  const [policyName, setPolicyName] = useState('');
  const [data, setData] = useState<[]>([]);
  const [gParameter, setGParameter] = useState<Record<string, string>>({});
  const [userNameCookie, setUserNameCookie] = useState<string>();
  useEffect(() => {
    fetchGParameter();
  },[])

  useEffect(() => {
    if (searchParams.get('name') !== undefined && searchParams.get('name') !== null) {
      const name = searchParams.get('name');
      fetchTestCase(name);
    } else {
      fetchTestCase();
    }
  }, [])

  const fetchTestCase = async (name?: any) => {
    try {
      if (name !== undefined && name !== null) {
        const response = await fetch(`${backIP}/policy/add?name=${name}`)
        const data = await response.json();
        setData(data);
      } else {
        const response = await fetch(`${backIP}/policy/add`)
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchGParameter = async () => {
    const username = await getNameCookie();
    setUserNameCookie(username);
    try {
      const response = await fetch(`${backIP}/policy/gp?username=${username}`);
      const data = await response.json();
      setGParameter(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // policyName 변경
  function onChangePolicyName(e: React.ChangeEvent<HTMLInputElement>) {
    setPolicyName(e.target.value);
  }

  // 전역 변수 설정
  function onClickSetting() {
    const keys = Object.keys(gParameter);

    const handleChange = (key: string, value: string) => {
      setGParameter({
          ...gParameter,
          [key]: value
      });
    };

    const message = (
      <>
        <Text fontSize={'xl'} fontWeight={'bold'} mb={'10px'}>시스템 설정</Text>
        {
          keys.map((key: any) => {
            return (
              <Flex width={'100%'} mb={'5px'} height={'25px'} key={key}>
                <Box width={'25%'} height={'25px'} lineHeight={'25px'} fontWeight={'bold'}>{gParameterAlias[key]} : </Box>
                <Input width={'50%'} height={'25px'} value={gParameter ? gParameter[key] : ''} onChange={(e) => handleChange(key, e.target.value)} />
              </Flex>
            )
          })
        }
      </>
    );

    setModalMessage(message); // 상태 업데이트
    onOpen();
  }

  function onClickStart() {
    router.push('/policy/result');
  }

  function onClickSave() {
    Swal.fire({
      title: '정책 저장',
      html: '<div style="font-size: 14px;">현재 설정대로 정책을 저장하고자 합니다.</div>',
      confirmButtonText: '확인',
      cancelButtonText: '아니오',
      showCancelButton: true,
      focusConfirm: false,
      customClass: {
        popup: 'custom-popup-class',
        title: 'custom-title-class',
        htmlContainer: 'custom-content-class',
        container: 'custom-content-class',
        confirmButton: 'custom-confirm-class',
        cancelButton: 'custom-cancel-class',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/policy/list');
      }
    });
  }

  function onClickCancel() {
    Swal.fire({
      title: '정책 저장',
      html: '<div style="font-size: 14px;">저장하지 않고 이대로 종료하시겠습니까?</div>',
      confirmButtonText: '확인',
      cancelButtonText: '아니오',
      showCancelButton: true,
      focusConfirm: false,
      customClass: {
        popup: 'custom-popup-class',
        title: 'custom-title-class',
        htmlContainer: 'custom-content-class',
        container: 'custom-content-class',
        confirmButton: 'custom-confirm-class',
        cancelButton: 'custom-cancel-class',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/policy/list');
      }
    });
  }

  return (
    <Card height="93vh">
      <Flex
        w="100%"
        h="100%"
        minH={'85vh'}
        mb={{ base: '30px', md: '40px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '20px' }}
        flexDirection="column"
      >
        <Box>
          <Flex justifyContent={'space-between'}>
            <Text m={'5px 20px'} fontSize={'2xl'} fontWeight={'bold'}>점검 정책 편집</Text>
            <Flex h={'100%'} mr={'3%'}>
              <IconBox
                w="40px"
                h="32px"
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={IoSettingsOutline}
                    _hover={{ cursor: 'pointer' }}
                    onClick={onClickSetting}
                  />
                }
              />
              <IconBox
                w="40px"
                h="32px"
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdOutlinePlayCircleOutline}
                    _hover={{ cursor: 'pointer' }}
                    onClick={onClickStart}
                  />
                }
              />
              <IconBox
                w="40px"
                h="32px"
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={FaRegSave}
                    _hover={{ cursor: 'pointer' }}
                    onClick={onClickSave}
                  />
                }
              />
              <IconBox
                w="40px"
                h="32px"
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdCancel}
                    color={'red.500'}
                    _hover={{ cursor: 'pointer' }}
                    onClick={onClickCancel}
                  />
                }
              />
            </Flex>
          </Flex>
          <Box ml={''}>
            <Input m={'5px 20px'} w={'50%'} height={'50px'} type='text' fontSize={'md'} fontWeight={'bold'} placeholder='새로운 정책명을 입력하세요.' value={policyName} onChange={onChangePolicyName}></Input>
          </Box>
          <Flex
            w={'calc( 100% - 88px)'}
            fontSize={'md'}
            fontWeight={'bold'}
            color={'#404981'}
            mt={'30px'}
            ml={'44px'}
            py={'5px'}
          >
            <Box ml={'5%'} w={'11%'} h={'max-content'}>
              TP-ID
            </Box>
            <Box h={'max-content'}>세부 보안평가 항목 명</Box>
          </Flex>
          {/* <TreeTable columns={columns} data={data} /> */}
          <Tree treeData={data !== undefined && data !== null ? data : ''} setTreeData={setData} isOpen = {isOpen} onOpen = {onOpen} onClose = {onClose}
                modalMessage = {modalMessage} setModalMessage = {setModalMessage} chkReadOnly={false}></Tree>
        </Box>
      </Flex>
    </Card>
  );
}
