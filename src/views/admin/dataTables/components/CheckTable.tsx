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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
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
import { Paginate } from 'react-paginate-chakra-ui';
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import { FaCamera, FaSave, FaSortDown, FaSortUp } from 'react-icons/fa';
import { getNameCookie } from 'utils/cookie';
import { backIP, frontIP } from 'utils/ipDomain';
import { RiFileExcel2Fill, RiScreenshot2Fill } from 'react-icons/ri';
import { IoMdDownload } from 'react-icons/io';
import { MdOutlineWarning } from 'react-icons/md';
import { mediaAlias, networkAlias, outlookAlias, printAlias } from 'utils/alias';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function CheckTable(
  props: {
    tableData: any; setTableData: any; name: any; rows: any; setRows: any; page: any; setPage: any; sorting: any; setSorting: any; search: any;
    searchResult: any; setSearchResult: any; searchComfirm: boolean; setSearchComfirm: any;
    isOpen: any, onOpen: any, onClose: any
  },
  { children }: { children: React.ReactNode },
) {
  const { tableData, setTableData, name, rows, setRows, page, setPage, sorting, setSorting, search, searchResult, setSearchResult, searchComfirm, setSearchComfirm,
    isOpen, onOpen, onClose } = props;
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
  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = React.useRef();
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  const [selectedScreenshot, setSelectedScreenshot] = React.useState<string | null>(null);
  const [selectedDownload, setSelectedDownload] = React.useState<string | null>(null);
  const [screenshotDate, setScreenshotDate] = React.useState<string>();
  const query = React.useRef('contents=' + name + '&page=' + page + '&pageSize=' + rows + '&sorting=' + (sorting[0]?.id ?? '') + '&desc=' + (sorting[0]?.desc ?? '') + '&category=' + search + '&search=' + searchResult);
  const keys = React.useRef(
    tableData[0] !== undefined &&
    tableData[0] !== null &&
    tableData[0].length !== 0 &&
    Object.keys(tableData[0][0]));

  // useState => ui 화면에서 render가 잘 되게 하기위해 사용
  // search => useRef를 이용하여 변경 값을 바로 적용하게끔 사용
  const [searchValue, setSearchValue] = React.useState(search.current); // 렌더링 될 때 값이 바로 변경할 수 있도록 설정

  function formatDate(date: any): string {
    // date가 문자열인 경우에 대한 보완도 추가
    const parsedDate = typeof date === 'string' && date !== undefined ? new Date(date) : date;

    // 로컬 시간대로 형식화
    const localDateString = parsedDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });

    // 다시 Date 객체로 변환
    const localDate = new Date(localDateString);

    // 8시간을 더해주기
    localDate.setHours(localDate.getHours() + 9);

    const isoString = (localDate instanceof Date && !isNaN(localDate.getTime())) ? localDate.toISOString() : '';

    // ISO 문자열 변환
    const formattedDate = isoString
      .replace(/-/g, '/') // '-'를 '/'로 변경
      .replace('T', ' ') // 'T'를 공백으로 변경
      .replace(/\..*/, ''); // 소수점 이하 시간 제거
    
    
    // ISO 문자열로 반환
    return formattedDate;
  }

  const tableWidths = `header.id === 'Time' ? '8%' : header.id === 'Accurancy' ? '5%' : 'auto'`;

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
          id: 'id',
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
                    w={'100%'}
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
            const infoStr = info.column.id === 'Accurancy' && tableData[0][0].id !== '';
            
            return (
              info.column.id.toLowerCase() === 'screenshot' && tableData[0]?.ScreenShot !== '' ?
                <IconButton
                  aria-label="Screenshots"
                  icon={(info.getValue() !== undefined && info.getValue() !== null) ? <FaCamera></FaCamera> : <></>}
                  id={info.getValue()}
                  name={info.getValue()}
                  width='0px' height='0px'
                  onClick={handleShowScreenShots}
                /> :
                ((info.column.id.toLowerCase() === 'download' && data[0]?.DownLoad !== '' && data[0]?.DownLoad !== undefined) ||
                  (info.column.id.toLowerCase() === 'downloading' && data[0]?.Downloading !== '' && data[0]?.Downloading !== undefined)) ?
                  <IconButton
                    aria-label="Downloading"
                    icon={(info.getValue() !== undefined && info.getValue() !== null) ? <IoMdDownload></IoMdDownload> : <></>}
                    id={info.getValue()}
                    name={info.getValue()}
                    width='0px' height='0px'
                    onClick={handleDownload}
                  />
                  :
                  <Tooltip label={info.getValue() !== undefined && info.getValue() !== null && 
                                  (info.column.id === 'Accurancy' && tableData[0][0].id !== ''
                                  ? info.getValue() === 100
                                    ? '정탐'
                                    : '확인필요'
                                  : ((info.column.id === 'Time') ? formatDate(info.getValue()) : info.getValue())
                                )}>
                    <Box
                      color={textColor}
                      fontSize="xs"
                      fontWeight="700"
                      maxWidth="100%" // 또는 적절한 최대 너비 설정
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      display="inline-block" // 또는 "block"
                    >
                      {info.getValue() !== undefined &&
                        info.getValue() !== null &&
                        // info.getValue()
                        (info.column.id === 'Accurancy' && tableData[0][0].id !== ''
                          ? info.getValue() === 100
                            ? '정탐'
                            : '확인필요'
                          : ((info.column.id === 'Time') ? formatDate(info.getValue()) : info.getValue())
                        )
                      }
                    </Box>
                  </Tooltip>
            );
          },
        }),
      );
    }

    i++;
  }

  React.useEffect(() => {
    setData(tableData[0]);

    keys.current =
      tableData[0] !== undefined &&
      tableData[0] !== null &&
      tableData[0].length !== 0 &&
      Object.keys(tableData[0][0]);
      
    if (categoryFlag === false) {
      search.current = keys.current[1];
      setSearchValue(search.current);
      setCategoryFlag(true);
    }

  }, [tableData]);

  // page 렌더링
  React.useEffect(() => {
    getNameCookie().then((username) => {
      query.current = 'contents=' + name + '&page=' + page + '&pageSize=' + rows + '&sorting=' + (sorting[0]?.id ?? '') + '&desc=' + (sorting[0]?.desc ?? '') + '&category=' + search + '&search=' + searchResult + '&username=' + username;
    });
  }, [page]);

  // name
  React.useEffect(() => {
    setPage(0);
    search.current = '';
    setSearchValue('');
    
    setCategoryFlag(false);
    getNameCookie().then((username) => {
      query.current = 'contents=' + name + '&page=' + page + '&pageSize=' + rows + '&sorting=' + (sorting[0]?.id ?? '') + '&desc=' + (sorting[0]?.desc ?? '') + '&category=' + search + '&search=' + searchResult + '&username=' + username;
    });
  }, [name]);

  // 나머지 항목 렌더링
  React.useEffect(() => {
    setPage(0);
    getNameCookie().then((username) => {
      query.current = 'contents=' + name + '&page=' + page + '&pageSize=' + rows + '&sorting=' + (sorting[0]?.id ?? '') + '&desc=' + (sorting[0]?.desc ?? '') + '&category=' + search + '&search=' + searchResult + '&username=' + username;
    });
  }, [rows, search, searchResult]);

  console.log('data',data);

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
    search.current = e.target.value;
    setSearchValue(search.current);
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
      setIsOpenAlert(true);
    } else {
      removeData(selectedRows);
    }
  };

  // Screenshots 클릭시
  const handleShowScreenShots = (e: React.MouseEvent<HTMLButtonElement>) => {
    const screenshotId = e.currentTarget.name;
    setSelectedScreenshot(screenshotId);
    onOpen();
    // Regular expression to match the date pattern
    const dateRegex = /\b(\d{4}-\d{2}-\d{2})/;

    // Extract the date using the regular expression
    const match = screenshotId.match(dateRegex);

    // Check if a match is found and get the date
    const extractedDate = match ? match[1] : null;
    setScreenshotDate(extractedDate);
  };

  //다운로드 아이콘 클릭시
  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    const downloadId = e.currentTarget.name;
    setSelectedDownload(downloadId);
    // Regular expression to match the date pattern
    const dateRegex = /\b(\d{4}-\d{2}-\d{2})/;
    // Extract the date using the regular expression
    const match = downloadId.match(dateRegex);
    // Check if a match is found and get the date
    const extractedDate = match ? match[1] : null;
    // Check if the last 3 characters of downloadId are 'txt'
    const isTxtFile = downloadId.slice(-3).toLowerCase() === 'txt';

    if (isTxtFile) {
      // Open a new window and navigate to the download path
      const downloadPath = `${backIP}/Detects/${extractedDate}/${downloadId}`;
      const newWindow = window.open(
        `${downloadPath}`,
        '_blank',
        'width=600,height=400,top=60,left=-60,resizable=yes,scrollbars=yes'
      );
      if (!newWindow) {
        console.error('Failed to open new window.');
      }
    } else {
      const downloadPath = `${backIP}/Detects/${extractedDate}/${downloadId}`;
      const anchor = document.createElement('a');
      anchor.href = downloadPath;
      anchor.download = downloadId;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  }
  // fetch
  // 더미 데이터 생성
  // 추후 hidden(Test용으로 dummy data를 만들기 때문에)
  const handleInsertData = async () => {
    const dummyDataCount = 30; // dummyData 만들기 위한 count
    try {
      const response = await fetch(`${backIP}/api/dummy?` + query.current + "&count=" + dummyDataCount);

      const result = await response.json();
      setTableData(result);

    } catch (error) {
      console.error("insertData 에러 발생");
    }
  }

  // 데이터 삭제
  const removeData = async (selectedRows: string[]) => {
    try {
      const response = await fetch(`${backIP}/api/rm?` + query.current,
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
        borderRadius={'0px'}
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            mb="4px"
            fontWeight="700"
            lineHeight="100%"
          >
            {/* {chname} */}
          </Text>
          <Box>
            <Flex>
              <IconButton
                aria-label="Save Excel"
                icon={<RiFileExcel2Fill></RiFileExcel2Fill>}
                onClick={handleSaveExcel}
              />
              {/* <IconButton
                aria-label="Edit database"
                icon={<EditIcon />}
                onClick={handleInsertData}
              /> */}
              <IconButton
                aria-label="Delete database"
                icon={<DeleteIcon />}
                onClick={handleDeleteSelectedRows}
                _hover={{ cursor: 'pointer' }}
              />
              {isOpenAlert === true ? (
                <AlertDialog
                  isOpen={isOpenAlert}
                  onClose={onCloseAlert}
                  leastDestructiveRef={cancelRef}
                >
                  <AlertDialogOverlay display={'flex'} justifyContent={'center'} alignItems={'center'} />
                  <AlertDialogContent
                    width='500px'
                    height='150px'
                    borderRadius='15px'
                    margin={'15%'}
                  >
                    <AlertDialogBody>
                      <Flex alignContent={'center'} pt={'15px'}>
                        <MdOutlineWarning fontSize={'50px'} color='#F8BE40'></MdOutlineWarning>
                        <Text fontSize={'sm'} w={'90%'} fontWeight={'500'} alignSelf={'center'} pl={'5px'}>
                          삭제 항목이 없습니다.
                        </Text>
                      </Flex>
                    </AlertDialogBody>
                    <AlertDialogFooter justifyContent={'center'}>
                        <Button ref={cancelRef} onClick={onCloseAlert}
                              fontWeight='700'
                              w={'80px'}
                              h={'30px'}
                            >
                              확인
                        </Button>
                    </AlertDialogFooter>
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
                value={searchValue}
                onChange={handleSearch}
                width="unset"
                fontWeight="700"
              >
                {tableData[0] !== undefined &&
                  keys.current.map((data, index) => {
                    
                    if (index !== 0) {
                      const dataStr = name === 'network' ? networkAlias[data]?.name : 
                                      name === 'media'   ? mediaAlias[data]?.name  : 
                                      name === 'outlook' ? outlookAlias[data]?.name  : 
                                      name === 'print'   ? printAlias[data]?.name : data;
                      return (
                        <option value={data} key={data}>
                          {dataStr}
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
          width='100%'
             >
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
                  <Tr key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {                      
                      let headerText = name === 'network' ? networkAlias[header.id]?.name : 
                                       name === 'media'   ? mediaAlias[header.id]?.name  : 
                                       name === 'outlook' ? outlookAlias[header.id]?.name  : 
                                       name === 'print'   ? printAlias[header.id]?.name : header.id;
                      
                      return (
                        <Th
                          // display={'inline-block'}
                          key={header.id}
                          colSpan={header.colSpan}
                          borderColor={borderColor}
                          cursor="pointer"
                          whiteSpace="nowrap"
                          overflow='hidden'
                          textOverflow='ellipsis'
                          pt='5px' pb='5px'
                          pl='10px' pr='10px'
                          paddingInlineEnd='0px'
                          width={
                            name === 'network' ? networkAlias[header.id]?.width
                            : name === 'media' ? mediaAlias[header.id]?.width
                            : name === 'outlook' ? outlookAlias[header.id]?.width
                            : name === 'print' ? printAlias[header.id]?.width
                            : 'auto'
                          }
                          onClick={
                            headerText !== ''
                              ? header.column.getToggleSortingHandler()
                              : handleSelectAll
                          }
                        >
                            <Flex
                              justifyContent="center"
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
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table !== undefined &&
                  table.getRowModel()
                    .rows.slice(0, rows)
                    .map((row) => {
                      return (
                        <Tr key={row.id}
                        >
                          {row.getVisibleCells().map((cell) => {                            
                            return (
                              <Td
                                textAlign={ 
                                  name === 'network' ? networkAlias[cell.getContext().column.id]?.align : 
                                  name === 'media'   ? mediaAlias[cell.getContext().column.id]?.align : 
                                  name === 'outlook' ? outlookAlias[cell.getContext().column.id]?.align : 
                                  name === 'print'   ? printAlias[cell.getContext().column.id]?.align : 
                                  'start'
                                  }
                                key={cell.id}
                                fontSize={{ sm: '14px' }}
                                borderColor="transparent"
                                maxWidth={'100px'}
                                width={'100px'}
                                whiteSpace="nowrap"
                                overflow='hidden'
                                textOverflow='ellipsis'
                                // pt='5px' pb='5px'
                                p='2px'
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
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent width='80vw' height='80vh' maxW="80vw" maxH="80vh">
                <ModalHeader>Screen Shots</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  w='80vw'
                  h='80vh'
                  maxW="80vw"
                  maxH="80vh"
                  backgroundImage={`${backIP}/Detects/${screenshotDate}/${selectedScreenshot}.png` || `${backIP}/Detects/${screenshotDate}/${selectedScreenshot}.jpeg`}
                  backgroundSize='contain'
                  backgroundRepeat='no-repeat'
                />
              </ModalContent>
            </Modal>
          </Box>
        </Flex>
      </Card>
    );
  }
}
