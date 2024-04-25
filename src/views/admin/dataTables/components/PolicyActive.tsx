// components/TreeTable.tsx
import { Box, Button, Checkbox, Flex, Input, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import "react-sortable-tree/style.css";

type RowObj = {
	r_tc_name: string;
	r_context: string;
	r_dut: string;
	r_status: string; 
};
 
const columnHelper = createColumnHelper<RowObj>();

export default function PolicyActive(props: { tableData: any }) {
  const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: number }>({
		r_tc_name: 100,
		r_dut: 100,
		r_context: 50,
		r_status: 350,
	});

	let defaultData= tableData;
	const columns = [
		columnHelper.accessor('r_tc_name', {
			id: 'r_tc_name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					TP-ID (Test Point)
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'> 
					<Text color={textColor} fontSize='sm' fontWeight='700' w={'180px'} minW={'180px'}>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('r_dut', {
			id: 'r_dut',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DUT (Device Under Test)
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700' w={'180px'} minW={'180px'}>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('r_context', {
			id: 'r_context',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					점검결과
				</Text>
			),
			cell: (info) => (
				<Text color={info.getValue() === 'PASS\n' ? 'green': (info.getValue() === 'FAIL\n' ? 'red' : 'orange')} fontSize='sm' fontWeight='700' w={'80px'} minW={'80px'}>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('r_status', {
			id: 'r_status',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					부가정보
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		})
	];
	const [ data, setData ] = React.useState(() => [ ...defaultData ]);
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
							<Tr  key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											width={columnWidths[header.id]}
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
