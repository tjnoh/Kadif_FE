'use client';
// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
  Select,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Text,
  DrawerCloseButton,
  DrawerHeader,
  Input,
  DrawerFooter,
  Flex,
  IconButton,
} from '@chakra-ui/react';

import Sidebar, { SidebarResponsive } from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import routes from 'routes';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// Custom Chakra theme
export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // functions for changing the states from components
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isOpen) {

    }
  }, [isOpen]);

  const bg = useColorModeValue('secondaryGray.300', 'navy.900');
  const [contentState, setContentState] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('contentState') : 'true'
  );
  
  const changeState = () => {
    if (contentState === 'true') {
      setContentState('false');
      localStorage.setItem('contentState', 'false')
    } else {
      setContentState('true');
      localStorage.setItem('contentState', 'true')
    }
  }

  return (
    <Box h="100vh" w="100vw" bg={bg}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} contentState={contentState} changeState={changeState} display="none" {...rest} />
        <SidebarResponsive routes={routes} contentState={contentState} changeState={changeState} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: (contentState === 'true' ? 'calc( 100% - 225px )' : 'calc( 100% - 85px )') }}
          maxWidth={{ base: '100%', xl: (contentState === 'true' ? 'calc( 100% - 225px )' : 'calc( 100% - 85px )') }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box
            mx="auto"
            p={{ base: '20px', md: '15px' }}
            pe="20px"
            minH="100vh"
            pt='0px'
          >
            {children}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
