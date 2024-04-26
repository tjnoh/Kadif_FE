// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
// Custom components
import { useEffect, useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { gParameterAlias, parameterAlias } from 'utils/alias';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import MemoizedInput from './MemorizedInput';

export default function ModalParameter(props: {
  isOpen: any;
  onClose: any;
  paramData: any;
  setParamData: any;
  clickParameter: any;
  treeData: any;
  setTreeData:any;
}) {
  const { isOpen, onClose, paramData, setParamData, clickParameter, treeData, setTreeData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnWidths, setColumnWidths] = useState<{
    [key: string]: { name: string; align: string; width: number };
  }>(parameterAlias);

  const groupKeys: any =
    paramData !== undefined && paramData !== null ? Object.keys(paramData) : '';
  const [keyData, setKeyData] = useState<any>();
  const [selectData, setSelectData] = useState<any>();

  useEffect(() => {
    if(groupKeys !== undefined && groupKeys !== null) {
      setSelectData(groupKeys[0]);
    }
  }, [isOpen]);

  useEffect(() => {
    if(paramData !== undefined && paramData !== null) {
      Object.values(paramData).map((data:any,i:any) => {
        if(data.selected) {
          setSelectData(groupKeys[i]);
        }
      });
    }
    
    setKeyData(groupKeys);
  }, [groupKeys.length]);

  // TanStack Table
  // columns table Create
  let i: number;
  let str: string = '';
  let columns: any = [];
  const columnHelper = createColumnHelper();

  // 마우스 드래그로 너비 조절 핸들러
  const handleColumnResize = (columnId: string, initialPosition: number) => {
    const startDrag = (e: MouseEvent) => {
      const delta = e.clientX - initialPosition;

      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [columnId]: {
          ...prevWidths[columnId],
          width: Math.max(prevWidths[columnId].width + delta, 30), // 최소 너비를 50으로 설정
        },
      }));
      initialPosition = e.clientX;
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', startDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', startDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  // 컬럼 헤더에 마우스 다운 이벤트 추가 (예시)
  const headerProps = (columnId: string) => ({
    onMouseDown: (e: React.MouseEvent) => {
      handleColumnResize(columnId, e.clientX);
    },
  });

  i = 0;
  const keys =
    paramData !== undefined && paramData !== null && paramData.length >= 1
      ? Object.keys(paramData[0])
      : '';

  while (true) {
    if (keys === '') break;
    if (i >= keys.length) break;
    str = keys.at(i);

    // Tables Data
    columns.push(
      columnHelper.accessor(str, {
        id: str,
        header: () => {
          return <></>;
        },
        cell: (info: any) => {
          return info.column.id === 'value' ? (
            <MemoizedInput
              id={info.column.id}
              value={paramData[info.row.id].value}
              onChange={(e) => onChangeValue(e, info.row.id)}
            />
          ) : (
            <Tooltip label={info.getValue()}>
              <Text
                color={'secondaryGray.900'}
                // fontSize="s"
                fontSize="13px"
                fontWeight="400"
                maxWidth="100%" // 또는 적절한 최대 너비 설정
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                display="inline-block" // 또는 "block"
              >
                {info.getValue()}
              </Text>
            </Tooltip>
          );
        },
      }),
    );

    i++;
  }

  const table = useReactTable({
    data: paramData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, num: any) => {
    const chnData = paramData.map((item: any, index: any) => {
      if (index === +num) {
        // num 인덱스의 요소를 복사하고 value를 업데이트합니다.
        return { ...item, value: e.target.value };
      }
      // 다른 요소들은 그대로 반환합니다.
      return item;
    });
    setParamData(chnData);
  };

  const onCloseParameter = () => {
    const chnParam = {...paramData};

    // 나머지 속성을 false로 변경
      for (const key in chnParam) {
        if (key !== selectData) {
          chnParam[key].selected = false;
        } else {
          chnParam[key].selected = true;
        }
      }
      
    const chnData = treeData.map((data:any) => {
      if(data.tc_group === clickParameter?.tc_group) {
        return { ...data, tc_parameter : JSON.stringify(chnParam) };
      } else{
        return data;
      }
    });

    setTreeData(chnData);
    
    onClose();
  };

  const onChangeGP = (e:any) => {
    const chnParams: any = { ...paramData };

    if (chnParams.hasOwnProperty(selectData)) {
      chnParams[selectData].selected = true;
      chnParams[selectData].messageID = e.target.value;
    }

    setParamData(chnParams);
  }

  const onChangeGPAuto = (e:any,index:any) => {
    const chnParams: any = { ...paramData };

    if (chnParams.hasOwnProperty(selectData)) {
      chnParams[selectData].selected = true;
      index === 0 ?
      chnParams[selectData].IP = e.target.value :
      chnParams[selectData].Port = e.target.value
    }

    setParamData(chnParams);
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onCloseParameter}
      size={'6xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box width="97%" height={'50vh'} overflow={'auto'}>
            <Box>
              <Text
                w={'100%'}
                height={'max-content'}
                fontSize={'xl'}
                fontWeight={'bold'}
                mb={'10px'}
              >
                {clickParameter?.tc_group} IVN 정보 입력
              </Text>
            </Box>

            <Box w={'100%'} h={'85%'} border={'2px solid #D0D0D0'} p={'20px'}>
              <Flex w={'100%'} h={'50px'} >
                <Text lineHeight={'35px'} fontWeight={'bold'}>IVN Media Type 선택</Text>
                {keyData !== undefined && keyData !== null && keyData !== '' ? (
                  <Select 
                  ml={'10px'}
                  w={'200px'}
                  defaultValue={selectData}
                  onChange={(e) => setSelectData(e.target.value)}>
                    {keyData?.map((data: any) => {
                      return <option key={data} value={data}>{data}</option>;
                    })}
                  </Select>
                ) : (
                  <></>
                )}
              </Flex>
              <Text lineHeight={'35px'} fontWeight={'bold'}>DUT 정보 입력 [예) {selectData === 'A-Ethernet' ? '127.0.0.1:5555' : '0x123:0x456'} ] </Text>
              {
                keyData?.includes(selectData) ? 
                <Box>
                  {
                    selectData === 'A-Ethernet' ? 
                    <Box w={'100%'}>
                      <Flex w={'100%'} mb={'10px'}>
                        <Text w={'50px'}>IP : </Text><Textarea value={paramData[selectData].IP} onChange={(e) => onChangeGPAuto(e,0)}>{paramData[selectData].IP}</Textarea>
                      </Flex>
                      <Flex>
                        <Text  w={'50px'}>Port : </Text><Textarea value={paramData[selectData].Port} onChange={(e) => onChangeGPAuto(e,1)}>{paramData[selectData].Port}</Textarea>
                      </Flex>
                    </Box>
                    : 
                    <Box>
                      <Textarea value={paramData[selectData].messageID} onChange={onChangeGP}>{paramData[selectData].messageID}</Textarea>
                    </Box>
                  }
                </Box>
                : <></>
              }
            </Box>

          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
