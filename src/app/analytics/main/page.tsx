'use client';

import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Card,
  Heading,
  Checkbox,
  Button,
} from '@chakra-ui/react';
// Assets
import { useEffect, useState } from 'react';
import MiniCalendar from 'components/analytics/MiniCalendar';
import { backIP } from 'utils/ipDomain';
import { fetchLogic } from 'utils/fetchData';
import Keywords from 'components/analytics/keywords';
import ScoringTable from 'components/analytics/ScoringTable';
import ShowDetail from 'components/analytics/ShowDetail';
import { KeywordState } from 'utils/interface';
import IconBox from 'components/icons/IconBox';
import { Icon, InfoIcon, NotAllowedIcon, QuestionIcon, SettingsIcon, TimeIcon, ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { MdBlock, MdCancel, MdCheckCircle, MdHelp, MdOutlineError, MdOutlineErrorOutline} from 'react-icons/md';
import { AiFillMediumCircle, AiOutlineCopyrightCircle } from "react-icons/ai";
import { TbCircleLetterC, TbCircleLetterH, TbCircleLetterL, TbCircleLetterM } from "react-icons/tb";


export default function Default() {
  // Chakra Color Mode
  // 한국 시간대의 현재 날짜 및 시간 가져오기
  let today = new Date();
  let realDay = new Date();
  realDay.setDate(today.getDate() - 1);
  let stDate = new Date();
  today.setDate(today.getDate() - 1);
  stDate.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState<string>(formatDateToDateTimeLocal(stDate));
  const [endDate, setEndDate] = useState<string>(formatDateToDateTimeLocal(realDay));
  const [checkedKeywords, setCheckedKeywords] = useState<KeywordState>({});
  const [data, setData] = useState<[]>([]);
  const [detailData, setDetailData] = useState<any>();
  const [dateSelect, setDateSelect] = useState('');
  const [currentPcname, setCurrentPcname] = useState('');
  const [detail, setDetail] = useState<boolean>(false);
  const [title, setTitle] = useState('7d');

  useEffect(() => {
    submitData();
    
  }, [startDate,endDate,checkedKeywords]);

  const submitData = async () => {
    const response = await fetch(`${backIP}/analysis/select`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        keywords : checkedKeywords
      })
    })
    if (response.ok) {
      const result = await response.json();
      setData(result);
    }
  }

  const detailSubmit = async(pcGuid:string,pcName:string) => {
    setCurrentPcname(pcName);
    const response = await fetch(`${backIP}/analysis/detail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        pc_guid : pcGuid
      })
    });

    if(response.ok) {
      const result = await response.json();      
      setDetailData(result);
    }
  }

  const made = async () => {
    const response = await fetch(`${backIP}/analysis/insert`, {
      method: 'get'
    })
  }

  // 날짜 객체를 YYYY-MM-DDTHH:mm 형식의 문자열로 변환하는 함수
  function formatDateToDateTimeLocal(date: Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함
    const day = ('0' + date.getDate()).slice(-2);
    
    return `${year}-${month}-${day}`;
  }

  return (
    <Box pt={{ base: '0px', md: '0px' }}>
      <MiniCalendar startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate} formatDateToDateTimeLocal={formatDateToDateTimeLocal} dateSelect={dateSelect} setDateSelect={setDateSelect}
        title = {title} setTitle={setTitle} ></MiniCalendar>
      <Keywords checkedKeywords={checkedKeywords} setCheckedKeywords={setCheckedKeywords}></Keywords>
      {/* <Button onClick={made}>만들기</Button> */}
      <Flex mt={'3'} h={'75vh'}>
        <ScoringTable tableData={data} setDetail = {setDetail} detailSubmit = {detailSubmit} title={title}
        startDate={startDate} endDate={endDate} checkedKeywords={checkedKeywords}></ScoringTable>
        {
          detail === true ? 
          <ShowDetail startDate={startDate} endDate={endDate} detailData = {detailData} currentPcname = {currentPcname} ></ShowDetail>
          : <></>
        }
            {/* 매우 위험 Critical */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterC } color={'#D32F2F'} />
              }
            />
            {/* 위험 high */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterH } color={'#E57373'} />
              }
            />
            {/* 경고 Medium */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterM } color={'#FFA000'} />
              }
            />
            {/* 주의 Low */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterL } color={'green.400'} />
              }
            />
            {/* 안전 Safe */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={MdOutlineErrorOutline } color={'blue.500'} />
              }
            />
      </Flex>
    </Box>
  );
}
