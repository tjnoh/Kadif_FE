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
import { fetchPost } from 'utils/fetchData';
import CheckTable from 'views/admin/profile/components/CheckTable';

export default function ProfileOverview() {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData().then(() => {
      setLoading(false);
    });
  }, [data.length]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/all');
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CheckTable tableData={data} setTableData={setData} name={'User List'} />
    </Box>
  );
}
