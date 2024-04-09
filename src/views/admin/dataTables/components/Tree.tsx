// components/TreeTable.tsx
import { Box, Button, Checkbox, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';
import "react-sortable-tree/style.css";

export default function Tree(
  props : {treeData:any; }
) {
  const {treeData} = props;
  const [data, setData] = useState(treeData);

  function updateTreeData(revData:any) {
    setData(revData);
  }

  function allCheckGroup(value:any, title:any) {
    const changeData = {...data};
    console.log('changeData',changeData);
  }

  function handleCheck(e:any, title:any) {
    let changeData = {...data};
    console.log('checkbox : ', e, ', title : ', title);
    
    // Group 클릭시
    for(let i=0; i<changeData.length; i++) {      
      if(title === changeData[i].title) {
        changeData[i].checked = e;
        console.log(changeData[i]);
        
        for(let j = 0; j < changeData[i].children.length; j++) {
          changeData[i].children[j].checked = e;
        }        
        break;
      }
    }

    console.log('changeData',changeData);
    setData(changeData);
  }

  function onClickParameter(title:any) {
    console.log('title',title);
  }

  console.log('data',data);
  

  return (
    <Box height={'100vh'}>
      <SortableTree treeData={data} onChange={(treeData) => updateTreeData(treeData)}
      canDrag={false}
      generateNodeProps={(rowInfo:any) => {
        console.log('rowInfo',rowInfo);
        const width = rowInfo.node.children !== undefined && rowInfo.node.children !== null ? 'calc( 100%)' : 'calc( 100% - 44px)';
        const name = (rowInfo.parentNode !== undefined && rowInfo.parentNode !== null) ? `${rowInfo.parentNode.title}/${rowInfo.node.title}` : `${rowInfo.node.title}`;
        const checked = rowInfo.node.checked;

        return {
        title: (
         <Flex>
          <Checkbox
          id={name}
          onChange={e => handleCheck(e.target.checked,rowInfo.node)}
          isChecked={checked}
          w={'20px'} h={'20px'}
          ></Checkbox>
          {rowInfo.node.title}
         </Flex>
        ),
        buttons: [
            <Button key={rowInfo.node.title} onClick={() => onClickParameter(rowInfo.node.title)}>parameter</Button>
        ],
        style: {
          width : width,
          height: "45px"
        }};
      }}
      />
    </Box>
  );
};
