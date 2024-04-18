'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// Chakra imports
import { Box, Button, Card, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import Tree from 'views/admin/dataTables/components/Tree';
import IconBox from 'components/icons/IconBox';
import { Icon } from '@chakra-ui/icons';
import { MdCancel, MdOutlinePlayCircleOutline } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { IoSettingsOutline } from 'react-icons/io5';
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
  const [policyName, setPolicyName] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [data, setData] = useState<[]>([]);
  const [username, setUsername] = useState();
  const [paramData, setParamData] = useState();
  const [saveFlag, setSaveFlag] = useState(false);
  const [clickParameter, setClickParameter] = useState();


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
      const cookieName:any = await getNameCookie();
      setUsername(cookieName);

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

  // policyName 변경
  function onChangePolicyName(e: React.ChangeEvent<HTMLInputElement>) {
    setPolicyName(e.target.value);
  }

    // policyDescription 변경
    function onChangePolicyDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
      setPolicyDescription(e.target.value);
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
    let checkdFlag:boolean = false;
    //정책명을 입력했는지 확인
    if(policyName !== undefined && policyName !== null && policyName !== ''){
      data.map((treeData:any) => {
        if(treeData.checked === true) {
          checkdFlag = true;
          return;
        }
      });
      //tc를 하나라도 선택하고 있는지 확인
      if(!checkdFlag){
        Swal.fire({
          title: '점검 정책 편집 오류',
          html: '<div style="font-size: 14px;">선택한 TP-ID가 없습니다.</div>',
          confirmButtonText: '닫기',
          confirmButtonColor: 'orange',
          customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              confirmButton: 'custom-confirm-button-class',
              htmlContainer: 'custom-content-class',
              container: 'custom-content-class'
          },
        });
      } else {
        const cookieName = await getNameCookie();
        await fetch(`${backIP}/policy/start?username=${cookieName}&policyname=${policyName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            policyDescription : policyDescription,
            treeData: data,
          })
        })
        .then(async (response) => {
          if(response.ok){
            const data = await response.json();
            if(data.dup){
              Swal.fire({
                title: '정책 중복 오류',
                html: `<div style="font-size: 14px;">정책명이 중복되어 저장하지 못했습니다. 다시 입력해주세요.</div>`,
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
            } else {
              router.push(`/policy/result?policyname=${policyName}&sid=${data.result}`);
            }
          } else {

          }
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
    } else {
      Swal.fire({
        title: '점검 정책 편집 오류',
        html: '<div style="font-size: 14px;">새로운 점검 정책명을 반드시 입력하세요.</div>',
        confirmButtonText: '닫기',
        confirmButtonColor: 'orange',
        customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            confirmButton: 'custom-confirm-button-class',
            htmlContainer: 'custom-content-class',
            container: 'custom-content-class'
        },
      });
    }
  }

  function onClickSave() {
    let checkdFlag:boolean = false;
    
    if(policyName !== undefined && policyName !== null && policyName !== ''){
      data.map((treeData:any) => {
        if(treeData.checked === true) {
          checkdFlag = true;
          return;
        }
      });

      // 아무런 testcase가 선택되지 않았을 시
      if(!checkdFlag) {
        Swal.fire({
          title: '점검 정책 편집 오류',
          html: '<div style="font-size: 14px;">선택한 TP-ID가 없습니다.</div>',
          confirmButtonText: '닫기',
          confirmButtonColor: 'orange',
          customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              confirmButton: 'custom-confirm-button-class',
              htmlContainer: 'custom-content-class',
              container: 'custom-content-class'
          },
        });
      } else {
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
        }).then(async (result) => {
          if (result.isConfirmed) {
            await fetch(`${backIP}/policy/insertPolicy`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                treeData: data,
                policyName : policyName,
                username : username
              })
            })
            .then((response) => {
              if(response.ok) {
                router.push('/policy/list');
              }
            })
            .catch((error:any) => {
              console.log('저장 도중 에러 발생', error);
            });
          }
        });
      }
    } else {
      Swal.fire({
        title: '점검 정책 편집 오류',
        html: '<div style="font-size: 14px;">새로운 점검 정책명을 반드시 입력하세요.</div>',
        confirmButtonText: '닫기',
        confirmButtonColor: 'orange',
        customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            confirmButton: 'custom-confirm-button-class',
            htmlContainer: 'custom-content-class',
            container: 'custom-content-class'
        },
      });
    }
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
        <Box h={'-moz-max-content'}>
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
                    onClick={handleModalOpen}
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
          <Box ml={''}>
            <Textarea m={'5px 20px'} w={'50%'} height={'80px'} fontSize={'sm'} fontWeight={'medium'} resize={'none'} placeholder='새로운 정책의 설명을 입력하세요.' value={policyDescription} onChange={onChangePolicyDescription}></Textarea>
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
          <Tree treeData={data !== undefined && data !== null ? data : ''} setTreeData={setData} onClickParameter={onClickParameter}
                modalMessage = {modalMessage} setModalMessage = {setModalMessage} chkReadOnly={false}></Tree>
          <ModalGlobalSetting isOpen={isOpenGb} onClose={onCloseGb} username={username}></ModalGlobalSetting>
          <ModalParameter isOpen={isOpenPm} onClose={onClosePm} data={paramData} clickParameter={clickParameter}></ModalParameter>
        </Box>
      </Flex>
    </Card>
  );
}
