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
					<Text color={textColor} fontSize='sm' fontWeight='700'>
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
					<Text cursor={'pointer'} color={textColor} fontSize='sm' fontWeight='700' 
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
				<Text color={textColor} fontSize='sm' fontWeight='700'>
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
					<Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}%
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
					<Text color={textColor} fontSize='sm' fontWeight='700'>
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
							// value={searchValue}
							// onChange={handleSearch}
							width="unset"
							fontWeight="700"
						>
							{/**/}
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
				<Table color='black' border={'1px solid black'}>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
											backgroundColor={'#F0F0F0'}
											cursor='pointer'
											border={'1px solid black'}
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
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												border={'1px solid black'}
												w={cell.column.id === 'progress' ? '100px' : ''}
												p={cell.column.id === 'progress' ? '0' : ''}
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
