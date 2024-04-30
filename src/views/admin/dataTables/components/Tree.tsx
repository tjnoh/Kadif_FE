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
import SortableTree from 'react-sortable-tree';
import "react-sortable-tree/style.css";

export default function Tree(
  props : {treeData:any; setTreeData:any; onClickParameter:any, modalMessage:any; setModalMessage:any; chkReadOnly:any; }
) {
  const {treeData, setTreeData, onClickParameter, chkReadOnly} = props;


  function updateTree(data:any){
    setTreeData(data);
  }

  // checkBox Handling
  function handleCheck(e:any, parentNode:any, node:any) {
    let checkflag = false;
    const changeData = treeData.map((item:any) => {
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
  
  setTreeData(changeData);
  }

  return (
    // DndProvider => Tree에서 Drag & Drop 관련 에러 발생하여 사용
    <DndProvider backend={HTML5Backend}>                
      <Box height={'65vh'} overflowY={'hidden'} width={'100%'} 
        overflowX={'hidden'}
      >
        <SortableTree treeData={treeData} onChange={(treeData) => updateTree(treeData)}
        rowHeight={26}
        canDrag={false}
        generateNodeProps={(rowInfo:any) => {
          const width = rowInfo.node.children !== undefined && rowInfo.node.children !== null ? 'calc( 100% - 3px)' : 'calc( 100% - 47px)';
          const name = (rowInfo.node.tc_name === undefined || rowInfo.node.tc_name === null) ? rowInfo.node.tc_group : rowInfo.node.tc_name;
          const checked = rowInfo.node.checked;

          return {
          title: (
          <Flex w={'15vw'} 
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
            width={'55vw'} h={'100%'}><Box display={'flex'} alignSelf={'center'}>{rowInfo.node.tc_context}</Box></Flex>
          ),
          buttons: [
            rowInfo.node.tc_parameter !== '[{}]' && rowInfo.node.tc_parameter !== undefined ? <Button height={'22px'} borderRadius={'0px'} bgColor={'blue.500'} color={'white'} fontSize={'sm'}
              key={rowInfo.node.title} onClick={() => onClickParameter(rowInfo.node)}><Text height={'100%'} lineHeight={'18px'} >parameters</Text></Button> : <></>
          ],
          style: {
            width : width,
            height: '10px'
          }
        };
        }}
        />
      </Box>
    </DndProvider>
  );
};
