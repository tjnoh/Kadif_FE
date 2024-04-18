import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, IconButton, Input, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
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
import { useRouter } from 'next/navigation';
// Assets
import { MdCancel, MdCheckCircle, MdGavel, MdNewLabel, MdNewReleases, MdOutlineError } from 'react-icons/md';
import { TbPencilCancel } from 'react-icons/tb';
import IconBox from 'components/icons/IconBox';
import { FaCloudUploadAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { backIP } from 'utils/ipDomain';
import Swal from 'sweetalert2';
import { Paginate } from 'react-paginate-chakra-ui';

type RowObj = {
	name: string;
	distinction: string;
	author: string;
	edit : string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any, rows: any, setRows: any, page: any, setPage: any, }) {
	const { tableData, rows, setRows, page, setPage, } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'white');
	const [data, setData] = React.useState(tableData);
	const router = useRouter();
	const fileInputRef = React.useRef(null);
	const [fileData, setFileData] = React.useState([]);

	const handlePageClick = (p: number) => {
		setPage(p);
	};

	React.useEffect(() => {
		setData(tableData);
	},[tableData])	

	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'

				>
					점검 정책
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text fontWeight='400'
					height={'20px'}
					onClick={() => router.push(`/policy/edit?name=${info.getValue()}`)}
					cursor={'pointer'}
					>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('distinction', {
			id: 'distinction',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
				>
					정책 설명
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text fontWeight='400'
					height={'20px'}
					>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('author', {
			id: 'author',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
				>
					작성자
				</Text>
			),
			cell: (info) => (
				<Text color={'black'} fontSize='sm' fontWeight='400'
				height={'20px'}
				>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('edit', {
			id: 'edit',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'>
				</Text>
			),
			cell: (info) => {
				return(
				<Flex align='center' w={'50px'}>
					<Text fontWeight='400' >
						{<IconBox
						w="44px"
						h="24px"
						aria-label="Stop Session" 
						onClick={() => router.push(`/policy/add?name=${info.row.original.name}`)}
						icon={
							<Icon 
							w="24px"
							h="24px" 
							as={EditIcon} 
							_hover={{ cursor: 'pointer' }}
							></Icon>
						}>
						</IconBox>}
					</Text>
				</Flex>
			)}
		})
	];

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

	// 파일 업로드
	// 서버로 데이터 전송
	const uploadDataToServer = async (data:any) => {
	  try {
		const response = await fetch(`${backIP}/policy/upload`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				data: data
			  })
		})
		.then((result) => {
			console.log('Data uploaded successfully:', result);
		});		
	  } catch (error) {
		console.error('Upload failed:', error);
	  }
	};

	// 파일 읽기 및 파싱
	const readExcelFile = (file:any) => {
	  const reader = new FileReader();
	  reader.onload = (e:any) => {
		const data = new Uint8Array(e.target.result);
		const workbook = XLSX.read(data, { type: 'array' });
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];
		const json = XLSX.utils.sheet_to_json(worksheet);
		setFileData(json);

		// console.log('sheetName',sheetName);
		// console.log('worksheet',worksheet);		
		// console.log('json',json);
		// const jsonKey = Object.keys(json[0]);
		// console.log('jsonKey',jsonKey);

		// if(!jsonKey.includes('name') || !jsonKey.includes('group') || !jsonKey.includes('context') || !jsonKey.includes('parameter')) {
		// 	Swal.fire({
		// 		title: '액셀 업로드',
		// 		html: `<div style="font-size: 14px;">항목이  <br />관리자가 해제하기 전까지 접속이 불가능합니다.</div>`,
		// 		confirmButtonText: '닫기',
		// 		confirmButtonColor: '#7A4C07',
		// 		focusConfirm: false,
		// 		customClass: {
		// 		  popup: 'custom-popup-class',
		// 		  title: 'custom-title-class',
		// 		  loader: 'custom-content-class',
		// 		  confirmButton: 'custom-confirm-button-class'
		// 		},
		// 	  })
		// }
		

		// json.map(data => {
			
		// });
		
		// uploadDataToServer(json);
	  };
	  reader.readAsArrayBuffer(file);
	};

	// 파일 선택
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		
		if (file) {
			readExcelFile(file);
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current.click();
	}

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box>
				<Flex 
					justifyContent={'flex-end'} 
					mb={'3'}
				>
			      <Input
						type="file"
						ref={fileInputRef}
						style={{ display: 'none' }}
						accept=".xlsx, .xls, .csv"
						onChange={handleFileChange}
					/>
					<IconButton
						aria-label="excel Upload"
						w={'24px'} mr={'3px'}
						icon={<FaCloudUploadAlt size={'24'}></FaCloudUploadAlt>}
						onClick={handleButtonClick}
					/>
					<IconButton
						aria-label="New Policy"
						w={'24px'}
						icon={<MdGavel size={'24'}></MdGavel>}
						onClick={() => router.push('/policy/add')}
					/>
				</Flex>
				<Table borderTop={'2px solid black'} margin={'12px auto 24px'}>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
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
						{data !== undefined && data !== null && table?.getRowModel()?.rows.slice(page * rows, (page + 1) * rows).map((row) => {
							return (
								<Tr key={row.id} _hover={{ backgroundColor: '#F2F7FF' }} >
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												border={'1px solid #ccc'}
                            					cursor='pointer'
												w={cell.column.id === 'progress' ? '80px' : ''}
												p={'10px'}
												// pl={'15px'}
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
						count={data !== undefined && data !== null && table?.getRowModel()?.rows.length}
						pageSize={rows}
						onPageChange={handlePageClick}
					></Paginate>
				</Flex>
			</Box>
		</Card>
	);
}
