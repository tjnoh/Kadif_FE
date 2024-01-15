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
  Grid,
  GridItem,
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
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function CheckTable(
  props: {
    tableData: any;
    name: any;
    rows: any;
    setRows: any;
    page: any;
    setPage: any;
    sorting: any;
    setSorting: any;
    search: any;
    setSearch: any;
    searchResult: any;
    setSearchResult: any;
    searchComfirm: boolean;
    setSearchComfirm: any;
  },
  { children }: { children: React.ReactNode },
) {
  const {
    tableData,
    name,
    rows,
    setRows,
    page,
    setPage,
    sorting,
    setSorting,
    search,
    setSearch,
    searchResult,
    setSearchResult,
    searchComfirm,
    setSearchComfirm,
  } = props;
  const [data, setData] = React.useState(() => {
    return tableData[0] !== undefined && tableData[0];
  });
  const [categoryFlag, setCategoryFlag] = React.useState<boolean>(false);
  const [selectAll, setSelectAll] = React.useState<string>('모두선택');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [checkedRows, setCheckedRows] = React.useState<{ [key: string]: boolean }>({});

  let keys =
    tableData[0] !== undefined &&
    tableData[0] !== null &&
    tableData[0].length !== 0 &&
    Object.keys(tableData[0][0]);
  let i: number;
  let str: string = '';
  let columns = [];

  // TanStack Table
  // columns table Create
  i = 0;
  while (true) {
    if (tableData[0] === undefined) break;
    if (keys.length === undefined) break;
    if (i >= keys.length) break;
    str = keys.at(i);
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
                  me="10px"
                  id={info.getValue()}
                  name={info.getValue()}
                  isChecked = {checkedRows[info.row.original.id] || false}
                  onChange={() => handleCheckbox(info.row.original.id)}
                />
              ) : (
                <></>
              )}
            </Flex>
          )},
        }),
      );
    } else {
      // Tables Data
      columns.push(
        columnHelper.accessor(str, {
          id: str,
          header: () => {
            return (
              // <Text
              //   justifyContent="space-between"
              //   align="center"
              //   fontSize={{ sm: '10px', lg: '12px' }}
              //   color="gray.400"
              //   width='auto'
              // >
              //   {headerStr}
              // </Text>
              <></>
            );
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
                      ? info.getValue().slice(0, 9)
                      : info.getValue().length >= 7
                      ? info.getValue().slice(0, 7) + '...'
                      : info.getValue())}
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
    setData(tableData[0]);
  }, [tableData]);

  React.useEffect(() => {
    setPage(0);
    setCategoryFlag(false);
  }, [name]);

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

  if (keys.length !== undefined && categoryFlag === false) {
    setCategoryFlag(true);
    setSearch(keys.at(1));
  }

  // Paging
  const handlePageClick = (p: number) => {
    setPage(p);
  };

  // handlers

  const handleRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(e.target.value, 10); // Assuming you want to parse the value as an integer
    setRows(newRows);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchResult(e.target.value);
  };

  const handleSearchResultKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      setSearchComfirm(!searchComfirm);
    }
  };

  const handleSearchComfirm = () => {
    setSearchComfirm(!searchComfirm);
  };

  const handleCheckbox = (rowId: string) => {
    setCheckedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }

  const handleSelectAll = () => {
    let select:any = {};
    if(selectAll === '모두선택') {
      setSelectAll('모두취소');

      data !== undefined && data.map((val:any) => {
        select = {
          ...select,
          [val.id] : true
        }
      });      
    }
    else {
      setSelectAll('모두선택');

      select = {
        ...checkedRows
      };

      const keys:any = Object.keys(select);
      keys.map((key:any) => select[key] = false);
    }
    

    setCheckedRows(select); 
  }
  const handleDeleteSelectedRows = () => {
    const selectedRows = Object.keys(checkedRows).filter((rowId) => checkedRows[rowId]);
    console.log("Selected Rows to Delete:", selectedRows);
  };
  

  if (data === undefined || data === null || keys.length === undefined) {
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
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            mb="4px"
            fontWeight="700"
            lineHeight="100%"
          >
            {name}
          </Text>
          <Grid>
            <Box justifySelf='end'>
              <Button
              value={selectAll}
              fontSize='sm'
              fontWeight='700'
              backgroundColor='white'
              _hover={{
               backgroundColor:"#3965FF",
               color:"white"
              }}
              onClick={handleSelectAll}
              >
                {selectAll}
              </Button>
              <IconButton
                aria-label="Delete database"
                icon={<DeleteIcon />}
                // onClick={handleSearchComfirm}
              />
            </Box>
            <Box>
              <Flex>
                <Select
                  fontSize="sm"
                  variant="subtle"
                  value={rows}
                  onChange={handleRows}
                  width="unset"
                  fontWeight="700"
                >
                  <option value="10">10개</option>
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
                    keys.map((data, index) => {
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
          </Grid>
        </Flex>
        <Box>
          <Table variant="simple" color="gray.500" mb="24px" mt="12px" id='checkTable'>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    let headerText =
                      header.id.length >= 7
                        ? header.id.slice(0, 5) + '...'
                        : header.id;

                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        pe="3px"
                        borderColor={borderColor}
                        cursor="pointer"
                        onClick={header.id !== 'check' ? header.column.getToggleSortingHandler() : handleSelectAll}
                      >
                        <Tooltip label={header.id}>
                          <Flex
                            justifyContent="space-between"
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
                      <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <Td
                              key={cell.id}
                              fontSize={{ sm: '14px' }}
                              borderColor="transparent"
                              whiteSpace="nowrap"
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
      </Card>
    );
  }
}
