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
  Table,
  Tbody,
  Td,
  Text,
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
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { gParameterAlias, parameterAlias } from 'utils/alias';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import MemoizedInput from './MemorizedInput';

export default function ModalParameter(props: { isOpen: any; onClose: any; paramData:any; setParamData:any; clickParameter:any; }) {
  const { isOpen, onClose, paramData, setParamData, clickParameter } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnWidths, setColumnWidths] = useState<{
    [key: string]: { name: string; align: string; width: number };
  }>(parameterAlias);

  console.log('paramData',paramData);
  console.log('clickParameter',clickParameter);
  


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
  const keys = paramData !== undefined && paramData !== null && paramData.length >= 1 ? Object.keys(paramData[0]) : '';

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
              onChange={(e) => onChangeValue(e,info.row.id)}
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
    data:paramData,
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

  const onChangeValue = (e:React.ChangeEvent<HTMLInputElement>, num:any) => {
    const chnData = paramData.map((item:any, index:any) => {
      if (index === +num) {
          // num 인덱스의 요소를 복사하고 value를 업데이트합니다.
          return {...item, value: e.target.value};
      }
      // 다른 요소들은 그대로 반환합니다.
      return item;
    });
    setParamData(chnData);
  };

  const onCloseParameter = () => {

    onClose();
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
                {clickParameter?.tc_name !== undefined &&
                clickParameter?.tc_name !== null
                  ? clickParameter?.tc_name
                  : clickParameter?.tc_group}
              </Text>
              <Text
                w={'100%'}
                height={'max-content'}
                fontSize={'md'}
                fontWeight={'bold'}
                mb={'10px'}
              >
                {clickParameter?.tc_context !== undefined &&
                clickParameter?.tc_context !== null
                  ? clickParameter?.tc_context
                  : ''}
              </Text>
            </Box>
            <Table
              variant="simple"
              color="gray.500"
              id="checkTable"
              w={'95%'}
              m={'12px auto 24px'}
              borderTop={'2px solid black'}
            >
              <Thead>
                {table?.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, i) => {
                      let headerText = parameterAlias[header.id].name;
                      return (
                        <Th
                          width={parameterAlias[header.id].width}
                          key={header.id}
                          id={header.id}
                          colSpan={header.colSpan}
                          border={'1px solid #ccc'}
                          backgroundColor={'#F0F0F0'}
                          cursor="pointer"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          pt="5px"
                          pb="5px"
                          pl="10px"
                          pr="10px"
                          paddingInlineEnd="0px"
                          position={'relative'}
                        >
                          <Flex
                            justifyContent="center"
                            align="center"
                            fontSize={{ sm: '12px', lg: '14px' }}
                            color="black"
                            fontWeight={'bold'}
                          >
                            <Box
                              textAlign={'center'}
                              onClick={header.column.getToggleSortingHandler()}
                              w={'85%'}
                            >
                              {flexRender(headerText, header.getContext())}
                            </Box>
                            {{
                              asc: <FaSortUp />,
                              desc: <FaSortDown />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </Flex>
                          {header.column.getCanResize() && (
                            <Box
                              {...headerProps(header.id)}
                              className={`resizer ${
                                header.column.getIsResizing()
                                  ? 'isResizing'
                                  : ''
                              }`}
                            ></Box>
                          )}
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {paramData !== undefined &&
                  table
                    .getRowModel()
                    .rows.slice(0, paramData !== undefined ? paramData.length : 10)
                    .map((row) => {
                      return (
                        <Tr
                          key={row.id}
                          borderBottom={'2px solid #f0f0f0'}
                          _hover={{ backgroundColor: '#F2F7FF' }}
                        >
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <Td
                                key={cell.id}
                                fontSize={{ sm: '14px' }}
                                border={'1px solid #ccc'}
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                // pt='5px' pb='5px'
                                p="2px"
                                cursor={'pointer'}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
