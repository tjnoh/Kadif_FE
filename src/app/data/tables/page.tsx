"use client"
import { Box, Card, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import ComplexTable from 'views/admin/dataTables/components/DevelopmentTable';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataDevelopment';
import { backIP } from 'utils/ipDomain';

export default function DataTables() {
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [data, setData] = useState<[]>([]);
  const [category, setCategory] = React.useState('s_id');
  //검색 단어
  const [searchWord, setSearchWord] = React.useState('');
  //버튼을 동작 시키기 위한 State
  const [searchButton, setSearchButton] = React.useState<boolean>();
  const [rows, setRows] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const intervalId = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState(searchParams.get('contents') !== null ? searchParams.get('contents') : 'network');

  const fetchData = async () => {
    try {
      const response = await fetch(`${backIP}/session/all?category=${category}&searchWord=${searchWord}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  React.useEffect(() => {
    fetchData();
  },[searchButton])

  return (
    <Card p={'8'} h={'93vh'} minH={'85vh'} maxH={'93vh'} 
    >
      <Flex direction="column">
        <Text fontSize="2xl" ms="24px" fontWeight="700">
          세션 목록
        </Text>
        <Flex
          justifyContent="start"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          <ComplexTable tableData={tableDataComplex}
          category={category} setCategory={setCategory}
          searchWord={searchWord} setSearchWord={setSearchWord}
          searchButton={searchButton} setSearchButton={setSearchButton}
          rows={rows} setRows={setRows} page={page} setPage={setPage}
          ></ComplexTable>
        </Flex>
      </Flex>
    </Card>
  );
}
