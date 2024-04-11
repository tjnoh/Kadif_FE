"use client"
import { Box, Card, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import ComplexTable from 'views/admin/dataTables/components/DevelopmentTable';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataDevelopment';

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

  return (
    <Card p={'8'} h={'93vh'} minH={'85vh'} maxH={'93vh'} 
      overflowY={'scroll'}
    >
      <Flex direction="column">
        <Text fontSize="2xl" ms="24px" fontWeight="700">
          세션 목록
        </Text>
        <Flex
          mt="45px"
          justifyContent="start"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          <ComplexTable tableData={tableDataComplex}></ComplexTable>
        </Flex>
      </Flex>
    </Card>
  );
}
