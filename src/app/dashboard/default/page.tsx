'use client';

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
  Text,
  Card,
  IconButton,
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
// Assets
import { useEffect, useState } from 'react';
import { fetchLogic } from 'utils/fetchData';
import { getNameCookie } from 'utils/cookie';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type LineChartsData = {
  name: string;
  data: [{}];
};

type networkData = {
  allfiles: number;
  beforefiles: number;
};

type mediaData = {
  allmedias: number;
  beforemedias: number;
};

type outlookData = {
  alloutlooks: number;
  beforeoutlooks: number;
};

type printData = {
  allprints: number;
  beforeprints: number;
};

type barData = {
  name: string;
  data: string[];
  category: string[];
};

export default function Default() {
  // Chakra Color Mode
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [lineChartsData, setLineChartsData] = useState<LineChartsData[]>([]);
  const [net, setNet] = useState<networkData>();
  const [med, setMed] = useState<mediaData>();
  const [outlook, setOutlook] = useState<outlookData>();
  const [print, setPrint] = useState<printData>();
  const [top, setTop] = useState<barData[]>([]);
  const [select, setSelect] = useState('week'); // 일/주/월
  const [netComp, setNetComp] = useState();

  useEffect(() => {
    fetchData();
    fetchIntervalTime();
  }, []);

  useEffect(() => {
    if (intervalTime !== undefined && intervalTime !== null && intervalTime !== 0) {
      console.log('DashBoard interverTime cc : ', intervalTime[0]?.svr_update_interval);
      const timer: number = +intervalTime[0]?.svr_update_interval * 1000;

      fetchData();
      const intervalId = setInterval(() => {
        fetchData();
      }, timer);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [intervalTime.length, select]);

  // pie Component는 안에서 fetch 호출
  // useEffect(() => {
  //   fetchData();
  // }, [select]);

  const fetchIntervalTime = async () => {
    try {
      await fetchLogic('setting/intervalTime', setIntervalTime);
    } catch (error) {
      console.log('데이터 가져오기 실패 : ', error);
    }
  };

  const fetchData = async () => {
    try {
      const userNameCookie = await getNameCookie();
      await fetchLogic("lineCharts?select=" + select + "&username=" + userNameCookie, setLineChartsData);
      await fetchLogic("network/all?select=" + select + "&username=" + userNameCookie, setNet);
      await fetchLogic("media/all?select=" + select + "&username=" + userNameCookie, setMed);
      await fetchLogic("outlook/all?select=" + select + "&username=" + userNameCookie, setOutlook);
      await fetchLogic("print/all?select=" + select + "&username=" + userNameCookie, setPrint);
      await fetchLogic('bar/count?select=' + select + "&username=" + userNameCookie, setTop);
      await fetchLogic("complex/all?select="+select+"&username="+userNameCookie, setNetComp)
    } catch (error) {
      console.log("데이터 가져오기 실패 : ", error);
    }
  };

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    // <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
    <Box pt={{ base: '0px', md: '0px' }}>
      <Flex marginBottom={'10px'} justifyContent={'space-between'}>
        {/* <Card padding={'10px'} border={'none'}> */}
        <Text
          mr={'20px'}
          p={'5px'}
          fontSize={'2xl'}
          fontWeight={'700'}
        >
          {select !== 'month' ? (select !== 'week' ? '금일' : '금주') : '금월'}{' '}
          사용자 단말 정보유출 집계 현황
        </Text>
        {/* </Card> */}
        <Select
          fontSize="sm"
          defaultValue="week"
          width="unset"
          fontWeight="700"
          backgroundColor={'white'}
          color={'black'}
          borderRadius={'10px'}
          borderColor={'lightgray'}
          marginRight={'5px'}
          alignSelf="end"
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="day">일</option>
          <option value="week">주</option>
          <option value="month">월</option>
        </Select>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }}
        gap="20px"
        mb='15px'
        // mb="20px"
        h={'80px'}
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
          name="network"
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
          name="media"
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
              icon={<Icon w="32px" h="32px" as={MdMail} color={brandColor} />}
            />
          }
          growth={outlook?.beforeoutlooks}
          name="outlook"
          value={outlook?.alloutlooks + "건"}
          day={select} />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdPrint} color={brandColor} />}
            />
          }
          name="print"
          value={print?.allprints + "건"}
          growth={print?.beforeprints}
          day={select}
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 3, '2xl': 3 }}
        h='200px'
        gap="20px"
        mb="20px"
      >
        <Box h={'200px'}>
          <Flex justifyContent={'space-between'} alignContent={'center'} h={'15%'}>
            <Text padding={'5px'} fontSize={'sm'} fontWeight={700}>금주 유출 건수</Text>
            <IconButton 
              aria-label="DataShow"
              icon={<ExternalLinkIcon />}
              background={'transparent'}
              w={'25px'} h={'25px'}
              ></IconButton>
          </Flex>
          <TotalSpent data={lineChartsData} day={select} height={'80%'} />
        </Box>
        <Box h={'200px'}>
          <Flex justifyContent={'space-between'} alignContent={'center'} h={'15%'}>
            <Text padding={'5px'} fontSize={'sm'} fontWeight={700}>금주 유출 건수</Text>
            <IconButton 
              aria-label="DataShow"
              icon={<ExternalLinkIcon />}
              background={'transparent'}
              w={'25px'} h={'25px'}
              ></IconButton>
          </Flex>
          <PieCard day={select} />
        </Box>
        <Box h={'200px'}>
          <Flex justifyContent={'space-between'} alignContent={'center'} h={'15%'}>
            <Text padding={'5px'} fontSize={'sm'} fontWeight={700}>금주 유출 건수</Text>
            <IconButton 
              aria-label="DataShow"
              icon={<ExternalLinkIcon />}
              background={'transparent'}
              w={'25px'} h={'25px'}
              ></IconButton>
          </Flex>
          <PieCard day={select} />
        </Box>
      </SimpleGrid>
      {/* <Grid
        templateColumns={{ '2xl': `repeat(4,1fr)`, xl: `repeat(3,1fr)` }}
        gap="20px"
      >
        <GridItem
          colSpan={{ '2xl': 3, xl: 2 }}
          border={'1px solid black'}
          borderRadius={'5px'}
        >
          <Text>금주 유출 건수</Text>
          <TotalSpent data={lineChartsData} day={select} />
        </GridItem>
        <Box>
          <Text>금주 유출 건수</Text>
          <PieCard day={select} />
        </Box>
      </Grid> */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="20px">
        <WeeklyRevenue data={top[0]} day={select} />
        <WeeklyRevenue data={top[1]} day={select} />
        <WeeklyRevenue data={top[2]} day={select} />
        <WeeklyRevenue data={top[3]} day={select} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="20px">
        <WeeklyRevenue data={top[0]} day={select} />
        <WeeklyRevenue data={top[1]} day={select} />
        <WeeklyRevenue data={top[2]} day={select} />
        <WeeklyRevenue data={top[3]} day={select} />
        {/* <ComplexTable tableData={netComp}></ComplexTable>
          <ComplexTable tableData={top[1]}></ComplexTable>
          <ComplexTable tableData={top[2]}></ComplexTable>
          <ComplexTable tableData={top[3]}></ComplexTable> */}
      </SimpleGrid>
    </Box>
  );
}
