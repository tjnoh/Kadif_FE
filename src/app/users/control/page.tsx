'use client';
import { Box, Button, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import React, { useEffect, useState } from 'react';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import CheckTable from 'views/admin/profile/components/CheckTable';

export default function ProfileOverview() {
  const [data, setData] = useState<[]>([]);
  //User List Data
  const [loading, setLoading] = React.useState(true);
  //검색 카테고리(ex : 사용자명, 등급)
  const [category, setCategory] = React.useState('username');
  //검색 단어
  const [searchWord, setSearchWord] = React.useState('');
  //버튼을 동작 시키기 위한 State
  const [searchButton, setSearchButton] = React.useState<boolean>(false);

  React.useEffect(() => {
    // 먼저 등급을 가져오는 비동기 작업 수행
    const fetchGradeAndData = async () => {
      //현재 로그인 중인 사용자의 이름이 저장된 Cookie를 가져오는 function (비동기)
      const userNameCookie = await getNameCookie();
      if (userNameCookie) {
        //fetch 함수로 백엔드에 username, category, searchWord를 query param으로 전달 (비동기)
        try {
          const response = await fetch(`${backIP}/user/all?username=`+userNameCookie+
          "&category="+category+"&searchWord="+searchWord);
          //전달 받은 response를 json으로 변환하여 Data에 저장한다.
          const data = await response.json();
          console.log(data);
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    //비동기 처리를 위한 사용
    fetchGradeAndData().then(() => {setLoading(false);}); // 함수 호출
    // data.length가 변경될 때만 실행되도록 두 번째 인자로 전달
  }, [data.length, searchButton]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}
    >
      <CheckTable 
      tableData={data} setTableData={setData} name={'사용자 계정 관리'} 
      category={category} setCategory={setCategory}
      searchWord={searchWord} setSearchWord={setSearchWord}
      searchButton={searchButton} setSearchButton={setSearchButton}
      />
    </Box>
  );
}
