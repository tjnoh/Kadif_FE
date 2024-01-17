'use client';
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Button, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import React, { useEffect, useState } from 'react';
import { getNameCookie } from 'utils/cookie';
import { fetchPost } from 'utils/fetchData';
import CheckTable from 'views/admin/profile/components/CheckTable';

export default function ProfileOverview() {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = React.useState(true);
  //검색 카테고리(ex : 사용자명, 등급)
  const [category, setCategory] = React.useState('username');
  //검색 단어
  const [searchWord, setSearchWord] = React.useState('');
  const [searchButton, setSearchButton] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchGradeAndData = async () => {
      // 먼저 등급을 가져오는 비동기 작업 수행
      const userNameCookie = await getNameCookie();
      if (userNameCookie) {
        try {
          const response = await fetch('http://localhost:8000/user/all?username='+userNameCookie+
          "&category="+category+"&searchWord="+searchWord);
          const data = await response.json();
          console.log(data);
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchGradeAndData().then(() => {setLoading(false);}); // 함수 호출
    // data.length가 변경될 때만 실행되도록 두 번째 인자로 전달
  }, [data.length, searchButton]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CheckTable 
      tableData={data} setTableData={setData} name={'사용자 계정 관리'} 
      category={category} setCategory={setCategory}
      searchWord={searchWord} setSearchWord={setSearchWord}
      searchButton={searchButton} setSearchButton={setSearchButton}
      />
    </Box>
  );
}
