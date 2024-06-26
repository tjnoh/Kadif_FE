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
  const [rows, setRows] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [tableData, setTableData] = useState<any>();
  const [userData, setUserData] = useState();

  const router = useRouter();

  const getList = async () => {
    await fetchLogic(`policy/lists`, setTableData);
  };

  const fetchDataUser = async () => {
    try {
      const response = await fetch(`${backIP}/user/privilege`, {
        credentials: 'include',
    });
    const user = await response.json();
    setUserData(user);
    } catch (error) {
      const username = await getNameCookie();
      if(username === undefined || username === null) {
        router.push('/auth/sign-in');
      } else {
        console.error('Error fetching data:', error);      
      }
    }
  }

  useEffect(() => {
      fetchDataUser();
      getList();
  },[])

  return (
    <Card height="100%" p={'8'}>
      <Flex direction="column">
        <Text fontSize="2xl" ms="24px" fontWeight="700">
        보안성 평가 정책 목록
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
          <ComplexTable tableData={tableData} setTableData={setTableData} rows={rows} setRows={setRows} page={page} setPage={setPage} userData={userData}></ComplexTable>
        </Flex>
      </Flex>
    </Card>
  );
}