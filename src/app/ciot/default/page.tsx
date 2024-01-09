// pages/index.tsx
'use client'; 

import React, { useEffect, useState } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import ComplexTable from 'views/admin/default/components/ComplexTable';

interface DataItem {
  id: Number,
  time: String,
  pcname: String,
  process: String,
  pid: String,
  agent_ip: String,
  src_ip: String,
  src_port: String,
  dst_ip: String,
  dst_port: String,
  src_file: String,
  down_state: String,
  scrshot_downloaded: String,
  file_size: String,
  keywords: String,
  dst_file: String,
  saved_file: String,
  accuracy: Number,
  evCO: String,
  evFA: String,
  evSA: String,
  isprinted: Number,
  asked_file: Number
}

const Default: React.FC = () => {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/detectfiles');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <ComplexTable tableData={data} />
    </Box>
  );
};

export default Default;
