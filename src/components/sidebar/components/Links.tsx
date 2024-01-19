/* eslint-disable */

// chakra imports
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface SidebarLinksProps {
  routes: IRoute[];
  grade: any;
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes, grade } = props;

  //   Chakra color mode
  const pathname = usePathname();

  let activeColor = useColorModeValue('gray.700', 'white');
  let inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600',
  );
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    
    return routes.map((route, index: number) => {
      if (route.secondary || (grade[0]?.grade !== 3 && route.secondaryLinks && route.secondaryLinks[0]?.name === '사용자 관리')) {
        return (
          <Accordion allowMultiple key={index}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  {route.icon ? (
                    <Box>
                      <HStack
                        spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
                        py="5px"
                        ps="10px"
                      >
                        <Flex w="100%" alignItems="center" justifyContent="center">
                          <Box
                            color={
                              activeRoute(route.path.toLowerCase())
                                ? activeIcon
                                : textColor
                            }
                            me="18px"
                          >
                            {route.icon}
                          </Box>
                          <Text
                            me="auto"
                            color={
                              activeRoute(route.path.toLowerCase())
                                ? activeColor
                                : textColor
                            }
                            fontWeight={
                              activeRoute(route.path.toLowerCase())
                                ? 'bold'
                                : 'normal'
                            }
                          >
                            {route.name}
                          </Text>
                        </Flex>
                        <Box
                          h="36px"
                          w="4px"
                          bg={
                            activeRoute(route.path.toLowerCase())
                              ? brandColor
                              : 'transparent'
                          }
                          borderRadius="5px"
                        />
                      </HStack>
                    </Box>
                  ) : (
                    <Box>
                      <HStack
                        spacing={
                          activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                        }
                        py="5px"
                        ps="10px"
                      >
                        <Text
                          me="auto"
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeColor
                              : inactiveColor
                          }
                          fontWeight={
                            activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                          }
                        >
                          {route.name}
                        </Text>
                        <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                      </HStack>
                    </Box>
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {/* Secondary links go here */}
                {route.secondaryLinks && (
                  <Box pl="4"> {/* Adjust the padding as needed */}
                    {route.secondaryLinks.map((secondaryLink, secondaryIndex) => (
                      <Link key={secondaryIndex} href={route.layout + secondaryLink.path}>
                        {/* Render your secondary link as needed */}
                        <Text>{secondaryLink.name}</Text>
                      </Link>
                    ))}
                  </Box>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } else if (route.layout === '/dashboard' || route.layout === '/data' || (grade[0]?.grade !== 3 && route.layout === '/users') ||
        route.layout === '/profile' || route.layout === '/setting') {
        return (
          <Link key={index} href={route.layout + route.path}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? 'bold'
                          : 'normal'
                      }
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : 'transparent'
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </Link>
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
