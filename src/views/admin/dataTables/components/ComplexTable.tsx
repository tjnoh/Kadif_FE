import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, IconButton, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
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

type RowObj = {
	name: string;
	status: string;
	date: string;
	progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
	const { tableData } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('black', 'white');
	let defaultData = tableData;
	const router = useRouter();

	function onClickEdit() {
		router.push('/policy/add');
	}

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
					onClick={() => router.push(`/policy/edit?name=${info.getValue()}`)}
					cursor={'pointer'}
					>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('status', {
			id: 'status',
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
					<Text fontWeight='400'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('date', {
			id: 'date',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
				>
					작성자
				</Text>
			),
			cell: (info) => (
				<Text color={'black'} fontSize='sm' fontWeight='400'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('progress', {
			id: 'progress',
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
						onClick={onClickEdit}
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
			<Box>
				<Flex 
					justifyContent={'flex-end'} 
					mb={'3'}
				>
					<IconButton
						aria-label="New Policy"
						icon={<MdGavel></MdGavel>}
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
						{table.getRowModel().rows.slice(0, 4).map((row) => {
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
			</Box>
		</Card>
	);
}
