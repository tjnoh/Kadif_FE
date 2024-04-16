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
import { FaFilePdf, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import IconBox from 'components/icons/IconBox';
import { sessionAlias } from 'utils/alias';
import { backIP } from 'utils/ipDomain';
import Swal from 'sweetalert2';
// Assets

type RowObj = {
	s_id: number;
	s_name: string;
	p_name: string;
	username: string;
	s_time: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: {
	tableData: any; category: any, setCategory: any, searchWord: any, setSearchWord: any
	searchButton: any, setSearchButton: any, rows: any, setRows: any, page: any, setPage: any,
}) {
	const { tableData, category, setCategory, searchWord, setSearchWord, searchButton, setSearchButton,
		rows, setRows, page, setPage,
	} = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('secondaryGray.500', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const router = useRouter();
	const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: number }>({
		s_id: 50,
		s_name: 250,
		p_name: 350,
		username: 50,
		s_time: 50,
	});

	const deleteSession = (e: any) => {
		Swal.fire({
			title: '세션 삭제',
			html: `<div style="font-size: 14px;">'${e}' 세션을 삭제하시겠습니까?</div>`,
			confirmButtonText: '확인',
			cancelButtonText: '아니오',
			showCancelButton: true,
			focusConfirm: false,
			customClass: {
				popup: 'custom-popup-class',
				title: 'custom-title-class',
				htmlContainer: 'custom-content-class',
				container: 'custom-content-class',
				confirmButton: 'custom-confirm-class',
				cancelButton: 'custom-cancel-class',
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const response = fetch(`${backIP}/session/delete`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: e,
					})
				});
			} else {

			}
		});
	}

	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('s_id', {
			id: 's_id',
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
		columnHelper.accessor('s_name', {
			id: 's_name',
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
		columnHelper.accessor('p_name', {
			id: 'p_name',
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
		columnHelper.accessor('username', {
			id: 'username',
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
		columnHelper.accessor('s_time', {
			id: 's_time',
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
		columnHelper.accessor('s_time', {
			id: 's_time',
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
										onClick={() => deleteSession(info.row.original.username)}
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
	// Paging
	const handlePageClick = (p: number) => {
		setPage(p);
	};
	// handlers
	const handleRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newRows = parseInt(e.target.value, 10); // Assuming you want to parse the value as an integer
		setRows(newRows);
	};

	const handleSearch = (e: any) => {
		const newValue = e.target.value;
		setSelectedValue(newValue);
		setCategory(newValue);
	}
	const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchWord(e.target.value);
	}
	const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	}
	const handleSearchWordKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === 'Enter') {
			setSearchButton(!searchButton);
		}
	};

	const handleSearcchButton = () => {
		setSearchButton(!searchButton);
	};

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
							value={rows}
							onChange={handleRows}
							width="unset"
							fontWeight="700"
						>
							<option value="20">10개</option>
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
								<option key={value} value={value}>{sessionAlias[value]}</option>
							))}
						</Select>
						<Input
							placeholder="검색"
							id="searchText"
							name="searchText"
							value={searchWord}
							onChange={handleSearchWord}
							onKeyDown={handleSearchWordKeyDown}
						/>
						<IconButton
							aria-label="Search database"
							icon={<SearchIcon />}
							onClick={handleSearcchButton}
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
												color='black'>
												{/* {flexRender(header.column.columnDef.header, header.getContext())}{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null} */}
												<Box
													onClick={header.column.getToggleSortingHandler()}
												>
													{flexRender(headerText, header.getContext())}
												</Box>
												{{
													asc: <FaSortUp />,
													desc: <FaSortDown />,
												}[header.column.getIsSorted() as string] ?? null}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.slice(page * rows, (page + 1) * rows).map((row) => {
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
						page={page}
						margin={3}
						shadow="lg"
						fontWeight="bold"
						variant="outline"
						colorScheme="blue"
						border="2px solid"
						count={table.getRowModel().rows.length}
						pageSize={rows}
						onPageChange={handlePageClick}
					></Paginate>
				</Flex>
			</Box>
		</Card>
	);
}
