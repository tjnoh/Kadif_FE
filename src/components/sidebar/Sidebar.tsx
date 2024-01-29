import React from 'react'

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  Button,
  DrawerHeader
} from '@chakra-ui/react'
import Content from 'components/sidebar/components/Content'
import {
  renderThumb,
  renderTrack,
  renderView
} from 'components/scrollbar/Scrollbar'
import { Scrollbars } from 'react-custom-scrollbars-2'

// Assets
import { IoMenuOutline } from 'react-icons/io5'
import { IRoute } from 'types/navigation'
import { isWindowAvailable } from 'utils/navigation'
import { usePathname } from 'next/navigation'
import { frontIP } from 'utils/ipDomain'

interface SidebarResponsiveProps {
  routes: IRoute[]
}

interface SidebarProps extends SidebarResponsiveProps {
  [x: string]: any
}

function Sidebar(props: SidebarProps) {
  const { routes } = props

  let variantChange = '0.2s linear'
  let shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  )
  // Chakra Color Mode
  let sidebarBg = useColorModeValue('white', 'navy.800')
  let sidebarMargins = '0px'

  // SIDEBAR
  return (
    <Box display={{ sm: 'none', xl: 'block' }} position='fixed' minH='100%'>
      <Box
        // bg={'messenger.800'}
        bg={'#272263'}
        transition={variantChange}
        w='210px'
        h='100vh'
        m={sidebarMargins}
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}
        float='right'
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  )
}

// FUNCTIONS

export function SidebarResponsive(props: SidebarResponsiveProps) {
  let sidebarBackgroundColor = useColorModeValue('white', 'navy.800')
  let menuColor = useColorModeValue('gray.400', 'white')
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()

  const { routes } = props
  //  BRAND

  const onCloseDrawer = () => {
    // window.location.reload();
 

    onClose();  
  }
  

  return (
    <div className='h2'
      
    >
      <Flex
        display={{ sm: 'flex', xl: 'none' }}
        alignItems='center'
        justifyContent='flex-end'
      >
        <Flex
          ref={btnRef}
          w='max-content'
          h='max-content'
          onClick={onOpen}
          mr='30px'
          mt='20px'
        >
          <Icon
            as={IoMenuOutline}
            color={menuColor}
            my='auto'
            w='30px'
            h='30px'
            me='20px'
            _hover={{ cursor: 'pointer' }}
          />
        </Flex>
        <Drawer
          closeOnOverlayClick
          isOpen={isOpen}
          onClose={onCloseDrawer}
          placement='left'
          finalFocusRef={btnRef}
        >
          <DrawerOverlay  />
          <DrawerContent
            maxWidth='210px'
            maxHeight='100vh'
            bg={'#272263'}
          >
            <DrawerCloseButton
              zIndex='3'
              onClick={onCloseDrawer}
              color={'white'}
              _focus={{ boxShadow: 'none' }}
              _hover={{ boxShadow: 'none' }}
            />
            <DrawerBody
              bg={'#272263'}
              w='210px'
              h='100vh'
              px='0rem'
              pb='0'
            >
              <Scrollbars
                autoHide
                renderTrackVertical={renderTrack}
                renderThumbVertical={renderThumb}
                renderView={renderView}
              >
                <Content routes={routes} />
              </Scrollbars>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </div>
  )
}
// PROPS

export default Sidebar
