import { Box, Flex, Icon, IconButton, Progress, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useColorModeValue } from '@chakra-ui/react';
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
import IconBox from 'components/icons/IconBox';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError, MdOutlineErrorOutline } from 'react-icons/md';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { TbCircleLetterC, TbCircleLetterH, TbCircleLetterL, TbCircleLetterM } from 'react-icons/tb';
import { Paginate } from 'react-paginate-chakra-ui';
import { analysisAlias } from 'utils/alias';
import { backIP } from 'utils/ipDomain';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function ScoringTable(props: { tableData: any, setDetail:any, detailSubmit:any, title:any,
	startDate:any, endDate:any, checkedKeywords:any }) {
	const { tableData, setDetail, detailSubmit, title, startDate, endDate, checkedKeywords } = props;
	const [page, setPage] = React.useState(0);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const rows:number = 14;
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

	  // 액셀 데이터 저장
	  const handleSaveExcel = async () => {
		try {
		  const response = await fetch(`${backIP}/excel/analytics`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				startDate: startDate,
				endDate: endDate,
				keywords : checkedKeywords
			  })
		  });
	
		  if (response.ok) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
	
			// a 태그를 만들어서 다운로드
			const a = document.createElement('a');
			a.href = url;
			a.download = `analytics.xlsx`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
	
			// 브라우저에 생성된 URL 해제
			window.URL.revokeObjectURL(url);
		  } else {
			console.error('Failed to fetch data:', response.status);
		  }
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  }
	
	return (
		<Card flexDirection='column' w='50%' h={'100%'} px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px='25px' mb="8px" justifyContent={'space-between'} align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					{title === '7d' ? '1주일' : (title.includes('m') ? title.at(0)+'개월' : '1년')} 중 최대 위험도 평가
				</Text>
				<IconButton
					mr={'2%'}
					size={'lg'}
					aria-label="Save Excel"
					icon={<RiFileExcel2Fill></RiFileExcel2Fill>}
					onClick={handleSaveExcel}
				/>
			</Flex>
			{/* 매우 위험 Critical */}
			<IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterC } color={'#D32F2F'} />
              }
            />
            {/* 위험 high */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterH } color={'#E57373'} />
              }
            />
            {/* 경고 Medium */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterM } color={'#FFA000'} />
              }
            />
            {/* 주의 Low */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={TbCircleLetterL } color={'green.400'} />
              }
            />
            {/* 안전 Safe */}
            <IconBox
              w="56px"
              h="56px"
              icon={
                <Icon w="32px" h="32px" as={MdOutlineErrorOutline } color={'blue.500'} />
              }
            />
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
