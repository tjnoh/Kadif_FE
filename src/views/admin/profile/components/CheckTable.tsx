import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Select, Button, Link, Input, IconButton } from '@chakra-ui/react';
import * as React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import { Paginate } from 'react-paginate-chakra-ui';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function CheckTable(
  props: { tableData: any; name: any; setTableData: any },
  { children }: { children: React.ReactNode },
) {
  const { tableData, name, setTableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [checkedRows, setCheckedRows] = React.useState<{ [key: string]: boolean }>({});
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  let defaultData = tableData;
  let keys = tableData[0] !== undefined && Object.keys(tableData[0]);
  let i;
  let str: string = '';
  let columns = [];

  i = 0;
  while (true) {
    if (tableData[0] === undefined) break;
    if (i >= keys.length + 1) break;
    str = keys.at(i - 1);
    // CheckBox
    if (i === 0) {
      columns.push(
        columnHelper.accessor('check', {
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
          cell: (info: any) => (
            <Flex align="center" justifyContent="center">
              <Checkbox
                justifyContent="center"
                isChecked={checkedRows[info.row.original.username] || false}
                colorScheme="brandScheme"
                me="10px"
                onChange={() => handleCheckboxToggle(info.row.original.username)}
              />
            </Flex>
          ),
        }),
      );
    } else {
      // Tables Data
      columns.push(
        columnHelper.accessor(str, {
          id: str,
          header: () => (
            <Text
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: '10px', lg: '12px' }}
              color="gray.400"
            >
              {str}
            </Text>
          ),
          cell: (info: any) => {
            return (
              <Text color={textColor} fontSize="sm" fontWeight="700" >
                {(info.column.id === 'grade') ? (
                  (info.getValue() > 1) ? (info.getValue() > 2 ? '모니터' : '영역별 관리자') : '관리자'
                ) : info.getValue()}
              </Text>
            );
          },
        }),
      );
    }

    i++;
  }

  // 체크박스를 토글하는 핸들러
  // handleCheckboxToggle 함수 수정
  const handleCheckboxToggle = (rowId: string) => {
    setCheckedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };


  const handleDeleteSelectedRows = () => {
    const selectedRows = Object.keys(checkedRows).filter((rowId) => checkedRows[rowId]);
    console.log("Selected Rows to Delete:", selectedRows);
    removeUser(selectedRows);
  };

  const removeUser = async (selectedRows:string[]) => {
    try {
      const response = await fetch('http://localhost:8000/user/rm', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body:JSON.stringify(selectedRows)
      });
      const result = await response.json();
      console.log("result : ", result);
      setTableData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const [data, setData] = React.useState(() => [...defaultData]);
  const [rows, setRows] = React.useState(5);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setData(tableData);
  }, [tableData]);

  React.useEffect(() => {
    setPage(0);
  }, [name]);

  let table = useReactTable({
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
  const [page, setPage] = React.useState(0);
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
  }

  const handleSearchResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

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
        <Flex>
          <Link href='/users/new'
            mr={'5px'}>
            <Button as="a"><AddIcon></AddIcon></Button>
          </Link>
          <Button
            onClick={handleDeleteSelectedRows}
          ><DeleteIcon></DeleteIcon></Button>
          <Select
            fontSize="sm"
            value={rows}
            onChange={handleRows}
            fontWeight="700"
          >
            <option value="5">5개</option>
            <option value="20">20개</option>
            <option value="50">50개</option>
          </Select>
          <Select
            fontSize="sm"
            variant="subtle"
            value={search}
            onChange={handleSearch}
            fontWeight="700"
          >
            {
              tableData[0] !== undefined && keys.map((data) => {
                return (
                  <option value={data} key={data}>{data}</option>
                )
              })
            }
          </Select>
          <Input placeholder='검색' id='searchText' name='searchText' onChange={handleSearchResult} />
          <IconButton aria-label='Search database' icon={<SearchIcon />} />
        </Flex>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color="gray.400"
                      >
                        {flexRender(header.id, header.getContext())}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {
              table
                .getRowModel()
                .rows.slice(page * rows, (page + 1) * rows)
                .map((row) => {
                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Td
                            key={cell.id}
                            fontSize={{ sm: '14px' }}
                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                            borderColor="transparent"
                            cursor='pointer'
                            onClick={() => {
                              if (cell.id.includes('username')) {
                                window.location.href = `/users/modify?name=${cell.getValue()}`;
                              }
                            }}
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
            // ...border and other props also work 💪
            border="2px solid"
            // you can use w to adjust to parent
            // container
            // w={'50%'}
            count={table.getRowModel().rows.length}
            pageSize={rows}
            onPageChange={handlePageClick}
          ></Paginate>
        </Flex>
      </Box>
    </Card>
  );
}