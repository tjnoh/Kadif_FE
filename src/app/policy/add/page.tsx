'use client';

import React, { useState } from 'react';
// Chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import Tree from 'views/admin/dataTables/components/Tree';
import IconBox from 'components/icons/IconBox';
import { Icon } from '@chakra-ui/icons';
import { MdOutlinePlayCircleOutline } from 'react-icons/md';

export default function SignIn() {
  const columns = [
    { Header : 'Group', accessor: 'tc_group'},
    { Header: 'TC_ID', accessor: 'tc_name' },
    { Header: '세부 보안평가 항목 명', accessor: 'tc_context' },
    { Header: 'parameter', accessor: 'tc_parameter' },
    
  ];

  const treeData = [
      {
        title : 'V2X',
        expanded : true,
        checked : true,
        children : [
          {
            id : 1,
            title : 'TC-V2X-I-01',
            subtitle : '1609.2 SPDU 서명 검증',
            checked : false
          },
          {
            id : 2,
            title : 'TC-V2X-I-02',
            subtitle : 'DE_VehicleEventFlags가 발생했을 때 IUT가 전송하는 인증서의 형태를 검증',
            checked : true
          },
          {
            id : 3,
            title : 'TC-V2X-I-03',
            subtitle : '인증서 GenerationTime값 검증',
            checked : false
          },
      ]},
      {
        title : 'IVN',
        checked : false,
        children : [
          {
            id : 4,
            title : 'TC-IVN-CAN-1',
            subtitle : '특정 CAN Bus에 정의되지 CAN ID 메시지가 전송될 경우 탐지하는지 확인',
            checked : false
          },
          {
            id : 5,
            title : 'TC-IVN-CAN-2',
            subtitle : '일치하지 않는 DLC를 가지는 CAN 메시지가 전송될 경우 탐지하는지 확인',
            checked : false
          },
          {
            id : 6,
            title : 'TC-IVN-CAN-3',
            subtitle : '메시지가 빠른 주기로 전송될 경우 탐지하는지 확인',
            checked : false
          },
      ]},
  ]

  // const data = [
  //   { id: 1, tc_group:'V2X', tc_name: '', tc_context : '', tc_parameter : '' },
  //   { id: 2, tc_group:'', tc_name: 'TC-V2X-I-01', tc_context : '1609.2 SPDU 서명 검증', tc_parameter : '' },
  //   { id: 3, tc_group:'', tc_name: 'TC-V2X-I-02', tc_context : 'DE_VehicleEventFlags가 발생했을 때 IUT가 전송하는 인증서의 형태를 검증', tc_parameter : '' },
  //   { id: 4, tc_group:'', tc_name: 'TC-V2X-I-03', tc_context : '인증서 GenerationTime값 검증', tc_parameter : '' },
  // ];

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
          <Heading m={'5px 20px'}>
            점검 정책 편집
            <Flex>
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={MdOutlinePlayCircleOutline} />
              }
            />
            </Flex>
          </Heading>
          <Flex w={'calc( 100% - 88px)'} fontSize={'md'} fontWeight={'bold'} color={'#404981'}
                    mt={'30px'}
                    ml={'44px'}
                    border={'solid 1px #bbb'}
                    py={'9px'}
                    boxShadow={'0 2px 2px -2px'}
          >
            <Box ml={'5%'} w={'11%'} h={'max-content'}>
              TP-ID
            </Box>
            <Box h={'max-content'}>
              세부 보안평가 항목 명
            </Box>            
          </Flex>
          {/* <TreeTable columns={columns} data={data} /> */}
          <Tree treeData={treeData}></Tree>
        </Box>
      </Flex>
    </Card >
  );
}
