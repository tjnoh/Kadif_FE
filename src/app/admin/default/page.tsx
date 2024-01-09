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

  // pie Component는 안에서 fetch 호출
  useEffect(() => {
    fetchLogic("lineCharts", setLineChartsData);
    fetchLogic("network/all", setNet);
    fetchLogic("media/all", setMed);
    fetchLogic("outlook/all", setOutlook);
    fetchLogic("print/all", setPrint);
    fetchLogic('bar/count', setTop);
  }, []);

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
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
          name="금일 network 송신 건수"
          value={net?.allfiles + "건"}
          growth={net?.beforefiles}
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
          name="금일 Media 송신 건수"
          value={med?.allmedias + "건"}
          growth={med?.beforemedias}
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
          growth={outlook?.beforeoutlooks} name="금일 Outlook 송신 건수" value={outlook?.alloutlooks + "건"} />
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
          name="금일 Print 송신 건수"
          value={print?.allprints + "건"}
          growth={print?.beforeprints}
        />
      </SimpleGrid>


      <Grid templateColumns={{ "2xl": `repeat(4,1fr)`, "xl": `repeat(3,1fr)` }} gap='20px'
      >
        <GridItem colSpan={{ "2xl": 3, "xl": 2 }} >
          <TotalSpent data={lineChartsData} />
        </GridItem>
        <PieCard
        />
      </Grid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="20px">
          <WeeklyRevenue data={top[0]} />
          <WeeklyRevenue data={top[1]} />
          <WeeklyRevenue data={top[2]} />
          <WeeklyRevenue data={top[3]} />
      </SimpleGrid>

    </Box>
  );
}
