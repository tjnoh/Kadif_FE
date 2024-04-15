'use client';

import React, { useEffect, useState } from 'react';
// Chakra imports
import {
  Card,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
// Assets
import { MdOutlineRemoveRedEye, MdPlaylistAddCheckCircle } from 'react-icons/md';
import { backIP } from 'utils/ipDomain';
import { useRouter } from 'next/navigation';
import { getNameCookie } from 'utils/cookie';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import { fetchLogic } from 'utils/fetchData';

interface Column {
  Header: string;
  accessor: string;
}

interface Row {
  id: number;
  name: string;
  age: number;
  parent: string;
}

interface Props {
  columns: Column[];
  data: Row[];
}

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const [tableData, setTableData] = useState<any>();

  const router = useRouter();

  const getList = async () => {
    await fetchLogic(`policy/list`, setTableData);
  };

  useEffect(() => {
    getList();
  },[])

  // Alert 관련
  console.log('tableData',tableData);
  

  return (
    <Card height="100%" p={'8'}>
      <Flex direction="column">
        <Text fontSize="2xl" ms="24px" fontWeight="700">
          점검 정책 목록
        </Text>
        <Flex
          w="100%"
          mx={{ base: 'auto', lg: '0px' }}
          me="auto"
          h="80vh"
          justifyContent="center"
          mb={{ base: '30px', md: '20px' }}
          px={{ base: '25px', md: '0px' }}
        >
          {/* <ComplexTable tableData={tableData}></ComplexTable> */}
          <ComplexTable tableData={tableDataComplex}></ComplexTable>
        </Flex>
      </Flex>
    </Card>
  );
}