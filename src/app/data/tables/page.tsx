"use client"
import { Box, Card, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import ComplexTable from 'views/admin/dataTables/components/DevelopmentTable';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataDevelopment';
import { backIP } from 'utils/ipDomain';
import { getNameCookie } from 'utils/cookie';
import Swal from 'sweetalert2';

export default function DataTables() {
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [userData, setUserData] = useState();
  const [data, setData] = useState<[]>([]);
  const [category, setCategory] = React.useState('s_id');
  //검색 단어
  const [searchWord, setSearchWord] = React.useState('');
  //버튼을 동작 시키기 위한 State
  const [searchButton, setSearchButton] = React.useState<boolean>();
  const [rows, setRows] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    try {
      const response = await fetch(`${backIP}/session/all?category=${category}&searchWord=${searchWord}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

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

	const deleteSession = (e: any) => {
		Swal.fire({
			title: '세션 삭제',
			html: `<div style="font-size: 14px;">'${e}번' 세션을 삭제하시겠습니까?</div>`,
			confirmButtonText: '확인',
			cancelButtonText: '아니오',
			showCancelButton: true,
			focusConfirm: false,
			customClass: {
				popup: 'custom-popup-class',
				title: 'custom-title-class',
				htmlContainer: 'custom-content-class',
				container: 'custom-content-class',
				confirmButton: 'custom-confirm-class',
				cancelButton: 'custom-cancel-class',
			},
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`${backIP}/session/delete`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						s_id: e,
					})
				})
        .then((result) => {
          if(result.status === 200) {
            fetchData();
          }
        })
        .catch((error:any) => {
          console.log('Delete Session error', error);
        });
				
			}
		});
	}

  React.useEffect(() => {
    fetchDataUser();
  },[])

  React.useEffect(() => {
    fetchData();
  },[searchButton]);

  return (
    <Card p={'8'} h={'93vh'} minH={'93vh'}
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
          {/* <ComplexTable  */}
          <ComplexTable 
          tableData={data} userData={userData}
          category={category} setCategory={setCategory}
          searchWord={searchWord} setSearchWord={setSearchWord}
          searchButton={searchButton} setSearchButton={setSearchButton}
          rows={rows} setRows={setRows} page={page} setPage={setPage}
          deleteSession={deleteSession}
          ></ComplexTable>
        </Flex>
      </Flex>
    </Card>
  );
}
