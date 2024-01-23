import {
  Flex,
  Box,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Select,
  ButtonProps,
  IconButton,
  Input,
  Tooltip,
  Stack,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Grid,
} from '@chakra-ui/react';
import * as React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { Paginate } from 'react-paginate-chakra-ui';
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import { FaSave, FaSortDown, FaSortUp } from 'react-icons/fa';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import { RiFileExcel2Fill } from 'react-icons/ri';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function CheckTable(
  props: {
    tableData: any; setTableData:any; name: any; rows: any; setRows: any; page: any; setPage: any; sorting: any; setSorting: any; search: any; setSearch: any; 
    searchResult: any; setSearchResult: any; searchComfirm: boolean; setSearchComfirm: any; },
  { children }: { children: React.ReactNode },
) {
  const { tableData, setTableData, name, rows, setRows, page, setPage, sorting, setSorting, search, setSearch, searchResult, setSearchResult, searchComfirm, setSearchComfirm, } = props;
  const chname = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
  const [data, setData] = React.useState(() => {
    return tableData[0] !== undefined && tableData[0];
  });
  const [categoryFlag, setCategoryFlag] = React.useState<boolean>(false); // network, media, outlook, print tab 이동시 error 처리 위해 만든 변수
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [checkedRows, setCheckedRows] = React.useState<{
    [key: string]: boolean;
  }>({});

  // AlertDialog 위한 State
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const query = React.useRef('contents='+name+'&page='+page+'&pageSize='+rows+'&sorting='+(sorting[0]?.id ?? '')+'&desc='+(sorting[0]?.desc ?? '')+'&category='+search+'&search='+searchResult);
  const keys = React.useRef(
    tableData[0] !== undefined &&
    tableData[0] !== null &&
    tableData[0].length !== 0 &&
    Object.keys(tableData[0][0]));

  let i: number;
  let str: string = '';
  let columns = [];

  // TanStack Table
  // columns table Create
  i = 0;
  while (true) {
    if (tableData[0] === undefined) break;
    if (keys.current.length === undefined) break;
    if (i >= keys.current.length) break;
    str = keys.current.at(i);
    let headerStr = str.length >= 5 ? str.slice(0, 3) + '...' : str;

    // CheckBox
    if (i === 0) {
      columns.push(
        columnHelper.accessor(str, {
          id: 'check',
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              선택
            </Text>
          ),
          cell: (info: any) => {
            return (
              <Flex align="center" justifyContent="center">
                {tableData[0][0].id !== '' ? (
                  <Checkbox
                    justifyContent="center"
                    defaultChecked={false}
                    colorScheme="brandScheme"
                    // me="10px"
                    id={info.getValue()}
                    name={info.getValue()}
                    isChecked={checkedRows[info.row.original.id] || false}
                    onChange={() => handleCheckbox(info.row.original.id)}
                  />
                ) : (
                  <></>
                )}
              </Flex>
            );
          },
        }),
      );
    } else {
      // Tables Data
      columns.push(
        columnHelper.accessor(str, {
          id: str,
          header: () => {
            return <></>;
          },
          cell: (info: any) => {
            return (
              <Tooltip label={info.getValue()}>
                <Text
                  color={textColor}
                  fontSize="xs"
                  fontWeight="700"
                  width="0px"
                >
                  {info.getValue() !== undefined &&
                    info.getValue() !== null &&
                    // info.getValue()
                    (info.column.id === 'Accurancy' && tableData[0][0].id !== ''
                      ? info.getValue() === 100
                        ? '정탐'
                        : '확인필요'
                      : info.column.id === 'Time'
                      ? 
                      // info.getValue().slice(0, 9)
                      info.getValue()
                      : info.getValue().length >= 7
                      ? 
                      // info.getValue().slice(0, 7) + '...'
                      info.getValue()
                      : info.getValue())
                      }
                </Text>
              </Tooltip>
            );
          },
        }),
      );
    }

    i++;
  }

  React.useEffect(() => {
    console.log('name : ', name);
    
    getNameCookie().then((username) => {
      query.current = 'contents='+name+'&page='+page+'&pageSize='+rows+'&sorting='+(sorting[0]?.id ?? '')+'&desc='+(sorting[0]?.desc ?? '')+'&category='+search+'&search='+searchResult+'&username='+username;
    });
  }, []);

  React.useEffect(() => {
    setData(tableData[0]);
    
    keys.current =
    tableData[0] !== undefined &&
    tableData[0] !== null &&
    tableData[0].length !== 0 &&
    Object.keys(tableData[0][0]);
    if(categoryFlag === false) 
      setSearch(keys.current[1]);
    
  }, [tableData]);

  // network, media, outlook, print 탭 변경
  React.useEffect(() => {
    setPage(0);
    setCategoryFlag(false);
    getNameCookie().then((username) => {
      query.current = 'contents='+name+'&page='+page+'&pageSize='+rows+'&sorting='+(sorting[0]?.id ?? '')+'&desc='+(sorting[0]?.desc ?? '')+'&category='+search+'&search='+searchResult+'&username='+username;
    });
  }, [name, page, rows, search, searchResult]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (keys.current !== undefined && categoryFlag === false) {
    setCategoryFlag(true);  
  }

  // Paging
  const handlePageClick = (p: number) => {
    setPage(p);
  };

  // handlers
  // 갯수
  const handleRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(e.target.value, 10); // Assuming you want to parse the value as an integer
    setRows(newRows);
  };

  // 검색 카테고리
  const handleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch(e.target.value);
  };

  // 검색어 변경
  const handleSearchResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchResult(e.target.value);
  };

  // 검색어에서 Enter Key
  const handleSearchResultKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      setSearchComfirm(!searchComfirm);
    }
  };

  // 검색
  const handleSearchComfirm = () => {
    setSearchComfirm(!searchComfirm);
  };

  // checkBox 1개 클릭
  const handleCheckbox = (rowId: string) => {
    setCheckedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  // checkBox All 클릭
  const handleSelectAll = () => {
    let select: any = {};
    if (selectAll === false) {
      data !== undefined &&
        data.map((val: any) => {
          select = {
            ...select,
            [val.id]: true,
          };
        });
      setSelectAll(true);
    } else {
      select = {
        ...checkedRows,
      };
      const keys: any = Object.keys(select);
      keys.map((key: any) => (select[key] = false));

      setSelectAll(false);
    }

    setCheckedRows(select);
  };

  // 데이터 삭제
  const handleDeleteSelectedRows = () => {
    const selectedRows = Object.keys(checkedRows).filter(
      (rowId) => checkedRows[rowId],
    );

    if (selectedRows.length === 0) {
      setIsOpen(true);
    } else {
      removeData(selectedRows);
    }
  };

  // fetch
  // 더미 데이터 생성
  // 추후 hidden(Test용으로 dummy data를 만들기 때문에)
  const handleInsertData = async () => {
    const dummyDataCount = 30; // dummyData 만들기 위한 count
    try {
      const response = await fetch(`${backIP}/api/dummy?`+ query.current + "&count=" + dummyDataCount);

      const result = await response.json();      
      setTableData(result);
      
    } catch(error) {
      console.error("insertData 에러 발생");
    }
  }

  
  // 데이터 삭제
  const removeData = async (selectedRows: string[]) => {    
    try {
      const response = await fetch(`${backIP}/api/rm?`+query.current,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedRows),
        },
      );
      
      const result = await response.json();      
      setTableData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

// 액셀 데이터 저장
const handleSaveExcel = async () => {
  try {
    const response = await fetch(`${backIP}/excel/dwn?` + query.current);
    
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // a 태그를 만들어서 다운로드
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // 브라우저에 생성된 URL 해제
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


  // html
  if (data === undefined || data === null || keys.current === undefined) {
    return (
      <Stack direction="row" spacing={4} align="center">
        <Button
          isLoading
          loadingText="Loading"
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="start"
        >
          Submit
        </Button>
      </Stack>
    );
  } else {
    return (
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: 'scroll', lg: 'scroll' }}
        height='90vh'
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            mb="4px"
            fontWeight="700"
            lineHeight="100%"
          >
            {chname}
          </Text>
          <Box>
            <Flex>
            <IconButton
                aria-label="Save Excel"
                icon={<RiFileExcel2Fill></RiFileExcel2Fill>}
                onClick={handleSaveExcel}
              />
              <IconButton
                aria-label="Edit database"
                icon={<EditIcon />}
                onClick={handleInsertData}
              />
              <IconButton
                aria-label="Delete database"
                icon={<DeleteIcon />}
                onClick={handleDeleteSelectedRows}
                _hover={{ cursor: 'pointer' }}
              />
              {isOpen === true ? (
                <AlertDialog
                  isOpen={isOpen}
                  onClose={onClose}
                  leastDestructiveRef={cancelRef}
                >
                  <AlertDialogOverlay />
                  <AlertDialogContent
                  backgroundColor='#FEEFEE'
                  width='300px'
                  height='150px'
                  borderRadius='15px'
                   >
                    <AlertDialogBody>
                      <Grid>
                        <Alert status="error">
                          <AlertIcon
                          boxSize='9'
                           />
                          <AlertTitle fontSize='sm'>
                            삭제 항목이 없습니다.
                          </AlertTitle>
                        </Alert>
                        <Button ref={cancelRef} onClick={onClose}
                        // backgroundColor='red.300'
                        fontWeight='700'
                        fontSize='sm'
                        >
                          확인
                        </Button>
                      </Grid>
                    </AlertDialogBody>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <></>
              )}
              <Select
                fontSize="sm"
                variant="subtle"
                value={rows}
                onChange={handleRows}
                width="unset"
                fontWeight="700"
              >
                <option value="20">20개</option>
                <option value="50">50개</option>
                <option value="100">100개</option>
              </Select>
              <Select
                fontSize="sm"
                variant="subtle"
                value={search}
                onChange={handleSearch}
                width="unset"
                fontWeight="700"
              >
                {tableData[0] !== undefined &&
                  keys.current.map((data, index) => {
                    if (index !== 0) {
                      return (
                        <option value={data} key={data}>
                          {data}
                        </option>
                      );
                    }
                  })}
              </Select>
              <Input
                placeholder="검색"
                id="searchText"
                name="searchText"
                value={searchResult}
                onChange={handleSearchResult}
                onKeyDown={handleSearchResultKeyDown}
              />
              <IconButton
                aria-label="Search database"
                icon={<SearchIcon />}
                onClick={handleSearchComfirm}
              />
            </Flex>
          </Box>
        </Flex>
        <Flex
        flexDirection="column" // 수직 중앙 정렬
        alignItems="center" // 수평 가운데 정렬
        justifyContent="center" // 수평 가운데 정렬
        >
          <Box
              width='100%'>
            <Table
              variant="simple"
              color="gray.500"
              mb="24px"
              mt="12px"
              id="checkTable"
              width='100%'
            >
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      let headerText = header.id;
                        // header.id.length >= 7
                        //   ? header.id.slice(0, 5) + '...'
                        //   : header.id;
  
                      return (
                        <Th
                          key={header.id}
                          colSpan={header.colSpan}
                          borderColor={borderColor}
                          cursor="pointer"
                          // whiteSpace="nowrap"
                          overflow='hidden'
                          textOverflow='ellipsis'
                          pt='5px' pb='5px'
                          paddingInlineEnd='0px'
                          onClick={
                            header.id !== 'check'
                              ? header.column.getToggleSortingHandler()
                              : handleSelectAll
                          }
                        >
                          <Tooltip label={header.id}>
                            <Flex
                              // justifyContent="space-between"
                              align="center"
                              fontSize={{ sm: '10px', lg: '12px' }}
                              color="gray.400"
                            >
                              {flexRender(headerText, header.getContext())}
                              {{
                                asc: <FaSortUp />,
                                desc: <FaSortDown />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </Flex>
                          </Tooltip>
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table !== undefined &&
                  table
                    .getRowModel()
                    .rows.slice(0, rows)
                    .map((row) => {
                      return (
                        <Tr key={row.id}
                        >
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <Td
                                key={cell.id}
                                fontSize={{ sm: '14px' }}
                                borderColor="transparent"
                                whiteSpace="nowrap"
                                overflow='hidden'
                                textOverflow='ellipsis'
                                pt='5px' pb='5px'
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
            <Flex justifyContent="center">
              <Paginate
                page={page}
                margin={3}
                shadow="lg"
                fontWeight="bold"
                variant="outline"
                colorScheme="blue"
                border="2px solid"
                count={tableData[1] !== undefined ? tableData[1][0].count : '1'}
                pageSize={rows}
                onPageChange={handlePageClick}
              ></Paginate>
            </Flex>
          </Box>
        </Flex>
      </Card>
    );
  }
}
