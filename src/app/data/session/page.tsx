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
import IconBox from 'components/icons/IconBox';
import { Icon } from '@chakra-ui/icons';
import { FaFilePdf } from 'react-icons/fa';
// import { useRouter } from 'next/router';

export default function DataTables() {
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [data, setData] = useState<any>([]);
  const [sessionData, setSessionData] = useState<any>([]);
  const [LogData, setLogData] = useState<[]>([]);
  const [responseData, setResponseData] = useState<[]>([]);
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
      const response = await fetch(`${backIP}/session/data?sid=${searchParams.get('sid')}`);
      const data = await response.json();
      setData(data);
      setSessionData(data[0]);
      setLogData(data[1]);
      setResponseData(data[2]);      
    } catch (error) {
      console.log("데이터 가져오기 실패 : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  	//PDF로 저장
	const handleSavePDF = async () => {
    try {
    const response = await fetch(`${backIP}/session/pdfDwn?sid=${searchParams.get('sid')}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        // a 태그를 만들어서 다운로드
        const a = document.createElement('a');
        a.href = url;
        a.download = `${searchParams.get('sname')}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
          // 브라우저에 생성된 URL 해제
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <Card p={'8'} h={'93vh'} minH={'85vh'} maxH={'93vh'}>
      <Flex direction="column">
        <Flex justifyContent={'space-between'}>
          <Text fontSize="2xl" ms="24px" fontWeight="700">
          보안성 평가 정책 명 : {sessionData !== undefined && sessionData !== null ? sessionData[0]?.p_name : ''}, 세션 명 : {searchParams.get('sname')} 
          </Text>
          <Flex justifyContent={'end'}>
            <IconBox
              w="50px"
              h="32px"
              aria-label="Stop Session"
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={FaFilePdf}
                  _hover={{ cursor: 'pointer' }}
                  onClick={handleSavePDF}
                />
              }
            />
          </Flex>
          </Flex>
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
              보안성 평가 수행 로그
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
              보안섬 평가 결과 집계
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
              <PolicyLog tableData={LogData}></PolicyLog>              
               : 
              <PolicyActive tableData={responseData}></PolicyActive>}              
          </Box>
      </Flex>
    </Card>
  );
}
