// components/TreeTable.tsx
import { Box, Button, Checkbox, Flex, Input, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import "react-sortable-tree/style.css";

type RowObj = {
  name: string;
  log: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function PolicyLog(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          로그 시각
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='300'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('log', {
      id: 'log',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          점검 현황 로그
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='300'>
          {info.getValue()}
        </Text>
      )
    })
  ];

  useEffect(() => {
    setData(tableData); // 외부에서 받은 데이터가 변경될 때마다 상태 업데이트
  }, [tableData]);

  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  });
  return (
    <Box height={'70vh'} maxH={'80vh'} overflowY={'scroll'} >
      <Table variant='simple' color='gray.500' mb='12px'>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe='10px'
                    borderColor={borderColor}
                    cursor='pointer'
                    onClick={header.column.getToggleSortingHandler()}>
                    <Flex
                      justifyContent='space-between'
                      align='center'
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color='gray.400'>
                      {flexRender(header.column.columnDef.header, header.getContext())}{{
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
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor='transparent'
                      p={'0px'}
                      pl={'10px'}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
