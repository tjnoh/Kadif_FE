"use client"
import { Box, Card, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import { fetchLogic } from 'utils/fetchData';
import PolicyLog from 'views/admin/dataTables/components/PolicyLog';
import PolicyActive from 'views/admin/dataTables/components/PolicyActive';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck';
// import { useRouter } from 'next/router';

export default function DataTables() {
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [data, setData] = useState<[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [search, setSearch] = React.useState('');                           // search Category
  const search = useRef('');                                                // search Category
  const [searchResult, setSearchResult] = React.useState('');               // 검색어
  const [searchComfirm, setSearchComfirm] = React.useState<boolean>(false); // search 돋보기 버튼

  const intervalId = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tab, setTab] = useState(1)

  const handleTabChange = (value: any) => {
    setTab(value);
  }
  
  const fetchData = async () => {
    
    try {
      await fetch(`${backIP}/session/data?sessionname=${searchParams.get('name')}&policyname=${searchParams.get('policy')}`);
    } catch (error) {
      console.log("데이터 가져오기 실패 : ", error);
    }
  };

  useEffect(() => {
    fetchData()
  },[]);

  return (
    <Card p={'8'} h={'93vh'} minH={'85vh'} maxH={'93vh'}>
      <Flex direction="column">
          <Text fontSize="2xl" ms="24px" fontWeight="700">
            {searchParams.get('name')}
          </Text>
        <Flex
          mt="45px"
          justifyContent="start"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          <Flex
            align="center"
            me="20px"
            cursor='pointer'
          >
            <Box
              onClick={() => handleTabChange(1)}
              fontWeight={tab === 1 ? '700' : '500'}
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}
              backgroundColor={tab === 1 ? 'white' : '#eee'}
              color={tab === 1 ? '#3DA2EE' : '#939CA9'}
              border={tab === 1 ? '0.5px solid #3DA2EE' : undefined}
              borderBottom={tab === 1 ? '2px solid #3DA2EE' : '2px solid #939CA9'}
              _hover={{
                fontWeight: '700',
                background: 'white',
                border: '0.5px solid #3DA2EE',
                borderBottom: '2px solid #3DA2EE',
                color: '#3DA2EE'
              }}
            >
              정책 진행 내역
            </Box>
            <Box
              onClick={() => handleTabChange(2)}
              fontWeight={tab === 2 ? '700' : '500'}
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}
              backgroundColor={tab === 2 ? 'white' : '#eee'}
              color={tab === 2 ? '#3DA2EE' : '#939CA9'}
              border={tab === 2 ? '0.5px solid #3DA2EE' : undefined}
              borderBottom={tab === 2 ? '2px solid #3DA2EE' : '2px solid #939CA9'}
              _hover={{
                fontWeight: '700',
                background: 'white',
                border: '0.5px solid #3DA2EE',
                borderBottom: '2px solid #3DA2EE',
                color: '#3DA2EE'
              }}
            >
              점검 결과 집계
            </Box>
          </Flex>
        </Flex>
        {/* 추후 tableDataCheck, tableDataColumns 로 json 형식 참고용
        <Box border={'2px solid #eee'}>
              {tab === 1 ? 
              <PolicyLog tableData={tableDataCheck}>
              </PolicyLog>
               : 
              <PolicyActive tableData={tableDataColumns}>
              </PolicyActive>}
          </Box> */}
        <Box border={'2px solid #eee'}>
              {tab === 1 ? 
              <PolicyLog tableData={tableDataCheck}>
              </PolicyLog>
               : 
              <PolicyActive tableData={tableDataColumns}>
              </PolicyActive>}
          </Box>
      </Flex>
    </Card>
  );
}
