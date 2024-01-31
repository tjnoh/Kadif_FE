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
  // const [search, setSearch] = React.useState('');                           // search Category
  const search = useRef('');                                                // search Category
  const [searchResult, setSearchResult] = React.useState('');               // 검색어
  const [searchComfirm, setSearchComfirm] = React.useState<boolean>(false); // search 돋보기 버튼

  const intervalId = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState(searchParams.get('contents') !== null ? searchParams.get('contents') : 'network');

  useEffect(() => {
    fetchIntervalTime();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const timerId = setTimeout(() => {
        fetchData();
      }, 300);

      return () => {
        clearTimeout(timerId);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (intervalTime !== undefined && intervalTime !== null && intervalTime !== 0) {
      const timer: number = +intervalTime[0]?.svr_update_interval * 1000;
      fetchLog();
      fetchData();
      const intervalId = setInterval(() => {
        fetchData();
      }, timer);

      return () => {
        clearInterval(intervalId);
      }
    }

  }, [intervalTime.length, url, page, rows, sorting, searchComfirm]);

  const fetchLog = async () => {
    const userNameCookie = await getNameCookie();
    await fetchLogic(`log/tables?contents=${url}&username=${userNameCookie}&category=${search}&search=${searchResult}`);
  }

  const fetchIntervalTime = async () => {
    try {
      await fetchLogic("setting/intervalTime", setIntervalTime);
    } catch (error) {
      console.log("데이터 가져오기 실패 : ", error);
    }
  }

  const fetchData = async () => {    
    try {
      const userNameCookie = await getNameCookie();

      const query = 'contents=' + url + '&page=' + page + '&pageSize=' + rows +
        '&sorting=' + (sorting[0]?.id ?? '') + '&desc=' + (sorting[0]?.desc ?? '') +
        '&category=' + search + '&search=' + searchResult + '&username=' + userNameCookie;

      const response = await fetch(`${backIP}/api?` + query);
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
          // mb="20px"
          justifyContent="start"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          {/* <Text fontSize="2xl" ms="24px" fontWeight="700">
            Data Tables
          </Text> */}
          <Flex
            align="center"
            me="20px"
            cursor='pointer'
          >
            <Box
              onClick={() => setUrl('network')}
              fontWeight="700"
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}
              _hover={{
                background: 'white',
                border: '2px solid white',
                color: 'black'
              }}

              style={
                url === 'network' ?
                  {
                    background: 'white',
                    border: '2px solid white',
                    color: 'black'
                  } :
                  {

                  }
              }
            >
              네트워크 정보유출 내역
            </Box>
            <Box
              onClick={() => setUrl('media')}
              fontWeight="700"
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}

              _hover={{
                background: 'white',
                border: '2px solid white',
                color: 'black',
              }}
              style={
                url === 'media' ?
                  {
                    background: 'white',
                    border: '2px solid white',
                    color: 'black'
                  } :
                  {

                  }
              }
            >
              이동식 저장매체 정보유출 내역
            </Box>
            <Box
              onClick={() => setUrl('outlook')}
              fontWeight="700"
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}

              _hover={{
                background: 'white',
                border: '2px solid white',
                color: 'black'
              }}
              style={
                url === 'outlook' ?
                  {
                    background: 'white',
                    border: '2px solid white',
                    color: 'black'
                  } :
                  {

                  }
              }
            >
              Outlook 메일발송 내역
            </Box>
            <Box
              onClick={() => setUrl('print')}
              fontWeight="700"
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}

              style={
                url === 'print' ?
                  {
                    background: 'white',
                    border: '2px solid white',
                    color: 'black'
                  } :
                  {

                  }
              }
              _hover={{
                background: 'white',
                border: '2px solid white',
                color: 'black'
              }}
            >
              프린트 인쇄 내역
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
        search={search}
        searchResult={searchResult} setSearchResult={setSearchResult}
        searchComfirm={searchComfirm} setSearchComfirm={setSearchComfirm}
        isOpen={isOpen} onOpen={onOpen} onClose={onClose}
      />
    </Box>
  );
}
