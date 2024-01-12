"use client"
import { Box, Flex, Text } from '@chakra-ui/react';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';

export default function DataTables() {
  const [data, setData] = useState<[]>([]);
  const [url, setUrl] = useState('network');
  const [rows, setRows] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');
  const [searchResult, setSearchResult] = React.useState('');
  const [searchComfirm, setSearchComfirm] = React.useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    console.log("rendering");
    
    fetchData();
  }, [url, page, rows,sorting,searchComfirm]);

  const fetchData = async () => {
    try {
      const query = 'contents='+url+'&page='+page+'&pageSize='+rows+'&sorting='+(sorting[0]?.id ?? '')+'&desc='+(sorting[0]?.desc ?? '')+'&category='+search+'&search='+searchResult;

      const response = await fetch('http://localhost:8000/api?'+ query);
      const data = await response.json();
      setData(data);

      console.log(data);
      

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
        name={url} 
        rows={rows} setRows={setRows}
        page={page} setPage={setPage}
        sorting={sorting} setSorting={setSorting}
        search={search} setSearch={setSearch}
        searchResult={searchResult} setSearchResult={setSearchResult}
        searchComfirm = {searchComfirm} setSearchComfirm = {setSearchComfirm}
      />
    </Box>
  );
}
