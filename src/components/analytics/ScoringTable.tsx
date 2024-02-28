import { Box, Flex, Icon, Progress, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useColorModeValue } from '@chakra-ui/react';
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
import { Paginate } from 'react-paginate-chakra-ui';
import { analysisAlias } from 'utils/alias';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function ScoringTable(props: { tableData: any, setDetail:any, detailSubmit:any, title:any }) {
	const { tableData, setDetail, detailSubmit, title } = props;
	const [page, setPage] = React.useState(0);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const rows:number = 15;
	let defaultData = tableData;
	let keys = tableData[0] !== undefined && Object.keys(tableData[0]);
	let i: number;
	let str: string = '';
	let columns = [];
	i = 0;
	while (true) {
		if (tableData[0] === undefined) break;
		if (i >= keys.length) break;
		str = keys.at(i);
				
		// Tables Data
		if (str === 'status') {
			columns.push(
				columnHelper.accessor(str, {
					id: str,
					header: () => {
						<Text
							justifyContent="space-between"
							align="center"
							fontSize={{ sm: '10px', lg: '12px' }}
							color="gray.400"
						>
							{str}
						</Text>
					},
					cell: (info: any) => {
						return (
							<Flex align='center'>
								<Icon
									w='24px'
									h='24px'
									me='5px'
									color={
										info.getValue() >= 100 ? (
											'red.500'
										) : info.getValue() >= 50 ? (
											'orange.500'
										) : info.getValue() >= 0 ? (
											'green.500'
										) : null
									}
									as={
										info.getValue() >= 100 ? (
											MdCancel
										) : info.getValue() >= 50 ? (
											MdOutlineError
										) : info.getValue() >= 0 ? (
											MdCheckCircle
										) : null
									}
								/>
								<Text color={textColor} fontSize='sm' fontWeight='700'>
									{info.getValue()}
								</Text>
							</Flex>
						);
					},
				}),
			);
		} else if (str === 'progress') {
			columns.push(
				columnHelper.accessor(str, {
					id: str,
					header: () => {
						<Text
							justifyContent="space-between"
							align="center"
							fontSize={{ sm: '10px', lg: '12px' }}
							color="gray.400"
						>
							{str}
						</Text>
					},
					cell: (info: any) => {
						return (
							<Flex align='center'>
								<Progress variant='table' colorScheme='brandScheme' h='8px' w='108px' value={info.getValue()} />
							</Flex>
						);
					},
				}),
			);
		} else if(str !== 'pcGuid'){
			columns.push(
				columnHelper.accessor(str, {
					id: str,
					header: () => {
						<Text
							justifyContent="space-between"
							align="center"
							fontSize={{ sm: '10px', lg: '12px' }}
							color="gray.400"
						>
							{str}
						</Text>
					},
					cell: (info: any) => {
						return (
							<Tooltip label={info.getValue()}>
								<Text color={textColor} fontSize="sm" fontWeight="700"
								>
									{info.getValue()}
								</Text>
							</Tooltip>
						);
					},
				}),
			);
		}

		i++;
	}

	const [data, setData] = React.useState(() => [...defaultData]);
	React.useEffect(() => {
		setData(tableData);
	}, [tableData]);

	let table = useReactTable({
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

  	// Paging
	const handlePageClick = (p: number) => {
		setPage(p);
	};

	const showDetail = (data:any) => {
		setDetail(true);
		detailSubmit(data?.pcGuid,data?.pcName);
	}

	return (
		<Card flexDirection='column' w='50%' h={'100%'} px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					{title === '7d' ? '1주일' : (title.includes('m') ? title.at(0)+'개월' : '1년')} 중 최대 위험도 평가
				</Text>
			</Flex>
			<Box h={'90%'} overflowY={'hidden'}>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									let headerText = analysisAlias[header.id];
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
												{flexRender(headerText, header.getContext())}
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
						{table.getRowModel().rows.map((row) => {
							if(row.index >= rows*page && row.index < rows*(page+1)) {
								return (
									<Tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<Td
													key={cell.id}
													fontSize={{ sm: '14px' }}
													minW={{ sm: '150px', md: '200px', lg: 'auto' }}
													borderColor='transparent'
													cursor={'pointer'}
													pt={'5px'} pb={'5px'}
													pl={cell.column.id === 'pcName' ? '20px' : '10px'}
													pr={cell.column.id === 'pcName' ? '15px' : '10px'}
													onClick={() => showDetail(row?.original)}
													>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</Td>
											);
										})}
									</Tr>
								);
							}
						})}
					</Tbody>
				</Table>
			</Box>
			<Flex justifyContent="center">
					<Paginate
						page={page}
						margin={3}
						shadow="lg"
						fontWeight="bold"
						variant="outline"
						colorScheme="blue"
						border="2px solid"
						count={defaultData.length}
						pageSize={rows}
						onPageChange={handlePageClick}
					></Paginate>
				</Flex>
		</Card>
	);
}
