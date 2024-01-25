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
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
	const { tableData } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	let tableName = tableData?.table === 'network' ? '사외 네트워크 정보유출 실시간 현황' : (tableData?.table === 'media' ? '이동식 저장매체 정보유출 실시간 현황' : (tableData?.table === 'outlook' ? 'Outlook 메일 정보유출 실시간 현황' : '프린터 인쇄 실시간 현황'));
	let columns = [];
	for (let i = 0; i < defaultData?.key.length; i++) {
		columns.push(
			columnHelper.accessor(defaultData.key[i], {
				id: defaultData.key[i],
				header: () => (
					<Text
						justifyContent='space-between'
						align='center'
						fontSize={{ sm: '10px', lg: '12px' }}
						color='Black'>
						{defaultData.key[i]}
					</Text>
				),
				cell: (info: any) => (
					<Tooltip label={info.getValue()}>
						<Flex align='center'>
							<Text color={textColor} fontSize='sm' fontWeight='700'>
								{info.getValue().length > 8 ? info.getValue().slice(0, 5) + '...' : info.getValue()}
							</Text>
						</Flex>
					</Tooltip>
				)
			}),
		)
	}
	const [data, setData] = React.useState(() => {
		return tableData?.data !== undefined && tableData?.data;
		return tableData?.data !== undefined && tableData?.data;
	});
	const router = useRouter();
	React.useEffect(() => {
		if (tableData?.data !== undefined) {
			setData(tableData.data);
		}
	}, [tableData?.data]);

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

	const routingTable = (e: any) => {
		tableData?.table === 'network' ? router.push('/data/tables?contents=network') : (tableData?.table === 'media' ? router.push('/data/tables?contents=media') : (tableData?.table === 'outlook' ? router.push('/data/tables?contents=outlook') : router.push('/data/tables?contents=print')));
	}

	if (!tableData) {
		return <div>Loading...</div>; // 로딩 중일 때의 UI 처리
	}
	return (
		<Card borderRadius={'0px'} flexDirection='column' w='100%' px='0px' height='250px' overflowX={{ sm: 'hidden', lg: 'hidden' }}
			overflowY={{ sm: 'hidden', lg: 'hidden' }} >
			<Flex px='25px'
				mb="4px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='18px' fontWeight='700' lineHeight='100%'
					onClick={routingTable}
				>
					{tableName}
				</Text>
			</Flex>
			<Box
				width='100%' >
				<Table variant='simple' color='gray.500'
					mb='24px' mt="12px" width='100%'
				>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th

											key={header.id}
											colSpan={header.colSpan}
											borderColor={borderColor}
											cursor='pointer'
											overflow='hidden'
											textOverflow='ellipsis'
											pt='5px' pb='5px'
											paddingInlineEnd='0px'
											onClick={header.column.getToggleSortingHandler()}>
											<Tooltip label={header.id}>
												<Flex
												width={'80px'}
													justifyContent='space-between'
													align='center'
													fontSize={{ sm: '10px', lg: '12px' }}
													color='gray.400'>
													{flexRender(header.column.columnDef.header, header.getContext())}{{
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
						{table !== undefined && table.getRowModel() && table.getRowModel().rows && table.getRowModel().rows.slice(0, 5).map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												width={'50px'}
												key={cell.id}
												fontSize={{ sm: '12px' }}
												borderColor='transparent'
												whiteSpace="nowrap"
												overflow='hidden'
												textOverflow='ellipsis'
												pt='5px' pb='5px'
											>
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
