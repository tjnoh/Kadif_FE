import { Box, Flex, Icon, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';



type DataItem = {
	id: Number,
	time: String,
	pcname: String,
	process: String,
	pid: String,
	agent_ip: String,
	src_ip: String,
	src_port: String,
	dst_ip: String,
	dst_port: String,
	src_file: String,
	down_state: String,
	scrshot_downloaded: String,
	file_size: String,
	keywords: String,
	dst_file: String,
	saved_file: String,
	accuracy: Number,
	evCO: String,
	evFA: String,
	evSA: String,
	isprinted: Number,
	asked_file: Number
};

const columnHelper = createColumnHelper<DataItem>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('pcname', {
			id: 'pcname',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					pcname
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('dst_port', {
			id: 'dst_port',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					dst_port
				</Text>
			),
			cell: (info) => (
			<Flex align='center'>
												<Icon
													w='24px'
													h='24px'
													me='5px'
													color={
														info.getValue() === '443' ? (
															'green.500'
														) : info.getValue() === '3389' ? (
															'red.500'
														) : info.getValue() === '5223' ? (
															'orange.500'
														) : null
													}
													as={
														info.getValue() === '443' ? (
															MdCheckCircle
														) : info.getValue() === '3389' ? (
															MdCancel
														) : info.getValue() === '5223' ? (
															MdOutlineError
														) : null
													}
												/>
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{info.getValue()}
												</Text>
											</Flex> 
			)
		}),
		columnHelper.accessor('time', {
			id: 'time',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					time
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('id', {
			id: 'id',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					id
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Progress variant='table' colorScheme='brandScheme' h='8px' w='108px' value={Number(info.getValue())} />
				</Flex>
			)
		})
	];
	const [ data, setData ] = React.useState(() => { 
		console.log(tableData);
		return [ ...defaultData ]
	});
	React.useEffect(()=>{
		setData(tableData);
	},[tableData]);
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
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					Detectfiles Table
				</Text>
				<Menu />
			</Flex>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
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
						{table.getRowModel().rows.slice(0, 5).map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												borderColor='transparent'>
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
		</Card>
	);
}
 