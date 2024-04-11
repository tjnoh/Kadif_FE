// components/TreeTable.tsx
import { Box, Button, Checkbox, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SortableTree from 'react-sortable-tree';
import "react-sortable-tree/style.css";

export default function Tree(
  props : {treeData:any; isOpen:any; onOpen:any; onClose:any; modalMessage:any; setModalMessage:any }
) {
  const {treeData, isOpen, onOpen, onClose, modalMessage, setModalMessage} = props;
  const [data, setData] = useState(treeData);

  function updateTreeData(revData:any) {
    setData(revData);
  }

  function handleCheck(e:any, parentNode:any, node:any) {
    let checkflag = false;
    const changeData = data.map((item:any) => {
      if (parentNode && item.title === parentNode.title) {
          // parentNode가 있고 현재 item이 parentNode와 일치할 경우
          console.log('parentNode.title : ',parentNode.title,' item.title : ',item.title);
          
          const updatedChildren = item.children.map((child:any) => {
            console.log('child',child);
            
              if (child.title === node.title) {
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
      } else if (!parentNode && item.title === node.title) {
          // parentNode가 없고 현재 item이 선택된 node와 일치할 경우, Group 클릭 시
          const updatedChildren = item.children.map((child:any) => ({
              ...child,
              checked: e
          }));

          return { ...item, checked: e, children: updatedChildren };
      }
      return item;
  });
  
    setData(changeData);
  }

  function onClickParameter(node:any) {
    console.log('title',node);
  }

  console.log('modalMessage', modalMessage);
  

  return (
    // DndProvider => Tree에서 Drag & Drop 관련 에러 발생하여 사용
    <DndProvider backend={HTML5Backend}>                
      <Box height={'75vh'} overflow={'hidden'} width={'100%'} sx={{ '.rst__virtualScrollOverride': { overflow: 'hidden !important' } }}>
        <SortableTree treeData={data} onChange={(treeData) => updateTreeData(treeData)}
        rowHeight={40}
        canDrag={false}
        generateNodeProps={(rowInfo:any) => {
          const width = rowInfo.node.children !== undefined && rowInfo.node.children !== null ? 'calc( 100% - 1px)' : 'calc( 100% - 47px)';
          const name = (rowInfo.parentNode !== undefined && rowInfo.parentNode !== null) ? `${rowInfo.parentNode.title}/${rowInfo.node.title}` : `${rowInfo.node.title}`;
          const checked = rowInfo.node.checked;

          return {
          title: (
          <Flex>
            <Checkbox
            id={name}
            onChange={e => handleCheck(e.target.checked,rowInfo.parentNode,rowInfo.node)}
            isChecked={checked}
            w={'20px'} h={'20px'}
            ></Checkbox>
            {rowInfo.node.title}
          </Flex>
          ),
          buttons: [
              <Button height={'24px'} borderRadius={'0px'} bgColor={'blue.500'} lineHeight={'24px'} color={'white'}
              key={rowInfo.node.title} onClick={() => onClickParameter(rowInfo.node)}>parameter</Button>
          ],
          style: {
            width : width,
            height: "32px"
          }};
        }}
        />
      </Box>


      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'6xl'} >
          <ModalOverlay />
          <ModalContent >
            <ModalHeader>전역 셋팅</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {modalMessage}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </DndProvider>
  );
};
