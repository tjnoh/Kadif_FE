'use client';

import React, { useState } from 'react';
// Chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import TreeTable from 'views/admin/dataTables/components/TreeTable';

export default function SignIn() {
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Parent', accessor: 'parent' },
  ];

  const data = [
    { id: 1, name: 'John', age: 30, parent: '' },
    { id: 2, name: 'Alice', age: 25, parent: 'John' },
    { id: 3, name: 'Bob', age: 35, parent: 'John' },
    { id: 4, name: 'Eve', age: 28, parent: 'Alice' },
  ];

  return (
    <Card height="100%">
      <Flex
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        minH={'85vh'}
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        mb={{ base: '30px', md: '40px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '20px' }}
        flexDirection="column"
      >
      <div>
      <h1>Tree Table Example</h1>
        <TreeTable columns={columns} data={data} />
      </div>
      </Flex>
    </Card >
  );
}
