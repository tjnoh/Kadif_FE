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

import {
  Box,
  Flex,
  FormLabel,
  Image,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdVideoFile,
} from 'react-icons/md';
import CheckTable from 'views/admin/default/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
// Assets
import { useEffect, useState } from 'react';
import selectDetectFiles from 'views/admin/default/variables/tableDataComplex';

type DataItem = {
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
};

type ProcessData = {
  process: string,
  count: number,
  hcount: number,
  day: number
}

type networkData = {
  allfiles: number
}

type mediaData = {
  allmedias: number
}

type outlookData = {
  alloutlooks: number
}

type printData = {
  allprints: number
}
export default function Default() {
  // Chakra Color Mode
  const [data, setData] = useState<DataItem[]>([]);
  const [count, setCount] = useState<ProcessData[]>([]);
  const [net, setNet] = useState<networkData[]>([]);
  const [med, setMed] = useState<mediaData[]>([]);
  const [outlook, setOutlook] = useState<outlookData[]>([]);
  const [print, setPrint] = useState<printData[]>([]);

  useEffect(() => {
    fetchData();
    fetchCount();
    fetchNet();
    fetchMedia();
    fetchOutlook();
    fetchPrint();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/detectfiles');
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchCount = async () => {
    try {
      const response = await fetch('http://localhost:8000/pie/count');
      const data = await response.json();
      setCount(data);
    } catch (error) {
      console.error('에러 등장 : ', error);
    }
  }
  const fetchNet = async () => {
    try {
      const res2 = await fetch('http://localhost:8000/network/all');
      const data2 = await res2.json();
      console.log("net data : ", data2);
      setNet(data2);
    } catch (error) {
      console.error('fetchNet 에러 등장 : ', error);
    }
  }

  const fetchMedia = async () => {
    try {
      const response = await fetch('http://localhost:8000/media/all');
      const data = await response.json();
      console.log("media data : ", data);
      setMed(data);
    } catch (error) {
      console.error('fetchMedia 에러 등장 : ', error);
    }
  }

  const fetchOutlook = async () => {
    try {
      const response = await fetch('http://localhost:8000/outlook/all');
      const data = await response.json();
      console.log("outlook data : ", data);
      setOutlook(data);
    } catch (error) {
      console.error('fetchOutlook 에러 등장 : ', error);
    }
  }

  const fetchPrint = async () => {
    try {
      const response = await fetch('http://localhost:8000/print/all');
      const data = await response.json();
      console.log("print data : ", data);
      setPrint(data);
    } catch (error) {
      console.error('fetchprint 에러 등장 : ', error);
    }
  }

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="오늘자 network 유출"
          value={net?.[0]?.allfiles + "건"}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdVideoFile} color={brandColor} />
              }
            />
          }
          name="오늘자 Media 유출"
          value={med?.[0]?.allmedias + "건"}
        />
        <MiniStatistics growth={-23} name="오늘자 Outlook 유출" value={outlook?.[0]?.alloutlooks + "건"} />
        <MiniStatistics
          // endContent={
          //   <Flex me="-16px" mt="10px">
          //     <FormLabel htmlFor="balance">
          //       <Box boxSize={'12'}>
          //         <Image alt="" src={Usa.src} w={'100%'} h={'100%'} />
          //       </Box>
          //     </FormLabel>
          //     <Select
          //       id="balance"
          //       variant="mini"
          //       mt="5px"
          //       me="0px"
          //       defaultValue="usd"
          //     >
          //       <option value="usd">USD</option>
          //       <option value="eur">EUR</option>
          //       <option value="gba">GBA</option>
          //     </Select>
          //   </Flex>
          // }
          name="오늘자 Print 유출"
          value={print?.[0]?.allprints + "건"}
        />
        {/* <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="New Tasks"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Projects"
          value="2935"
        /> */}
      </SimpleGrid>

      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <PieCard data={count !== undefined && count} />
      </SimpleGrid> */}
      <Grid templateColumns={`repeat(4,1fr)`}  columnGap={5}>
        <GridItem colSpan={3}>
        <TotalSpent />
        </GridItem>
        <PieCard data={count !== undefined && count} />
      </Grid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <WeeklyRevenue />
        </SimpleGrid>
        <ComplexTable tableData={data} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        {/* <CheckTable tableData={tableDataCheck} /> */}
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}
