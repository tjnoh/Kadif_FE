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
  MdBarChart,
  MdMail,
  MdPrint,
} from 'react-icons/md';
import { BsUsbDriveFill } from "react-icons/bs";
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
// Assets
import { useEffect, useState } from 'react';
import { fetchLogic } from 'utils/fetchData';
import { getNameCookie } from 'utils/cookie';
import MostTcTable from 'views/admin/default/components/MostTcList';
import TcResult from 'views/admin/default/components/TcResult';
import FailTCTable from 'views/admin/default/components/FailTCList';
import SessionCount from 'views/admin/default/components/SessionCount';
import MostTcPercent from 'views/admin/default/components/MostTcPercent';


export default function Default() {
  // Chakra Color Mode
  const [intervalTime, setIntervalTime] = useState<any>(0);
  const [outlookFlag, setOutlookFlag] = useState<boolean>();
  const [userNameCookie, setUserNameCookie] = useState<string>();
  const [mostTcList, setMostTcList] = useState();
  const [tcResult, setTcResult] = useState();
  const [failTCList, setFailTCList] = useState();
  const [failSession, setFailSession] = useState<{ all_count: number; failSession_count: number; succSession_count: number; }>();
  const [mostTcPercent, setMostTcPercent] = useState();
  const secondBoxHeights = '350px';

  // useEffect(() => {
  //   fetchOutlookFlag();
  //   fetchIntervalTime();
  // }, []);

  useEffect(() => {
    // fetchData();
    fetchMostTc();
  }, []);

  // useEffect(() => {
  //   if (intervalTime !== undefined && intervalTime !== null && intervalTime !== 0) {
  //     const timer: number = +intervalTime[0]?.svr_ui_refresh_interval * 1000;

  //     fetchData();

  //     const intervalId = setInterval(() => {
  //       fetchData();
  //     }, timer);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }
  // }, [intervalTime, select, outlookFlag]);

  const fetchMostTc = async () => {
    await fetchLogic("dashboard/mostTc", setMostTcList);
    await fetchLogic("dashboard/tcResult", setTcResult);
    await fetchLogic("dashboard/failTC", setFailTCList);
    await fetchLogic("dashboard/failSession", setFailSession);
    await fetchLogic("dashboard/mostTcPercent", setMostTcPercent);
  }

  const fetchOutlookFlag = async () => {
    const cookieValue = await getNameCookie();
    setUserNameCookie(cookieValue);
    fetchLogic(`setting/outlook?username=${cookieValue}`, setOutlookFlag);
  }

  const fetchIntervalTime = () => {
    try {
      fetchLogic('setting/intervalTime', setIntervalTime);
    } catch (error) {
      console.log('데이터 가져오기 실패 : ', error);
    }
  };

  const fetchData = async () => {
    if (userNameCookie === undefined) {
      return;
    }

    try {

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
          color={'#272263'}
        >
          보안성 평가 Dashboard
        </Text>
        {/*        <Select
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
        </Select>*/}
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, '2xl': 4 }}
        gap="20px"
        mb='15px'
        h={{ base: '400px', md: '190px', lg: '190px', '2xl': '95px' }}
      >
        {failSession !== undefined && (
          <>
            <SessionCount
              startContent={<IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="32px" h="32px" as={MdPrint} color={'#F79256'} />} />} result='총' data={failSession.all_count} />
            <SessionCount
              startContent={<IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="32px" h="32px" as={MdPrint} color={'#F79256'} />} />} result='실패' data={failSession.failSession_count} />
            <SessionCount
              startContent={<IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="32px" h="32px" as={MdPrint} color={'#F79256'} />} />} result='성공' data={failSession.succSession_count} />
            <SessionCount
              startContent={<IconBox
                w="56px"
                h="56px"
                bg={boxBg}

                icon={<Icon w="32px" h="32px" as={MdPrint} color={'#F79256'} />} />} data={failSession.failSession_count} />
          </>
        )}
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, '2xl': 2}}
        gap={'20px'}
        w={'100%'}
        h={{ base: +secondBoxHeights * 3, '2xl': secondBoxHeights }}
        mb={'20px'}
      >
        <TcResult data={tcResult} />
        <MostTcPercent data={mostTcPercent} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2, '2xl': 2 }} gap="20px" mb="20px" h={{ base: '350px', md: '530px', lg: '530px', '2xl': '350px' }}>
        {/* <ComplexTable tableData={comp[0]}></ComplexTable> */}
        <FailTCTable tableData={failTCList}></FailTCTable>
        <MostTcTable tableData={mostTcList}></MostTcTable>
        {/* <Box display={outlookFlag ? "" : "none"}><ComplexTable tableData={comp[2]}></ComplexTable></Box> */}
        {/* <ComplexTable tableData={comp[3]}></ComplexTable> */}
      </SimpleGrid>
    </Box>
  );
}
