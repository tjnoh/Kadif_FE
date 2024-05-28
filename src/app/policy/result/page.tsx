"use client"
import { Box, Card, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/react-table';
import { backIP } from 'utils/ipDomain';
import PolicyLog from 'views/admin/dataTables/components/PolicyLog';
import PolicyActive from 'views/admin/dataTables/components/PolicyActive';
import IconBox from 'components/icons/IconBox';
import { Icon } from '@chakra-ui/icons';
import { IoCloseOutline, IoStopCircleOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

interface LogEntry {
  log_time: string; // 로그 시간 (ISO 문자열로 가정)
  log_tc_name: string; // 테스트 케이스 이름
  log_text: string; // 로그 텍스트
}

export default function DataTables() {
  const [data, setData] = useState<[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tab, setTab] = useState(1);
  const policyName = searchParams.get('policyname');
  const [LogData, setLogData] = useState<LogEntry[]>([]);
  const [responseData, setResponseData] = useState<[]>([]);
  const [lastFetchedTime, setLastFetchedTime] = useState(null);

  const handleTabChange = (value: any) => {
    setTab(value);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${backIP}/session/data?sid=${searchParams.get('sid')}&lastFetchedTime=${lastFetchedTime}`);
      const data = await response.json();
      const newLogs:LogEntry[] = data[1];
      setData(data);
      setLogData((prevLogs) => [...prevLogs, ...newLogs]);
      setResponseData(data[2]);

      if(data[0][0].s_enabled === 3) {
        clearInterval(intervalId.current);
        intervalId.current = null; // 타이머가 멈추면 intervalId를 초기화합니다.
        //타이머를 멈추고 fetch로 demon process를 멈추는 코드 만들기
        Swal.fire({
          title: '보안성 평가 완료',
          html: `<div style="font-size: 14px;">보안성 평가 종료</div>`,
          confirmButtonText: '닫기',
          confirmButtonColor: '#3965FF',
          focusConfirm: false,
          customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            loader: 'custom-content-class',
            confirmButton: 'custom-confirm-button-class'
          },
        })
      }
      if (data[1].length > 0) {
        setLastFetchedTime(data[1][data[1].length - 1].log_time);
      }
    } catch (error) {
      console.log("데이터 가져오기 실패 : ", error);
    }
  };

  // intervalId를 React.MutableRefObject<NodeJS.Timeout | null> 타입으로 정의합니다.
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 타이머 시작
    intervalId.current = setInterval(() => {
      fetchData();
    }, 2000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => {
      // intervalId.current가 null이 아니고 타이머 ID가 있는 경우에만 clearInterval을 호출합니다.
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, [lastFetchedTime]);

  // 멈추기 버튼 클릭 핸들러
  const handleStopButtonClick = () => {
    if (intervalId.current !== null) {
      //타이머를 멈추고 fetch로 demon process를 멈추는 코드 만들기
      sessionStop();
      clearInterval(intervalId.current);
      intervalId.current = null; // 타이머가 멈추면 intervalId를 초기화합니다.
    }
  };

  const sessionStop = async () => {
    const response = await fetch(`${backIP}/session/stop?sid=${searchParams.get('sid')}`);
    if(response.ok){
      Swal.fire({
        title: '보안성 평가 중지',
        html: `<div style="font-size: 14px;">보안성 평가를 중지하였습니다.</div>`,
        confirmButtonText: '닫기',
        confirmButtonColor: '#EE5D50',
        focusConfirm: false,
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          loader: 'custom-content-class',
          confirmButton: 'custom-confirm-button-class'
        },
      });
    } else {  
      alert('프로그램 오류');
    }
  }

  // 돌아가기 버튼 클릭 핸들러
  const handleReturnListButtonClick = () => {
    router.push('/data/tables');
  };

  return (
    <Card p={'8'} h={'93vh'} minH={'85vh'} maxH={'93vh'}>
      <Flex direction="column">
        <Flex justifyContent={'space-between'}>
          <Text fontSize="2xl" ms="24px" fontWeight="700">
          보안성 평가 정책 명 : {policyName}
          </Text>
          <Flex justifyContent={'end'}>
            <IconBox
              w="50px"
              h="32px"
              aria-label="Stop Session"
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  display={intervalId.current === null ? 'none' : ''}
                  as={IoStopCircleOutline}
                  _hover={{ cursor: 'pointer' }}
                onClick={handleStopButtonClick}
                />
              }
            />
            <IconBox
              w="50px"
              h="32px"
              aria-label="return list"
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={IoCloseOutline}
                  _hover={{ cursor: 'pointer' }}
                  onClick={handleReturnListButtonClick}
                />
              }
            />
          </Flex>
        </Flex>
        <Flex
          mt="45px"
          justifyContent="start"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          <Flex
            align="center"
            me="20px"
            cursor='pointer'
          >
            <Box
              onClick={() => handleTabChange(1)}
              fontWeight={tab === 1 ? '700' : '500'}
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}
              backgroundColor={tab === 1 ? 'white' : '#eee'}
              color={tab === 1 ? '#3DA2EE' : '#939CA9'}
              border={tab === 1 ? '0.5px solid #3DA2EE' : undefined}
              borderBottom={tab === 1 ? '2px solid #3DA2EE' : '2px solid #939CA9'}
              _hover={{
                fontWeight: '700',
                background: 'white',
                border: '0.5px solid #3DA2EE',
                borderBottom: '2px solid #3DA2EE',
                color: '#3DA2EE'
              }}
            >
              보안성 평가 수행 로그
            </Box>
            <Box
              onClick={() => handleTabChange(2)}
              fontWeight={tab === 2 ? '700' : '500'}
              padding={'10px 20px'}
              borderRadius={'10px 10px 0px 0px'}
              backgroundColor={tab === 2 ? 'white' : '#eee'}
              color={tab === 2 ? '#3DA2EE' : '#939CA9'}
              border={tab === 2 ? '0.5px solid #3DA2EE' : undefined}
              borderBottom={tab === 2 ? '2px solid #3DA2EE' : '2px solid #939CA9'}
              _hover={{
                fontWeight: '700',
                background: 'white',
                border: '0.5px solid #3DA2EE',
                borderBottom: '2px solid #3DA2EE',
                color: '#3DA2EE'
              }}
            >
              보안성 평가 결과 집계
            </Box>
          </Flex>
        </Flex>
        <Box border={'2px solid #eee'}>
          {tab === 1 ?
            <PolicyLog tableData={LogData}>
            </PolicyLog>
            :
            <PolicyActive tableData={responseData}>
            </PolicyActive>}
        </Box>
      </Flex>
    </Card>
  );
}
