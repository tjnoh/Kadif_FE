// components/TreeTable.tsx
import { Box, Button, Checkbox, Flex, Input, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useRef, useState } from 'react';
import "react-sortable-tree/style.css";

type RowObj = {
  log_time: string;
  log_text: string;
  log_tc_name: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function PolicyLog(props: { tableData: any }) {
  const { tableData } = props;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: number }>({
		log_time: 100,
		log_tc_name: 100,
    log_text: 200,
	});
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('log_time', {
      id: 'log_time',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          로깅 시각
        </Text>
      ),
      cell: (info) => {
        const logText = info.row.original.log_text;
        const logTextParts = logText.split('@줄바뀜@');

        return (
          <Text color='black' fontSize='sm' fontWeight='300' w='max-content'>
            {logTextParts.map((part, index) => (
              <React.Fragment key={index}>
                {info.getValue()}
                {index < logTextParts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
        );
      }
    }),
    columnHelper.accessor('log_tc_name', {
      id: 'log_tc_name',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          TP-ID (Test Point)
        </Text>
      ),
      cell: (info) => {
        const logText = info.row.original.log_text;
        const logTextParts = logText.split('@줄바뀜@');

        return (
          <Text color='black' fontSize='sm' fontWeight='300' w='max-content'>
            {logTextParts.map((part, index) => (
              <React.Fragment key={index}>
                {info.getValue()}
                {index < logTextParts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
        );
      }
    }),
    columnHelper.accessor('log_text', {
      id: 'log_text',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          보안성 평가 현황 로그
        </Text>
      ),
      cell: (info) => {
        const logText = info.getValue();
        const logTextParts = logText.split('@줄바뀜@');

        return (
          <Text color='black' fontSize='sm' fontWeight='300' w='max-content'>
            {logTextParts.map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < logTextParts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
        );
      }
    })
  ];

  useEffect(() => {
    setData(tableData); // 외부에서 받은 데이터가 변경될 때마다 상태 업데이트
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
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
    <Box height={'70vh'} maxH={'80vh'} overflowY={'scroll'} ref={scrollRef}>
      <Table variant='simple' color='gray.500' mb='12px'>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    width={columnWidths[header.id]}
                    // maxW={columnWidths[header.id]}
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
                      w={'max-content'}
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
