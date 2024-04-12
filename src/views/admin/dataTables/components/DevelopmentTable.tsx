import { Box, Flex, IconButton, Input, Progress, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
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
import { AndroidLogo, AppleLogo, WindowsLogo } from 'components/icons/Icons';
import * as React from 'react';
import { Icon, SearchIcon } from '@chakra-ui/icons';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { IoTrashOutline } from 'react-icons/io5';
import { Paginate } from 'react-paginate-chakra-ui';
import { FaFilePdf } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import IconBox from 'components/icons/IconBox';
import { sessionAlias } from 'utils/alias';
// Assets

type RowObj = {
	id: number;
	name: string;
	policy: any;
	user: string;
	progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
	const { tableData } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('secondaryGray.500', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const router = useRouter();
	const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: number }>({
		id: 50,
		name: 250,
		policy: 350,
		user: 50,
		progress: 50,
	});

	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('id', {
			id: 'id',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
				>
					번호
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text align='center' color={textColor} fontSize='sm' fontWeight='400'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
				>
					세션명
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text cursor={'pointer'} color={textColor} fontSize='sm' fontWeight='400'
						onClick={() => router.push(`/data/session?name=${info.getValue()}`)}
					>
						{
							info.getValue()
						}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('policy', {
			id: 'policy',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
				>
					점검 정책명
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					{info.getValue()}
				</Flex>
			)
		}),
		columnHelper.accessor('user', {
			id: 'user',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
				>
					작성자
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='400'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('progress', {
			id: 'progress',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
				>
					실행시간
				</Text>
			),
			cell: (info) => (
				<Flex justifyContent={'center'} align='center'>
					<Text me='10px' color={textColor} fontSize='sm' fontWeight='400'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('progress', {
			id: 'progress',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
				>
				</Text>
			),
			cell: (info) => (
				<Flex justifyContent={'center'} align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='400'>
						{info.getValue() === 75.5 ?
							<IconBox
								w="44px"
								h="24px"
								aria-label="Stop Session"
								icon={
									<Icon
										w="24px"
										h="24px"
										as={IoTrashOutline}
										_hover={{ cursor: 'pointer' }}
									// onClick={IoTrashOutline}
									/>
								}
							/> : <></>}
					</Text>
				</Flex>
			)
		})
	];
	const searchValue: ReadonlyArray<string> = columns.map(column => column.id);
	const [selectedValue, setSelectedValue] = React.useState(searchValue[0]);
	const handleSearch = (e:any) => {
		const newValue = e.target.value;
		setSelectedValue(newValue);
	}
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

	// 마우스 드래그로 너비 조절 핸들러
	const handleColumnResize = (columnId: string, initialPosition: number) => {
		const startDrag = (e: MouseEvent) => {
			const delta = e.clientX - initialPosition;
			setColumnWidths(prevWidths => ({
				...prevWidths,
				[columnId]: Math.max(prevWidths[columnId] + delta, 100) // 최소 너비를 100으로 설정
			}));
			initialPosition = e.clientX;
		};

		const stopDrag = () => {
			document.removeEventListener('mousemove', startDrag);
			document.removeEventListener('mouseup', stopDrag);
		};

		document.addEventListener('mousemove', startDrag);
		document.addEventListener('mouseup', stopDrag);
	};

	// 컬럼 헤더에 마우스 다운 이벤트 추가 (예시)
	const headerProps = (columnId: string) => ({
		onMouseDown: (e: React.MouseEvent) => {
			handleColumnResize(columnId, e.clientX);
		},
	});

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex
				// px='25px' 
				mb="8px" justifyContent='flex-end' align='center'>
				<Box>
					<Flex>
						<IconButton
							borderRadius={'0'}
							aria-label="Save PDF"
							icon={<FaFilePdf></FaFilePdf>}
						// onClick={handleSaveExcel}
						/>
						<IconButton
							borderRadius={'0'}
							aria-label="Save Excel"
							icon={<RiFileExcel2Fill></RiFileExcel2Fill>}
						// onClick={handleSaveExcel}
						/>
						<Select
							fontSize="sm"
							variant="subtle"
							// value={rows}
							// onChange={handleRows}
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
							value={selectedValue}
							onChange={handleSearch}
							width="unset"
							fontWeight="700"
						>
							{searchValue.slice(0, -1).map(value => (
								<option key={value} value={sessionAlias[value]}>{sessionAlias[value]}</option>
							))}
						</Select>
						<Input
							placeholder="검색"
							id="searchText"
							name="searchText"
						// value={searchResult}
						// onChange={handleSearchResult}
						// onKeyDown={handleSearchResultKeyDown}
						/>
						<IconButton
							aria-label="Search database"
							icon={<SearchIcon />}
						// onClick={handleSearchComfirm}
						/>
					</Flex>
				</Box>
			</Flex>
			<Box >
				<Table color='black' borderTop={'2px solid black'} margin={'12px auto 24px'}>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									let headerText = sessionAlias[header.id];
									return (
										<Th
											width={columnWidths[header.id]}
											key={header.id}
											colSpan={header.colSpan}
											cursor="pointer"
											overflow="hidden"
											textOverflow="ellipsis"
											border={'1px solid #ccc'}
											backgroundColor={'#F0F0F0'}
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={'16px'}
												color='black'>
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
						{table.getRowModel().rows.slice(0, 11).map((row) => {
							return (
								<Tr key={row.id} _hover={{ backgroundColor: '#F2F7FF' }} >
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px', lg: 'auto' }}
												minW={{ sm: 'auto', md: 'auto', lg: 'auto' }}
												border={'1px solid #ccc'}
												cursor='pointer'
												w={cell.column.id === 'progress' ? '50px' : ''}
												p={cell.column.id === 'progress' ? '0' : '10px'}
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
				<Flex justifyContent="center">
					<Paginate
						page={1}
						margin={3}
						shadow="lg"
						fontWeight="bold"
						variant="outline"
						colorScheme="blue"
						border="2px solid"
						count={'1'}
						pageSize={'1'}
						onPageChange={() => {}}
					// onPageChange={handlePageClick}
					></Paginate>
				</Flex>
			</Box>
		</Card>
	);
}
