"use client"
import { Box, Center, Flex, Link, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Tab, Text, background } from '@chakra-ui/react';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment';
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import React, { useEffect, useState } from 'react';
import AdminLayout from 'layouts/admin';
// import { useRouter } from 'next/router';

export default function DataTables() {
  const [data, setData] = useState<[]>([]);
  const [url, setUrl] = useState('network');
  // const router = useRouter();
  
  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/:'+ url);
      const data = await response.json();
      console.log(data);
      setData(data);

      router.push({
        query:{category:url} 
      });

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
              <Link href='/admin/data-tables?contents=network'>Network</Link>
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
      <CheckTable tableData={data} name={url}/>
    </Box>
  );
}
