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
  MdEditDocument,
  MdFileCopy,
  MdMail,
  MdMediation,
  MdPrint,
  MdVideoFile,
  MdVideoLabel,
  MdVideocam,
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
import { fetchLogic } from 'utils/fetchData';
import { getNameCookie } from 'utils/cookie';

type LineChartsData = {
  name: string,
  data: [{}]
}


type networkData = {
  allfiles: number,
  beforefiles: number
}

type mediaData = {
  allmedias: number,
  beforemedias: number
}

type outlookData = {
  alloutlooks: number,
  beforeoutlooks: number
}

type printData = {
  allprints: number,
  beforeprints: number
}

type barData = {
  name: string,
  data: string[],
  category: string[]
}

export default function Default() {
  // Chakra Color Mode
  const [lineChartsData, setLineChartsData] = useState<LineChartsData[]>([]);
  const [net, setNet] = useState<networkData>();
  const [med, setMed] = useState<mediaData>();
  const [outlook, setOutlook] = useState<outlookData>();
  const [print, setPrint] = useState<printData>();
  const [top, setTop] = useState<barData[]>([]);
  const [select, setSelect] = useState('week'); // 일/주/월

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    }
  }, []
  
  
  
  
  );

  // pie Component는 안에서 fetch 호출
  useEffect(() => {
    fetchData();
  }, [select]);

  const fetchData = async () => {
    try {
      const userNameCookie = await getNameCookie();
      await fetchLogic("lineCharts?select=" + select + "&username=" + userNameCookie, setLineChartsData);
      await fetchLogic("network/all?select=" + select+"&username="+userNameCookie, setNet);
      await fetchLogic("media/all?select=" + select+"&username="+userNameCookie, setMed);
      await fetchLogic("outlook/all?select=" + select+"&username="+userNameCookie, setOutlook);
      await fetchLogic("print/all?select=" + select+"&username="+userNameCookie, setPrint);
      await fetchLogic('bar/count?select=' + select+"&username="+userNameCookie, setTop);
    } catch(error) {
      console.log("데이터 가져오기 실패 : ",error);
      
    }
  };


  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    // <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
    <Box pt={{ base: '0px', md: '0px' }}>
      <Flex marginBottom={'10px'} justifyContent={'end'}>
        <Select fontSize='sm' defaultValue='week' width='unset' fontWeight='700'
          backgroundColor={'white'}
          color={'black'}
          borderRadius={'10px'}
          borderColor={'white'}
          marginRight={'5px'}
          onChange={(e) => setSelect(e.target.value)}>
          <option value='day'>일</option>
          <option value='week'>주</option>
          <option value='month'>월</option>
        </Select>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics // Earnings
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
          name="Network 송신 건수"
          value={net?.allfiles + "건"}
          growth={net?.beforefiles}
          day={select}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdVideocam} color={brandColor} />
              }
            />
          }
          name="Media 송신 건수"
          value={med?.allmedias + "건"}
          growth={med?.beforemedias}
          day={select}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdMail} color={brandColor} />
              }
            />
          }
          growth={outlook?.beforeoutlooks} 
          name="Outlook 송신 건수" 
          value={outlook?.alloutlooks + "건"} 
          day={select} />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdPrint} color={brandColor} />
              }
            />
          }
          name="Print 송신 건수"
          value={print?.allprints + "건"}
          growth={print?.beforeprints}
          day={select}
        />
      </SimpleGrid>
      <Grid templateColumns={{ "2xl": `repeat(4,1fr)`, "xl": `repeat(3,1fr)` }} gap='20px'
      >
        <GridItem colSpan={{ "2xl": 3, "xl": 2 }} >
          <TotalSpent data={lineChartsData} day={select} />
        </GridItem>
        <PieCard day={select}
        />
      </Grid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="20px">
        <WeeklyRevenue data={top[0]} day={select} />
        <WeeklyRevenue data={top[1]} day={select} />
        <WeeklyRevenue data={top[2]} day={select} />
        <WeeklyRevenue data={top[3]} day={select} />
      </SimpleGrid>
    </Box>
  );
}
