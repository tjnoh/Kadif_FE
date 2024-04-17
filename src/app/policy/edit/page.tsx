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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState(null);
  const searchParams = useSearchParams();
  const [data, setData] = useState<[]>([]);
  const [gParameter, setGParameter] = useState();
  const [userNameCookie, setUserNameCookie] = useState<string>();
  const [username, setUsername] = useState();
  const [paramData, setParamData] = useState();
  const [clickParameter, setClickParameter] = useState();

  useEffect(() => {
    fetchGParameter();
  },[])

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
  const policyName = searchParams.get('name');

  const settingData:any = {
    'Security tool IP' : '192.168.123.253',
    'Security tool IVN Port' : 12001,
    'Security tool WAVE Port' : 12002,
    'Security tool LTE-V2X Port' : 12003,
    'Security tool LTE-UU Port' : 12004,
    'V2X DUT IP' : '192.168.123.201',
    'V2X DUT Port' : 13001,
    'IVN CAN FD' : 0
  }

  const treeData = [
    {
      tc_group: 'V2X',
      expanded: true,
      checked: true,
      children: [
        {
          tc_id: 1,
          tc_name: 'TC-V2X-I-01',
          tc_context: '1609.2 SPDU 서명 검증',
          tc_group: 'V2X',
          tc_parameter : [
            {
              name : 'a',
              type : 'number',
              value : '0',
              default : '0'
            }, 
            {
              name : 'b',
              type : 'string',
              value : '',
              default : ''
            }, 
            {
              name : 'c',
              type : 'boolean',
              value : 'false',
              default : 'false'
            }
          ],
          checked: false,
        },
        {
          tc_id: 2,
          tc_name: 'TC-V2X-I-02',
          tc_context: 'DE_VehicleEventFlags가 발생했을 때 IUT가 전송하는 인증서의 형태를 검증',
          tc_group: 'V2X',
          checked: true,
          tc_parameter : [
            {
              name : 'a',
              type : 'number',
              value : '0',
              default : '0'
            }, 
            {
              name : 'b',
              type : 'string',
              value : '',
              default : ''
            }, 
            {
              name : 'c',
              type : 'boolean',
              value : 'false',
              default : 'false'
            }
          ],
        },
        {
          tc_id: 3,
          tc_name: 'TC-V2X-I-03',
          tc_context: '인증서 GenerationTime값 검증',
          tc_group: 'V2X',
          checked: false,
        },
      ],
    },
    {
      tc_group: 'IVN',
      checked: false,
      children: [
        {
          tc_id: 4,
          tc_name: 'TC-IVN-CAN-1',
          tc_context: '특정 CAN Bus에 정의되지 CAN ID 메시지가 전송될 경우 탐지하는지 확인',
          tc_group: 'IVN',
          checked: false,
        },
        {
          tc_id: 5,
          tc_name: 'TC-IVN-CAN-2',
          tc_context: '일치하지 않는 DLC를 가지는 CAN 메시지가 전송될 경우 탐지하는지 확인',
          tc_group: 'IVN',
          checked: false,
        },
        {
          tc_id: 6,
          tc_name: 'TC-IVN-CAN-3',
          tc_context: '메시지가 빠른 주기로 전송될 경우 탐지하는지 확인',
          tc_group: 'IVN',
          checked: false,
        },
      ],
    },
  ];

  // 전역 변수 설정
  function handleModalOpen() {
    onOpen();
  }

  // 파라미터 클릭
  function onClickParameter(node:any) {    
    if(!node.checked) {
      Swal.fire({
        title: '파라미터',
        html: `<div style="font-size: 14px;">체크된 항목만 파라미터 확인이 가능합니다.</div>`,
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
      return; 
    } else if(node.tc_parameter === undefined || node.tc_parameter === null) {
      Swal.fire({
        title: '파라미터',
        html: `<div style="font-size: 14px;">파라미터가 존재하지 않습니다.</div>`,
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
    }

    setClickParameter(node);
    console.log('node.tc_parameter',node.tc_parameter);
    console.log('data',data);
    
    setParamData(node.tc_parameter);
    onOpen();
  }

  async function onClickStart() {
    const cookieName = await getNameCookie();
    // await fetch(`${backIP}/session/start?username=${cookieName}&policyname=${policyName}`)
    // .then(() => {
      router.push(`/policy/result?policyname=${policyName}`);
    // })
    // .catch(() => {
    //   Swal.fire({
    //     title: '정책 테스트 시작',
    //     html: `<div style="font-size: 14px;">정책이 제대로 실행되지 않았습니다.</div>`,
    //     confirmButtonText: '닫기',
    //     confirmButtonColor: '#7A4C07',
    //     focusConfirm: false,
    //     customClass: {
    //       popup: 'custom-popup-class',
    //       title: 'custom-title-class',
    //       loader: 'custom-content-class',
    //       confirmButton: 'custom-confirm-button-class'
    //     },
    //   });
    // });
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
    // Swal.fire({
    //   title: '정책 저장',
    //   html: '<div style="font-size: 14px;">저장하지 않고 이대로 종료하시겠습니까?</div>',
    //   confirmButtonText: '확인',
    //   cancelButtonText: '아니오',
    //   showCancelButton: true,
    //   focusConfirm: false,
    //   customClass: {
    //     popup: 'custom-popup-class',
    //     title: 'custom-title-class',
    //     htmlContainer: 'custom-content-class',
    //     container: 'custom-content-class',
    //     confirmButton: 'custom-confirm-class',
    //     cancelButton: 'custom-cancel-class',
    //   },
    // }).then((result) => {
    //   if(result.isConfirmed) {
        router.push('/policy/list');
    //   }
    // });
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
              {/* <IconBox
                w="50px"
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
              /> */}
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
          {/* <Box ml={''}>
            <Input m={'5px 20px'} w={'50%'} height={'50px'} type='text' placeholder='새로운 정책명을 입력하세요.' fontSize={'xl'} value={policyName} fontWeight={'bold'} readOnly></Input>
          </Box> */}
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
          <ModalGlobalSetting isOpen={isOpen} onClose={onClose} username={username}></ModalGlobalSetting>
          <ModalParameter isOpen={isOpen} onClose={onClose} data={paramData} clickParameter={clickParameter}></ModalParameter>

        </Box>
      </Flex>
    </Card>
  );
}
