"use client"
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import { fetchLogic } from 'utils/fetchData';
import AgentsTable from 'views/admin/dataTables/components/AgentsTable';

export default function DataTables() {
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [data, setData] = useState<[]>([]);
  const [rows, setRows] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [search, setSearch] = React.useState('');                        // search Category
  const search = useRef('');                                                // search Category
  const [searchResult, setSearchResult] = React.useState('');               // 검색어
  const [searchComfirm, setSearchComfirm] = React.useState<boolean>(false); // search 돋보기 버튼
  const [userNameCookie, setUserNameCookie] = useState<string>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState(searchParams.get('contents') !== null ? searchParams.get('contents') : 'network');

  useEffect(() => {
    fetchIntervalTime();
    fetchLog();
  }, []);

  useEffect(() => {
    fetchData();
  }, [userNameCookie]);

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
      const timer: number = +intervalTime[0]?.svr_ui_refresh_interval * 1000;
      fetchData();
      const intervalId = setInterval(() => {
        fetchData();
      }, timer);

      return () => {
        clearInterval(intervalId);
      }
    }

  }, [intervalTime, page, rows, sorting, searchComfirm]);

  const fetchLog = async () => {
    const cookieValue = await getNameCookie();
    
    setUserNameCookie(cookieValue);
    await fetchLogic(`log/leaked?username=${cookieValue}`);
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
      const query = 'page=' + page + '&pageSize=' + rows +
        '&sorting=' + (sorting[0]?.id ?? '') + '&desc=' + (sorting[0]?.desc ?? '') +
        '&category=' + search.current + '&search=' + searchResult + '&username=' + userNameCookie;
        

      const response = await fetch(`${backIP}/api/leaked?` + query);
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
          <Flex
            align="center"
            me="20px"
            cursor='pointer'
          >
            <Box
              fontWeight={'700'}
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}
              backgroundColor={'white'}
              color={'#3DA2EE'}
              borderBottom={'2px solid #3DA2EE'}
            >
              관리대상 Agent 목록
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <AgentsTable
        tableData={data}
        setTableData={setData}
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
