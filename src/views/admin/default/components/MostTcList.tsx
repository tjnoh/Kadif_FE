import {
  Box,
  Flex,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
// Assets
import { mostTcAlias} from 'utils/alias';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function MostTcTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  let defaultData = tableData;
  let tableName = '자주 사용한 Test Case TOP 5'
  let columns = [];  
  console.log("tableData : ", tableData);
  const defaultDataKeys = tableData?.length > 0 ? Object.keys(tableData[0]) : [];
  for (let i = 0; i < defaultDataKeys?.length; i++) {
    columns.push(
      columnHelper.accessor(defaultDataKeys[i], {
        id: defaultDataKeys[i],
        header: () => (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: '10px', lg: '12px' }}
            color="Black"
          >
            {defaultDataKeys[i]}
          </Text>
        ),
        cell: (info: any) => (
          <Tooltip label={info.getValue()}>
            <Flex align="center">
              <Text
                color={textColor}
                fontSize="sm"
                fontWeight="100"
              >
                {info.getValue()}
              </Text>
            </Flex>
          </Tooltip>
        ),
      }),
    );
  }
  const [data, setData] = React.useState(() => {
    return tableData !== undefined && tableData;
  });
  React.useEffect(() => {
    if (tableData !== undefined) {
      setData(tableData);
    }
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

  if (!tableData) {
    return <div>Loading...</div>; // 로딩 중일 때의 UI 처리
  }
  
  console.log("columns : ", columns);
  
  return (
    <Card
      borderRadius={'0px'}
      flexDirection="column"
      w="100%"
      px="0px"
      height="350px"
      overflowX={{ sm: 'hidden', lg: 'hidden' }}
      overflowY={{ sm: 'hidden', lg: 'hidden' }}
      p={'0px'}
    >
      <Flex
        height={'40px'}
        maxH={'40px'}
        minH={'40px'}
        alignSelf={'start'}
        width={'100%'}
        mt={'10px'}
        mb="8px"
        pl={'10px'}
        pr={'10px'}
      >
        <Text
          w="100%"
          justifySelf={'center'}
          lineHeight={'40px'}
          color={'#03619E'}
          fontSize={'18px'}
          fontWeight={900}
          cursor={'pointer'}
        >
          {tableName}
        </Text>
      </Flex>
      <Box width="100%">
        {data.length !== 0 ? (
          <Table variant="simple" color="gray.500" mb="24px" width="100%">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    let headerText = mostTcAlias[header.id];                    
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        borderColor={borderColor}
                        cursor="pointer"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        width={
                          header.id === 'r_tc_name' ||
                          header.id === 'p_name' 
                            ? 'auto' : '20%'
                        }
                        px={'10px'}
                        pt="5px"
                        pb="5px"
                        paddingInlineEnd="0px"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                          <Flex
                            justifyContent="space-between"
                            align="center"
                            fontSize={{ sm: '10px', lg: '12px' }}
                            color="gray.400"
                          >
                            {flexRender(
                              headerText,
                              header.getContext(),
                            )}
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
              {table !== undefined &&
                table.getRowModel() &&
                table.getRowModel().rows &&
                table
                  .getRowModel()
                  .rows
                  .map((row) => {
                    return (
                      <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <Td
                              key={cell.id}
                              fontSize={{ sm: '12px' }}
                              fontWeight={'100'}
                              borderColor="transparent"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              px={'10px'}
                              pt="15px"
                              pb="15px"
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
        ) : (
			<Text ml={'10px'} fontSize={'17px'} fontWeight={'700'}>해당 데이터가 존재하지 않습니다!</Text>
        )}
      </Box>
    </Card>
  );
}
