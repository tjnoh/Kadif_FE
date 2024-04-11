'use client';

import React, { useEffect } from 'react';
// Chakra imports
import {
  Card,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
// Assets
import { MdOutlineRemoveRedEye, MdPlaylistAddCheckCircle } from 'react-icons/md';
import { backIP } from 'utils/ipDomain';
import { useRouter } from 'next/navigation';
import { getNameCookie } from 'utils/cookie';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';

interface Column {
  Header: string;
  accessor: string;
}

interface Row {
  id: number;
  name: string;
  age: number;
  parent: string;
}

interface Props {
  columns: Column[];
  data: Row[];
}

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');

  const [serverPort, setServerPort] = React.useState();
  const [ret, setRet] = React.useState();
  const [auto, setAuto] = React.useState();
  const [interval, setInterval] = React.useState();
  const [keywordList, setKeywordList] = React.useState("");
  const [userNameCookie, setUserNameCookie] = React.useState<string>();
  const router = useRouter();

  // Alert 관련
  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = React.useRef();

  React.useEffect(() => {
    fetchSettings();
  }, [])

  const fetchSettings = async () => {
    try {
      const cookieValue = await getNameCookie();
      setUserNameCookie(cookieValue);
      const response = await fetch(`${backIP}/setting/servers?username=${cookieValue}`);
      const result = await response.json();
      setServerPort(result.serverPort);
      setRet(result.ret);
      setAuto(result.auto);
      setInterval(result.interval);
      setKeywordList(result.svr_patterns_list);
    } catch (error) {
      console.log("fetch 에러 : " + error);
    }
  }

  const handleServerPort = (e: any) => {
    const portValue = e.target.value;
    setServerPort(portValue);
  }

  const handleRet = (e: any) => {
    const retValue = e.target.value;
    setRet(retValue);
  }

  const handleauto = (e: any) => {
    const isChecked = e.target.checked;
    setAuto(isChecked);
  }

  const handleInterval = (e: any) => {
    const intervalValue = e.target.value;
    setInterval(intervalValue);
  }

  const handleKeywordListChange = (e: any) => {
    setKeywordList(e.target.value);
  };

  const alertOn = () => {
    setIsOpenAlert(true);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onCloseAlert();
    const response = await fetch(`${backIP}/setting/server?username=${userNameCookie}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serverPort: serverPort,
        ret: ret,
        auto: auto,
        interval: interval,
        keywordList: keywordList,
      })
    })

    if (response.ok) {
      window.location.reload();
    } else {
      const result: any = await response.json();
      alert("에러 확인 : " + result.error);
    }
  }

  return (
    <Card height="100%">
      <Flex
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="80vh"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={'50px'}
      >
        <ComplexTable tableData={tableDataComplex}></ComplexTable>
      </Flex>
    </Card>
  );
}