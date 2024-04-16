// components/TreeTable.tsx
import { Box, Button, Card, Checkbox, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import SortableTree from 'react-sortable-tree';
import "react-sortable-tree/style.css";
import Swal from 'sweetalert2';
import { parameterAlias } from 'utils/alias';

export default function Tree(
  props : {treeData:any; isOpen:any; onOpen:any; onClose:any; modalMessage:any; setModalMessage:any; chkReadOnly:any; }
) {
  const {treeData, isOpen, onOpen, onClose, modalMessage, setModalMessage, chkReadOnly} = props;

  // TanStack Table
  // columns table Create
  let i: number;
  let str: string = '';
  let columns:any = [];
  const columnHelper = createColumnHelper();
  const [revData, setRevData] = useState(treeData);
  const [clickParameter, setClickParameter] = useState<any>();
  const [data, setData] = useState<any>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: {name:string, align:string, width:number} }>(parameterAlias);
  const keys:any = useRef(data !== undefined && data !== null && Object.keys(data[0]));

  useEffect(() => {
    if(data !== null && data !== undefined) {
      createTable();
    } else {

    }
  }, [data]);

  useEffect(() => {
    if(modalMessage !== null && modalMessage !== undefined) {
      onOpen();
    }    
  },[modalMessage]);

  function updateTreeData(revData:any) {
    setRevData(revData);
  }

  function onModalClose() {
    onClose();
    setData(undefined); // data 초기화
  }

  // checkBox Handling
  function handleCheck(e:any, parentNode:any, node:any) {
    let checkflag = false;
    const changeData = revData.map((item:any) => {
      if (parentNode && item.tc_group === parentNode.tc_group) {
          // parentNode가 있고 현재 item이 parentNode와 일치할 경우
          const updatedChildren = item.children.map((child:any) => {
              if (child.tc_name === node.tc_name) {
                  // 조건에 맞는 child 찾아서 checked 상태 업데이트
                  if(e === true) {
                    checkflag = true;
                  }
                  return { ...child, checked: e };
              }              

              if(child.checked === true) {
                checkflag = true;
              }

              return child;
          });
          
          item.checked = checkflag;
          
          return { ...item, children: updatedChildren };
      } else if (!parentNode && item.tc_group === node.tc_group) {
          // parentNode가 없고 현재 item이 선택된 node와 일치할 경우, Group 클릭 시
          const updatedChildren = item.children.map((child:any) => ({
              ...child,
              checked: e
          }));

          return { ...item, checked: e, children: updatedChildren };
      }
      return item;
  });
  
    setRevData(changeData);
  }

  // function onChangeParameter() {

  // }


	// 마우스 드래그로 너비 조절 핸들러
	const handleColumnResize = (columnId: string, initialPosition: number) => {
		const startDrag = (e: MouseEvent) => {
			const delta = e.clientX - initialPosition;

      setColumnWidths(prevWidths => ({
        ...prevWidths,
        [columnId]: {
          ...prevWidths[columnId],
          width : Math.max(prevWidths[columnId].width + delta, 30) // 최소 너비를 50으로 설정
        }
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

  
  i = 0;
  keys.current = data !== undefined && data !== null && Object.keys(data[0]);

  while (true) {
    // if (tableData[0] === undefined) break;
    if(keys.current === false) break;
    if (i >= keys.current.length) break;      
    str = keys.current.at(i);    

    // Tables Data
    columns.push(
      columnHelper.accessor(str, {          
        id: str,
        header: () => {
          return <></>;
        },
        cell: (info: any) => {
          return (
            info.column.id === 'value' ?
                  <Input
                    border={'none'}
                    borderRadius={'0px'}
                    placeholder={info.getValue()}
                    fontSize={'13px'}
                  />
                  :
                <Tooltip label={info.getValue()}>
                <Text
                  color={'secondaryGray.900'}
                  // fontSize="s"
                  fontSize="13px"
                  fontWeight="400"
                  maxWidth="100%" // 또는 적절한 최대 너비 설정
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  display="inline-block" // 또는 "block"
                >
                  {info.getValue()}
                </Text>
              </Tooltip>
          );
        },
      }),
    );

    i++;
  }

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
    enableColumnResizing:true,
    columnResizeMode:'onChange',
  });

  function createTable() {
    const message = (
        <Box 
        width='97%'
        height={'50vh'}
        overflow={'auto'}
          >
          <Box>
            <Text w={'100%'} height={'max-content'} fontSize={'xl'} fontWeight={'bold'} mb={'10px'}>{(clickParameter.tc_name !== undefined && clickParameter.tc_name !== null) ? clickParameter.tc_name : clickParameter.tc_group}</Text>
            <Text w={'100%'} height={'max-content'} fontSize={'md'} fontWeight={'bold'} mb={'10px'}>{(clickParameter.tc_context !== undefined && clickParameter.tc_context !== null) ? clickParameter.tc_context : ''}</Text>
          </Box>
          <Table
            variant="simple"
            color="gray.500"
            id="checkTable"
            w={'95%'}
            m={'12px auto 24px'}
            borderTop={'2px solid black'}
          >
            <Thead>
              {table?.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}
                >
                  {headerGroup.headers.map((header,i) => {
                    
                    let headerText = parameterAlias[header.id].name;
                    return (
                      <Th
                        width={parameterAlias[header.id].width}
                        key={header.id}
                        id={header.id}
                        colSpan={header.colSpan}
                        border={'1px solid #ccc'}
                        backgroundColor={'#F0F0F0'}
                        cursor="pointer"
                        whiteSpace="nowrap"
                        overflow='hidden'
                        textOverflow='ellipsis'
                        pt='5px' pb='5px'
                        pl='10px' pr='10px'
                        paddingInlineEnd='0px'
                        position={'relative'}
                      >
                          <Flex
                            justifyContent="center"
                            align="center"
                            fontSize={{ sm: '12px', lg: '14px' }}
                            color="black"
                            fontWeight={'bold'}
                          >
                            <Box
                            textAlign={'center'}
                            onClick={header.column.getToggleSortingHandler()} w={'85%'}
                            >
                              {flexRender(headerText, header.getContext())}
                            </Box>
                            {{
                              asc: <FaSortUp />,
                              desc: <FaSortDown />,
                              }[header.column.getIsSorted() as string] ?? null}
                          </Flex>
                          {header.column.getCanResize() && (
                              <Box
                                {...headerProps(header.id)}
                                className={`resizer ${
                                  header.column.getIsResizing() ? 'isResizing' : ''
                                }`}
                              ></Box>
                            )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {data !== undefined &&
                table.getRowModel()
                  .rows.slice(0, data!==undefined ? data.length : 10)
                  .map((row) => {
                    return (
                      <Tr key={row.id} borderBottom={'2px solid #f0f0f0'} 
                      _hover={{ backgroundColor: '#F2F7FF' }}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <Td
                              key={cell.id}
                              fontSize={{ sm: '14px' }}
                              border={'1px solid #ccc'}
                              whiteSpace="nowrap"
                              overflow='hidden'
                              textOverflow='ellipsis'
                              // pt='5px' pb='5px'
                              p='2px'
                              cursor={'pointer'}
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
        </Box>
    );

    setModalMessage(message); // 상태 업데이트
  }  

  function onClickParameter(node:any) {    
    if(!node.checked) {
      Swal.fire({
        title: '파라미터',
        html: `<div style="font-size: 14px;">체크된 항목만 파라미터 확인이 가능합니다.</div>`,
        confirmButtonText: '닫기',
        confirmButtonColor: '#7A4C07',
        focusConfirm: false,
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          loader: 'custom-content-class',
          confirmButton: 'custom-confirm-button-class'
        },
      })
      return; 
    } else if(node.tc_parameter === undefined || node.tc_parameter === null) {
      Swal.fire({
        title: '파라미터',
        html: `<div style="font-size: 14px;">파라미터가 존재하지 않습니다.</div>`,
        confirmButtonText: '닫기',
        confirmButtonColor: '#7A4C07',
        focusConfirm: false,
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          loader: 'custom-content-class',
          confirmButton: 'custom-confirm-button-class'
        },
      })
    }

    setClickParameter(node);
    setData(node.tc_parameter);    
  }

  return (
    // DndProvider => Tree에서 Drag & Drop 관련 에러 발생하여 사용
    <DndProvider backend={HTML5Backend}>                
      <Box height={'75vh'} overflow={'hidden'} width={'100%'} sx={{ '.rst__virtualScrollOverride': { overflow: 'hidden !important' } }}>
        <SortableTree treeData={revData} onChange={(treeData) => updateTreeData(treeData)}
        rowHeight={26}
        canDrag={false}
        generateNodeProps={(rowInfo:any) => {
          const width = rowInfo.node.children !== undefined && rowInfo.node.children !== null ? 'calc( 100% - 3px)' : 'calc( 100% - 47px)';
          const name = (rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? rowInfo.node.tc_group : rowInfo.node.tc_name;
          const checked = rowInfo.node.checked;

          return {
          title: (
          <Flex w={'10vw'} 
          h={'100%'}
          bgColor={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '#F0F0F0' : 'transparent'}`}
          borderLeft={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '2px solid #F0F0F0' : 'none'}`}
          borderTop={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '2px solid #F0F0F0' : 'none'}`}
          borderBottom={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '2px solid #F0F0F0' : 'none'}`}
          >
            <Checkbox
            id={name}
            onChange={e => handleCheck(e.target.checked,rowInfo.parentNode,rowInfo.node)}
            isChecked={checked}
            w={'24px'} h={'24px'}
            pl={'5px'}
            colorScheme={chkReadOnly ? 'gray' : 'blue'}
            isReadOnly={chkReadOnly}
            ></Checkbox>
            {(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? rowInfo.node.tc_group : rowInfo.node.tc_name}
          </Flex>
          ),
          subtitle : (
            <Flex 
            bgColor={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '#F0F0F0' : 'transparent'}`}
            borderRight={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '2px solid #F0F0F0' : 'none'}`} 
            borderTop={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '2px solid #F0F0F0' : 'none'}`} 
            borderBottom={`${(rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? '2px solid #F0F0F0' : 'none'}`} 
            width={'60vw'} h={'100%'}><Box display={'flex'} alignSelf={'center'}>{rowInfo.node.tc_context}</Box></Flex>
          ),
          buttons: [
              <Button height={'22px'} borderRadius={'0px'} bgColor={'blue.500'} color={'white'} fontSize={'sm'}
              key={rowInfo.node.title} onClick={() => onClickParameter(rowInfo.node)}>parameter</Button>
          ],
          style: {
            width : width,
            height: "24px",
          }};
        }}
        />
      </Box>


      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'6xl'} >
          <ModalOverlay />
          <ModalContent >
            <ModalCloseButton />
            <ModalBody pb={6}>
              {modalMessage}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </DndProvider>
  );
};
