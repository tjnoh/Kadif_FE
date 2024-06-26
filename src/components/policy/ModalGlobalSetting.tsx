// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { gParameterAlias } from 'utils/alias';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';

export default function ModalGlobalSetting(props: { isOpen: any; onClose: any; username: any; gParameter:Record<string, string>; setGParameter:any; fetchGParameter:any; }) {
  const { isOpen, onClose, username, gParameter, setGParameter, fetchGParameter } = props;
  const keys = Object.keys(gParameter);

  useEffect(() => {
    fetchGParameter();
  }, [username]);

  const handleChange = (key: string, value: string) => {
    setGParameter({
      ...gParameter,
      [key]: value,
    });
  };

  const saveGParameter = async () => {
    try {
      const response = await fetch(`${backIP}/policy/setting?username=${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            gParameter:gParameter
        })
      });
      if(response.ok){
        handleSwal();
      } else {
        const result: any = await response.json();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const initailGParameter = async () => {
    fetchGParameter();
    await onClose();
  }

  const handleSwal = () => {
    onClose();
    Swal.fire({
      title: '보안성 평가 환경설정',
      html: `<div style="font-size: 14px;">보안성 평가 환경설정을 완료하였습니다.</div>`,
      confirmButtonText: '닫기',
      confirmButtonColor: '#3965FF',
      focusConfirm: false,
      customClass: {
        popup: 'custom-popup-class',
        title: 'custom-title-class',
        loader: 'custom-content-class',
        confirmButton: 'custom-confirm-button-class'
      },
      
    });
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={'6xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text mt={'10px'} fontSize={'2xl'} fontWeight={'bold'}>보안성 평가 환경설정</Text>
          <Box border={'1px solid black'} p={'15px'} mt={'40px'}>
          {keys.map((key: any) => {
            return (
              <Flex width={'100%'} mb={'5px'} height={'25px'} key={key}>
                <Box
                  width={'25%'}
                  height={'25px'}
                  lineHeight={'25px'}
                  fontWeight={'bold'}
                >
                  {gParameterAlias[key]} :{' '}
                </Box>
                <Input
                  width={'50%'}
                  height={'25px'}
                  value={gParameter ? gParameter[key] : ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </Flex>
            );
          })}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={saveGParameter}>
            Save
          </Button>
          <Button onClick={initailGParameter}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
