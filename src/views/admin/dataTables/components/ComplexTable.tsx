import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, IconButton, Input, Progress, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
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
import { IoTrashOutline } from 'react-icons/io5';
import { RiFileUploadLine } from 'react-icons/ri';

type RowObj = {
	name: string;
	distinction: string;
	author: string;
	edit : string;
	delete : string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any; setTableData: any; rows:any; setRows:any; page: any; setPage: any; userData:any;  }) {
	const { tableData, setTableData, rows, setRows, page, setPage, userData } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'white');
	const [data, setData] = React.useState(tableData);
	const router = useRouter();
	const fileInputRef = React.useRef(null);
	const jsonRef = React.useRef<HTMLInputElement>(null);
	const [fileData, setFileData] = React.useState([]);
	const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: {width:number, align:any} }>({
		name: {width:150, align:'start'},
		distinction: {width:350, align:'start'},
		author: {width:100, align:'start'},
		edit : {width:30, align:'center'},
		delete : {width:30, align:'center'},
	});	

	React.useEffect(() => {
		setData(tableData?.list);
	},[tableData?.list]);

	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'

				>
					보안성 평가 정책
				</Text>
			),
			cell: (info: any) => {
				
				return <Flex align='center'
				w={'100%'}
				h={'100%'}
				onClick={() => router.push(`/policy/edit?name=${info.getValue()}`)}
				cursor={'pointer'}>
					<Text fontWeight='400'
					height={'20px'}
					>
						{info.getValue()}
					</Text>
				</Flex>
			}
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
				<Flex align='center'
				onClick={() => router.push(`/policy/edit?name=${info.row.original.name}`)}
				>
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
				info.row.original.name === ' ' && info.row.original.author === ' ' && info.row.original.distinction === ' ' ? 
				<></> :
				<Flex align='center' justifyContent={'center'} alignItems={'center'}>
					{<IconBox
					w="44px"
					h="24px"
					aria-label="edit policy" 
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
				</Flex>
			)}
		}),
		columnHelper.accessor('delete', {
			id: 'delete',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'>
				</Text>
			),
			cell: (info) => {
				return(
					info.row.original.name === ' ' && info.row.original.author === ' ' && info.row.original.distinction === ' ' ? 
					<></> :
					<Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
						{
							(userData !== undefined && userData !== null && (userData[0].privilege === 1 || info.row.original.author === userData[0].username) &&
							!info.row.original.author.toLowerCase().includes('system')) ? 
							<IconBox
							w="44px"
							h="24px"
							aria-label="delete policy" 
							onClick={() => deletePolicy(info.row.original.name)}
							icon={
								<Icon 
								w="24px"
								h="24px" 
								alignSelf={'center'}
								justifySelf={'center'}
								as={IoTrashOutline} 
								_hover={{ cursor: 'pointer' }}
								></Icon>
							}>
							</IconBox>
							: <></>
						}
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

	// Paging
	const handlePageClick = (p: number) => {
		setPage(p);
	};
	// handlers
	const handleRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newRows = parseInt(e.target.value, 10); // Assuming you want to parse the value as an integer
		setRows(newRows);
	};

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

	const jsonFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (!file) return;
	  
		try {
		  // FileReader를 사용하여 파일을 읽어와 JSON 데이터로 변환합니다.
		  const reader = new FileReader();
		  reader.readAsText(file);
		  reader.onload = function () {
			const jsonData = JSON.parse(reader.result as string);
			
			// JSON 데이터를 body에 담아서 서버로 전송합니다.
			fetch(`${backIP}/policy/json`, {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(jsonData),
			})
			.then(response => {
			  if (response.ok) {
			  } else {
				console.error('File upload failed.');
			  }
			})
			.catch(error => {
			  console.error('Error uploading file:', error);
			});
		  };
		} catch (error) {
		  console.error('Error uploading file:', error);
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current.click();
	}

	const handleJsonUpload = () => {
		// 버튼 클릭 시 파일 입력 필드를 클릭합니다.
		if (jsonRef.current) {
		  jsonRef.current.click();
		}
	  };

	// 정책 삭제
	const deletePolicy = (policyName:any) => {
		Swal.fire({
			title: '정책 삭제',
			html: '<div style="font-size: 14px;">현재 정책을 삭제하시겠습니까?</div>',
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
		  }).then(async (res) => {
			if(res.isConfirmed) {
				const response = await fetch(`${backIP}/policy/delete`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({
					  policyName: policyName
					})
		
				});
				
				if(response.ok) {
					const result = await response.json();
					setTableData(result);
				}
			}
		  })
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
						ref={jsonRef}
						accept=".json"
						style={{ display: 'none' }}
						onChange={jsonFileUpload}
				/>
				<IconButton
						aria-label="json Upload"
						w={'24px'}
						icon={<RiFileUploadLine size={'24'}></RiFileUploadLine>}
						onClick={handleJsonUpload}
					/>
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
											width={columnWidths[header.id].width}
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
												p={'10px'}
												textAlign={columnWidths[cell.column.id].align}
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
