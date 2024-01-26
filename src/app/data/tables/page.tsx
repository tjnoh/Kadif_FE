"use client"
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import React, { useEffect, useRef, useState } from 'react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import { fetchLogic } from 'utils/fetchData';

export default function DataTables() {
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [data, setData] = useState<[]>([]);
  const [rows, setRows] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');                           // search Category
  const [searchResult, setSearchResult] = React.useState('');               // 검색어
  const [searchComfirm, setSearchComfirm] = React.useState<boolean>(false); // search 돋보기 버튼

  const intervalId = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState(searchParams.get('contents') !== null ? searchParams.get('contents') : 'network');

  useEffect(() => {
    console.log("탐?");
    
    fetchData();
    fetchIntervalTime();
  },[]);

  useEffect(() => {
    if(!isOpen) {
      const timerId = setTimeout(() => {
        fetchData();
      }, 300);

      return () => {
        clearTimeout(timerId);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if(intervalTime !== undefined && intervalTime !== null && intervalTime !== 0) {
      console.log('Tables interverTime cc : ', intervalTime[0]?.svr_update_interval);
      const timer:number = +intervalTime[0]?.svr_update_interval * 1000;

      fetchData();
      const intervalId = setInterval(() => {
        fetchData();
      }, timer);

      return () => {      
        clearInterval(intervalId);
      }
    }

  }, [intervalTime.length ,url ,page ,rows ,sorting ,searchComfirm]);
    
  
  // useEffect(() => {
  //   if(intervalId.current !== null) clearInterval(intervalId.current);
  //   intervalId.current = null;
    
  //   fetchData();
  //   intervalId.current = setInterval(() => {
  //     fetchData();
  //   }, 3000);

  //   return () => {
  //     clearInterval(intervalId.current);
  //   }
  // }, [url, page, rows,sorting,searchComfirm]);

  const fetchIntervalTime = async () => {
    try {
      await fetchLogic("setting/intervalTime",setIntervalTime);      
    } catch(error) {
      console.log("데이터 가져오기 실패 : ",error);
    }
  }

  const fetchData = async () => {
    try {
      const userNameCookie = await getNameCookie();

      const query = 'contents='+url+'&page='+page+'&pageSize='+rows+
                    '&sorting='+(sorting[0]?.id ?? '')+'&desc='+(sorting[0]?.desc ?? '')+
                    '&category='+search+'&search='+searchResult+'&username='+userNameCookie;
      
      const response = await fetch(`${backIP}/api?`+ query);
      const data = await response.json();
      setData(data);
      router.push(`${pathname}?${query}`);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box>
      <Flex direction="column">
        <Flex
          mt="45px"
          mb="20px"
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          <Text fontSize="2xl" ms="24px" fontWeight="700">
            Data Tables
          </Text>
          <Flex
            align="center"
            me="20px"
            ms={{ base: '24px', md: '0px' }}
            mt={{ base: '20px', md: '0px' }}
            cursor='pointer'
            border={'1px solid black'}
          >
            <Box
              onClick={() => setUrl('network')}
              fontWeight="500"
              me={{ base: '34px', md: '44px' }}
              padding={'5px'}
              borderRadius={'5px'}
              _hover={{
                background:'#3965FF',
                color:'white'
              }}
              border={'1px solid black'}
              style = {
                url === 'network' ? 
                {background:'#3965FF',
                color:'white'} :
                {

                }
              }
            >
              Network
            </Box>
            <Box
              onClick={() => setUrl('media')}
              fontWeight="500"
              me={{ base: '34px', md: '44px' }}
              padding={'5px'}
              borderRadius={'5px'}
              border={'1px solid black'}
              _hover={{
                background:'#3965FF',
                color:'white'
              }}
              style = {
                url === 'media' ? 
                {background:'#3965FF',
                color:'white'} :
                {

                }
              }
            >
              Media
            </Box>
            <Box
              onClick={() => setUrl('outlook')}
              fontWeight="500"
              me={{ base: '34px', md: '44px' }}
              padding={'5px'}
              borderRadius={'5px'}
              border={'1px solid black'}
              _hover={{
                background:'#3965FF',
                color:'white'
              }}
              style = {
                url === 'outlook' ? 
                {background:'#3965FF',
                color:'white'} :
                {

                }
              }
            >
              Outlook
            </Box>
            <Box
              onClick={() => setUrl('print')}
              fontWeight="500"
              padding={'5px'}
              borderRadius={'5px'}
              border={'1px solid black'}
              style = {
                url === 'print' ? 
                {background:'#3965FF',
                color:'white'} :
                {

                }                
              }
              _hover={{
                background:'#3965FF',
                color:'white'
              }}
              >
              Print
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <CheckTable 
        tableData={data} 
        setTableData={setData} 
        name={url} 
        rows={rows} setRows={setRows}
        page={page} setPage={setPage}
        sorting={sorting} setSorting={setSorting}
        search={search} setSearch={setSearch}
        searchResult={searchResult} setSearchResult={setSearchResult}
        searchComfirm = {searchComfirm} setSearchComfirm = {setSearchComfirm}
        isOpen = {isOpen} onOpen = {onOpen} onClose = {onClose}
      />
    </Box>
  );
}
