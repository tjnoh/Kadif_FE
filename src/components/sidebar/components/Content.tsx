// chakra imports
import { Box, Flex, Stack } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import { useEffect, useState } from 'react';
import { IRoute } from 'types/navigation';
import { fetchLogic } from 'utils/fetchData';
import { backIP } from 'utils/ipDomain';

// FUNCTIONS

interface SidebarContentProps {
	routes: IRoute[];
}

function SidebarContent(props: SidebarContentProps) {
	const { routes } = props;

	const [privilege, setPrivilege] = useState(typeof window !== "undefined" ? parseInt(localStorage.getItem("privilege")) : 3);
	console.log("privilege : ", privilege);
	
	// useEffect(() => {
	//  	fetchLogic("user/privilege", setPrivilege);
	// }, [privilege]);


	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='16px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<Links routes={routes} privilege={privilege} />
				</Box>
			</Stack>
		</Flex>
	);
}

export default SidebarContent;
