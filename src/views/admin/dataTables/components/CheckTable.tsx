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

// type RowObj = {
// 	name: [string, boolean];
// 	progress: string;
// 	quantity: number;
// 	date: string;
// 	info: boolean;
// };

// const columnHelper = createColumnHelper<RowObj>();

type DataItem = {
	id: Number;
	time: String;
	pcname: String;
	process: String;
	pid: String;
	agent_ip: String;
	src_ip: String;
	src_port: String;
	dst_ip: String;
	dst_port: String;
	src_file: String;
	down_state: String;
	scrshot_downloaded: String;
	file_size: String;
	keywords: String;
	dst_file: String;
	saved_file: String;
	accuracy: Number;
	evCO: String;
	evFA: String;
	evSA: String;
	isprinted: Number;
	asked_file: Number;
};

const columnHelper = createColumnHelper<DataItem>();

// const columns = columnsDataCheck;
export default function CheckTable(props: { tableData: any, name: any }, { children }: { children: React.ReactNode }) {
	const { tableData, name } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;

	const columns = [
		columnHelper.accessor('accuracy', {
			id: 'accuracy',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					accuracy
				</Text>
			),
			cell: (info: any) => (
				<Flex align="center">
					<Checkbox
						defaultChecked={info?.getValue()?.[1] || false}
						colorScheme="brandScheme"
						me="10px"
					/>
					<Text color={textColor} fontSize="sm" fontWeight="700">
						{info.getValue() === 100 ? '정탐' : '미확인'}
					</Text>
				</Flex>
			),
		}),
		columnHelper.accessor('pcname', {
			id: 'pcname',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					pcname
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('process', {
			id: 'process',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{
						sm: '10px',
						lg: '12px',
					}}
					color="gray.400"
				>
					process
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('pid', {
			id: 'pid',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					pid
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('time', {
			id: 'time',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					DATE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('agent_ip', {
			id: 'agent_ip',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					agent_ip
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('src_port', {
			id: 'src_port',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					src_port
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('src_ip', {
			id: 'src_ip',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					src_ip
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('dst_ip', {
			id: 'dst_ip',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					dst_ip
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('dst_port', {
			id: 'dst_port',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					dst_port
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('src_file', {
			id: 'src_file',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					src_file
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('down_state', {
			id: 'down_state',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					down_state
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('scrshot_downloaded', {
			id: 'scrshot_downloaded',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					scrshot_downloaded
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('file_size', {
			id: 'file_size',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					file_size
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('keywords', {
			id: 'keywords',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					keywords
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('dst_file', {
			id: 'dst_file',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					dst_file
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue() ? info.getValue() : '위치 미확인'}
				</Text>
			),
		}),
		columnHelper.accessor('saved_file', {
			id: 'saved_file',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400"
				>
					saved_file
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()}
				</Text>
			),
		}),
	];
	const [data, setData] = React.useState(() => [...defaultData]);
	const [rows, setRows] = React.useState(10);
	React.useEffect(() => {
		setData(tableData);
	}, [tableData]);

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

	// handlers

	const handleRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newRows = parseInt(e.target.value, 10); // Assuming you want to parse the value as an integer
		setRows(newRows);
	};

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
				{/* <Menu /> */}
				<Select
					fontSize="sm"
					variant="subtle"
					value={rows}
					onChange={handleRows}
					width="unset"
					fontWeight="700"
				>
					<option value="10">10개</option>
					<option value="20">20개</option>
					<option value="50">50개</option>
				</Select>
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
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
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
						{table
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
													minW={{ sm: '150px', md: '200px', lg: 'auto' }}
													borderColor="transparent"
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
		</Card>
	);
}
