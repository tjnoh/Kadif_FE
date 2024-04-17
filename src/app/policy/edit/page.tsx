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
import ModalGlobalSetting from 'components/policy/ModalGlobalSetting';
import ModalParameter from 'components/policy/ModalParameter';


export default function PolicyAdd() {
  const router = useRouter();
  const { isOpen:isOpenGb, onOpen:onOpenGb, onClose:onCloseGb } = useDisclosure(); // global Setting Modal
  const { isOpen:isOpenPm, onOpen:onOpenPm, onClose:onClosePm } = useDisclosure(); // parameter Setting Modal
  const [modalMessage, setModalMessage] = useState(null);
  const searchParams = useSearchParams();
  const [data, setData] = useState<[]>([]);
  const [gParameter, setGParameter] = useState();
  const [userNameCookie, setUserNameCookie] = useState<string>();
  const [username, setUsername] = useState();
  const [paramData, setParamData] = useState();
  const [clickParameter, setClickParameter] = useState();
  const policyName = searchParams.get('name');

  useEffect(() => {
    const name = searchParams.get('name');
    fetchTestCase(name);
  },[])

  const fetchTestCase = async (name: any) => {
    try {
      const cookieName:any = await getNameCookie();
      setUsername(cookieName);

      const response = await fetch(`${backIP}/policy/add?name=${name}`)
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // 전역 변수 설정
  function handleModalOpen() {
    onOpenGb();
  }

  // 파라미터 클릭
  function onClickParameter(node:any) {    
    if(!node.checked) {
      Swal.fire({
        title: '파라미터',
        html: `<div style="font-size: 14px;">체크된 항목만 파라미터 확인이 가능합니다.</div>`,
        confirmButtonText: '닫기',
        confirmButtonColor: '#EE5D50',
        focusConfirm: false,
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          loader: 'custom-content-class',
          confirmButton: 'custom-confirm-button-class'
        },
      })
      return; 
    } else if(node.tc_parameter === undefined || node.tc_parameter === null || node.tc_parameter === '[]') {
      Swal.fire({
        title: '파라미터',
        html: `<div style="font-size: 14px;">파라미터가 존재하지 않습니다.</div>`,
        confirmButtonText: '닫기',
        confirmButtonColor: '#EE5D50',
        focusConfirm: false,
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          loader: 'custom-content-class',
          confirmButton: 'custom-confirm-button-class'
        },
      })
    } else {
      setClickParameter(node);
      setParamData(JSON.parse(node.tc_parameter));
      onOpenPm();
    }
  }

  async function onClickStart() {
    const cookieName = await getNameCookie();
    await fetch(`${backIP}/policy/start?username=${cookieName}&policyname=${policyName}`)
    .then(async (response) => {
      const data = await response.json();
      router.push(`/policy/result?policyname=${policyName}&sid=${data.result}`);
    })
    .catch(() => {
      Swal.fire({
        title: '정책 테스트 시작',
        html: `<div style="font-size: 14px;">정책이 제대로 실행되지 않았습니다.</div>`,
        confirmButtonText: '닫기',
        confirmButtonColor: '#7A4C07',
        focusConfirm: false,
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          loader: 'custom-content-class',
          confirmButton: 'custom-confirm-button-class'
        },
      });
    });
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
    }).then(() => {
      // router.push('/policy/list');
    });
  }

  function onClickCancel() {
      router.push('/policy/list');
  }

  return (
    <Card height="100%">
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
            <Text m={'5px 20px'} fontSize={'3xl'} fontWeight={'bold'}>{policyName}</Text>
            <Flex h={'100%'} mr={'3%'}>
            <IconBox
                w="50px"
                h="32px"
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={IoSettingsOutline }
                    _hover={{ cursor: 'pointer' }}
                    onClick={handleModalOpen}
                  />
                }
              />
              <IconBox
                w="50px"
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
                w="50px"
                h="32px"
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdCancel}
                    color={'red.500'}
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => router.push('/policy/list')}
                  />
                }
              />
            </Flex>
          </Flex>
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
          <Tree treeData={data !== undefined && data !== null ? data : ''} setTreeData={setData} onClickParameter={onClickParameter}
                modalMessage = {modalMessage} setModalMessage = {setModalMessage} chkReadOnly={true}></Tree>
          <ModalGlobalSetting isOpen={isOpenGb} onClose={onCloseGb} username={username}></ModalGlobalSetting>
          <ModalParameter isOpen={isOpenPm} onClose={onClosePm} data={paramData} clickParameter={clickParameter}></ModalParameter>
        </Box>
      </Flex>
    </Card>
  );
}
