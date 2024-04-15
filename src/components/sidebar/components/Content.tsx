// chakra imports
import {Box, Button, Flex, IconButton, Stack} from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import React, { useEffect, useState } from 'react';
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightCollapseFilled, TbLayoutSidebarRightExpand, TbLayoutSidebarRightExpandFilled } from 'react-icons/tb';
import { IRoute } from 'types/navigation';
import { backIP } from 'utils/ipDomain';

// FUNCTIONS

interface SidebarContentProps {
	routes: IRoute[];
	contentState:string;
	changeState:VoidFunction;
}

function SidebarContent(props: SidebarContentProps) {
	const { routes, contentState, changeState } = props;

	const [privilege, setPrivilege] = useState();

	useEffect(() => {
		const fetchPrivilege = async () => {
			const response = await fetch(`${backIP}/user/privilege`, {
				credentials:'include',
			});			
			const data = await response.json();
			setPrivilege(data[0]?.privilege);
		}
		fetchPrivilege();
	}, []);


	// SIDEBAR
	return (
		<Flex w={contentState === 'true' ? '':'80px'} direction='column' height='100%' pt='25px' borderRadius='30px'>
			{/*<Brand />*/}
			<Stack direction='column' mt='16px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<Links routes={routes} privilege={privilege} contentState={contentState} />
				</Box>
			</Stack>
			<IconButton
				m={'5'}
				backgroundColor={'transparent'}
				color={'#A0AEC0'}
				width={'35px'} height={'35px'}
                aria-label=""
				_hover={{
					bgColor:'#9AA4C7',
					color : '#272263'
				}}
                icon={contentState==='true' ? <TbLayoutSidebarRightExpand size={'30'}></TbLayoutSidebarRightExpand> : <TbLayoutSidebarRightCollapse size={'30'}></TbLayoutSidebarRightCollapse >}
                onClick={() => changeState()}
              />
		</Flex>
	);
}

export default SidebarContent;
