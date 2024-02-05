/* eslint-disable */

// chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface SidebarLinksProps {
  routes: IRoute[];
  grade: any;
}
interface ExpandedAccordions {
  [key: number]: boolean;
}
export function SidebarLinks(props: SidebarLinksProps) {
  const { routes, grade } = props;

  //   Chakra color mode
  const pathname = usePathname();

  let activeColor = useColorModeValue('white', 'white');
  let inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600',
  );
  let activeIcon = useColorModeValue('white', 'white');
  let textColor = useColorModeValue('gray.400', 'white');
  let brandColor = useColorModeValue('white', 'brand.400'); // 클릭시 bar
  const [expandedIndex, setExpandedIndex] = useState<number[]>();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );
  

  const handleIndex = (e:React.MouseEvent<HTMLAnchorElement>, index: number, layout:string, path:string) => {
    e.preventDefault();
    
    if(index !== -1) {
      // routes 순서         : 사용자관리(2), 설정(4), 로그(5)
      // accordion Item 순서 : 사용자관리(0), 설정(1), 로그(2)
      const value:number = index === 2 ? 0 : (index === 4 ? 1 : 2);

      setExpandedIndex([value]);      
      // 상태를 로컬 스토리지에 저장합니다.
      sessionStorage.setItem('sidebarIndex', JSON.stringify([value]));
    } else {
      setExpandedIndex([]);
      sessionStorage.setItem('sidebarIndex', '');
    }

    window.location.href = layout + path;
    
  };

  useEffect(() => {
    const savedIndex = sessionStorage.getItem('sidebarIndex');

    // routes 순서         : 사용자관리(2), 설정(4), 로그(5)
    // accordion Item 순서 : 사용자관리(0), 설정(1), 로그(2)
    if (savedIndex) {
      setExpandedIndex(JSON.parse(savedIndex));
    } else {
      if(pathname?.includes(routes[2].layout)) {
        sessionStorage.setItem('sidebarIndex', JSON.stringify([0]));
        setExpandedIndex([0]);
      } else if(pathname?.includes(routes[4].layout)) {
        sessionStorage.setItem('sidebarIndex', JSON.stringify([1]));
        setExpandedIndex([1]);
      } else if(pathname?.includes(routes[5].layout)) {
        sessionStorage.setItem('sidebarIndex', JSON.stringify([2]));
        setExpandedIndex([2]);
      } else {
        sessionStorage.setItem('sidebarIndex', '');
        setExpandedIndex([]);
      }
    }
  }, []);

  

  const handleAccordionChange = (index:number[]) => {
    setExpandedIndex(index);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    return (
      <Accordion allowMultiple={true} index={expandedIndex} onChange={handleAccordionChange}>
        {routes.map((route, index: number) => {
          if (route.secondary) {
            if (route.layout !== '/log') {
              return (
                  <AccordionItem key={index}>
                    <AccordionButton
                      paddingInlineStart="10px"
                    >
                      {route.icon ? (
                        <Box>
                          <HStack
                            spacing={
                              activeRoute(
                                route.secondaryLinks[index]?.path.toLowerCase(),
                              )
                                ? '22px'
                                : '26px'
                            }
                          >
                            <Flex
                              w="100%"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                color={
                                  activeRoute(
                                    route.secondaryLinks[
                                      index
                                    ]?.path.toLowerCase(),
                                  )
                                    ? activeIcon
                                    : textColor
                                }
                                _hover={{
                                  color: 'white',
                                  fontWeight: 'bold',
                                }}
                                me="18px"
                              >
                                {route.icon}
                              </Box>
                              <Text
                                me="auto"
                                color={
                                  activeRoute(
                                    route.secondaryLinks[
                                      index
                                    ]?.path.toLowerCase(),
                                  )
                                    ? activeColor
                                    : textColor
                                }
                                fontWeight={
                                  activeRoute(
                                    route.secondaryLinks[
                                      index
                                    ]?.path.toLowerCase(),
                                  )
                                    ? 'bold'
                                    : 'normal'
                                }
                                _hover={{
                                  color: 'white',
                                  fontWeight: 'bold',
                                }}
                              >
                                {route.name}
                              </Text>
                            </Flex>
                            <Box
                              h="36px"
                              w="4px"
                              bg={
                                activeRoute(
                                  route.secondaryLinks[index]?.path.toLowerCase(),
                                )
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
                              activeRoute(
                                route.secondaryLinks[index]?.path.toLowerCase(),
                              )
                                ? '22px'
                                : '26px'
                            }
                            py="5px"
                            ps="10px"
                          >
                            <Text
                              me="auto"
                              color={
                                activeRoute(
                                  route.secondaryLinks[index]?.path.toLowerCase(),
                                )
                                  ? activeColor
                                  : inactiveColor
                              }
                              fontWeight={
                                activeRoute(
                                  route.secondaryLinks[index]?.path.toLowerCase(),
                                )
                                  ? 'bold'
                                  : 'normal'
                              }
                              _hover={{
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            >
                              {route.name}
                            </Text>
                            <Box
                              h="36px"
                              w="4px"
                              bg="brand.400"
                              borderRadius="5px"
                            />
                          </HStack>
                        </Box>
                      )}
                    </AccordionButton>
                    <AccordionPanel>
                      {route.secondaryLinks && grade !== 3 ? (
                        <Box pl="4">
                          {route.secondaryLinks.map(
                            (secondaryLink, secondaryIndex) => (
                              <Link
                                key={secondaryIndex}
                                href={route.layout + secondaryLink.path}
                                onClick={(e) => handleIndex(e,index,route.layout,secondaryLink.path)}
                              >
                                {/* Render your secondary link as needed */}
                                <Box>
                                  <HStack
                                    spacing={
                                      activeRoute(
                                        route.secondaryLinks[
                                          secondaryIndex
                                        ]?.path.toLowerCase(),
                                      )
                                        ? '22px'
                                        : '26px'
                                    }
                                    py="5px"
                                    ps="10px"
                                  >
                                    <Text
                                      me="auto"
                                      color={
                                        activeRoute(
                                          route.secondaryLinks[
                                            secondaryIndex
                                          ]?.path.toLowerCase(),
                                        )
                                          ? activeColor
                                          : inactiveColor
                                      }
                                      fontWeight={
                                        activeRoute(
                                          route.secondaryLinks[
                                            secondaryIndex
                                          ]?.path.toLowerCase(),
                                        )
                                          ? 'bold'
                                          : 'normal'
                                      }
                                      _hover={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {secondaryLink.name}
                                    </Text>
                                    <Box
                                      h="36px"
                                      w="4px"
                                      bg={
                                        activeRoute(
                                          route.secondaryLinks[
                                            secondaryIndex
                                          ]?.path.toLowerCase(),
                                        )
                                          ? brandColor
                                          : 'transparent'
                                      }
                                      borderRadius="5px"
                                    />
                                  </HStack>
                                </Box>
                              </Link>
                            ),
                          )}
                        </Box>
                      ) : (
                        <Box pl="4">
                          {route.secondaryLinks.map(
                            (secondaryLink, secondaryIndex) =>
                              secondaryLink.name !== '사용자 관리' && (
                                <Link
                                  key={secondaryIndex}
                                  href={route.layout + secondaryLink.path}
                                >
                                  {/* Render your secondary link as needed */}
                                  <Box>
                                    <HStack
                                      spacing={
                                        activeRoute(
                                          route.secondaryLinks[
                                            secondaryIndex
                                          ]?.path.toLowerCase(),
                                        )
                                          ? '22px'
                                          : '26px'
                                      }
                                      py="5px"
                                      ps="10px"
                                    >
                                      <Text
                                        me="auto"
                                        color={
                                          activeRoute(
                                            route.secondaryLinks[
                                              secondaryIndex
                                            ]?.path.toLowerCase(),
                                          )
                                            ? activeColor
                                            : inactiveColor
                                        }
                                        fontWeight={
                                          activeRoute(
                                            route.secondaryLinks[
                                              secondaryIndex
                                            ]?.path.toLowerCase(),
                                          )
                                            ? 'bold'
                                            : 'normal'
                                        }
                                      >
                                        {secondaryLink.name}
                                      </Text>
                                      <Box
                                        h="36px"
                                        w="4px"
                                        bg={
                                          activeRoute(
                                            route.secondaryLinks[
                                              secondaryIndex
                                            ]?.path.toLowerCase(),
                                          )
                                            ? brandColor
                                            : 'transparent'
                                        }
                                        borderRadius="5px"
                                      />
                                    </HStack>
                                  </Box>
                                </Link>
                              ),
                          )}
                        </Box>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
              );
            } else {
              if(grade !== 1) {
                return null;
              } else {
                return (
                    <AccordionItem >
                      <AccordionButton
                        paddingInlineStart='10px'>
                        {route.icon ? (
                          <Box>
                            <HStack
                              spacing={activeRoute(route.secondaryLinks[index]?.path.toLowerCase()) ? '22px' : '26px'}
                            >
                              <Flex w="100%" alignItems="center" justifyContent="center">
                                <Box
                                  color={
                                    activeRoute(route.secondaryLinks[index]?.path.toLowerCase())
                                      ? activeIcon
                                      : textColor
                                  }
                                  _hover={{
                                    color: 'white',
                                    fontWeight: 'bold'
                                  }}
                                  me="18px"
                                >
                                  {route.icon}
                                </Box>
                                <Text
                                  me="auto"
                                  color={
                                    activeRoute(route.secondaryLinks[index]?.path.toLowerCase())
                                      ? activeColor
                                      : textColor
                                  }
                                  fontWeight={
                                    activeRoute(route.secondaryLinks[index]?.path.toLowerCase())
                                      ? 'bold'
                                      : 'normal'
                                  }
                                  _hover={{
                                    color: 'white',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {route.name}
                                </Text>
                              </Flex>
                              <Box
                                h="36px"
                                w="4px"
                                bg={
                                  activeRoute(route.secondaryLinks[index]?.path.toLowerCase())
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
                                activeRoute(route.secondaryLinks[index]?.path.toLowerCase()) ? '22px' : '26px'
                              }
                              py="5px"
                              ps="10px"
                            >
                              <Text
                                me="auto"
                                color={
                                  activeRoute(route.secondaryLinks[index]?.path.toLowerCase())
                                    ? activeColor
                                    : inactiveColor
                                }
                                fontWeight={
                                  activeRoute(route.secondaryLinks[index]?.path.toLowerCase()) ? 'bold' : 'normal'
                                }
                                _hover={{
                                  color: 'white',
                                  fontWeight: 'bold'
                                }}
                              >
                                {route.name}
                              </Text>
                              <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                            </HStack>
                          </Box>
                        )}
                      </AccordionButton>
                      <AccordionPanel>
                        {(route.secondaryLinks && grade !== 3) ?
                          (
                            <Box pl="4">
                              {route.secondaryLinks.map((secondaryLink, secondaryIndex) => (
                                <Link key={secondaryIndex} href={route.layout + secondaryLink.path}>
                                  {/* Render your secondary link as needed */}
                                  <Box>
                                    <HStack
                                      spacing={
                                        activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                          ? '22px'
                                          : '26px'
                                      }
                                      py="5px"
                                      ps="10px"
                                    >
                                      <Text
                                        me="auto"
                                        color={
                                          activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                            ? activeColor
                                            : inactiveColor
                                        }
                                        fontWeight={
                                          activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                            ? 'bold'
                                            : 'normal'
                                        }
                                        _hover={{
                                          color: 'white',
                                          fontWeight: 'bold'
                                        }}
                                      >
                                        {secondaryLink.name}
                                      </Text>
                                      <Box
                                        h="36px"
                                        w="4px"
                                        bg={
                                          activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                            ? brandColor
                                            : 'transparent'
                                        }
                                        borderRadius="5px"
                                      />
                                    </HStack>
                                  </Box>
                                </Link>
                              ))}
                            </Box>
                          ) : (
                            <Box pl="4">
                              {route.secondaryLinks.map((secondaryLink, secondaryIndex) => (
                                secondaryLink.name !== '사용자 관리' &&
                                < Link key={secondaryIndex} href={route.layout + secondaryLink.path} >
                                  {/* Render your secondary link as needed */}
                                  <Box>
                                    <HStack
                                      spacing={
                                        activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                          ? '22px'
                                          : '26px'
                                      }
                                      py="5px"
                                      ps="10px"
                                    >
                                      <Text
                                        me="auto"
                                        color={
                                          activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                            ? activeColor
                                            : inactiveColor
                                        }
                                        fontWeight={
                                          activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                            ? 'bold'
                                            : 'normal'
                                        }
                                      >
                                        {secondaryLink.name}
                                      </Text>
                                      <Box
                                        h="36px"
                                        w="4px"
                                        bg={
                                          activeRoute(route.secondaryLinks[secondaryIndex]?.path.toLowerCase())
                                            ? brandColor
                                            : 'transparent'
                                        }
                                        borderRadius="5px"
                                      />
                                    </HStack>
                                  </Box>
                                </Link>
                              ))}
                            </Box>
                          )}
                      </AccordionPanel>
                    </AccordionItem >
                );
              }
            }
          } else if (
            route.layout === '/dashboard' ||
            route.layout === '/data' ||
            (grade !== 3 && route.layout === '/users') ||
            route.layout === '/profile' ||
            route.layout === '/setting'
          ) {
            return (
              <Link key={index} href={route.layout + route.path} 
              onClick={(e) => handleIndex(e,-1,route.layout,route.path)}>
                {route.icon ? (
                  <Box>
                    <HStack
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                      }
                      py="5px"
                      ps="10px"
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeIcon
                              : textColor
                          }
                          me="18px"
                          _hover={{
                            color: 'white',
                            fontWeight: 'bold',
                          }}
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
                          _hover={{
                            color: 'white',
                            fontWeight: 'bold',
                          }}
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
                          activeRoute(route.path.toLowerCase())
                            ? 'bold'
                            : 'normal'
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
        })}
      </Accordion>
    );
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
