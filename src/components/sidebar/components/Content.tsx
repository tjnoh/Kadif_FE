// chakra imports
import { Box, Flex, Stack } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import { useEffect, useState } from 'react';
import { IRoute } from 'types/navigation';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';

// FUNCTIONS

interface SidebarContentProps {
	routes: IRoute[];
}

function SidebarContent(props: SidebarContentProps) {
	const { routes } = props;

	const [grade, setGrade] = useState(1);

	useEffect(() => {
	  getNameCookie().then((userNameCookie) => {
		if (userNameCookie) {
		  fetch(`${backIP}/user/grade/` + userNameCookie)
			.then((response) => response.json())
			.then((result) => {
				setGrade(result);
			})
			.catch((error) => {
			  console.log('error 발생 : ' + error);
			});
		}
	  });
	}, []);
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='16px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<Links routes={routes} grade={grade}/>
				</Box>
			</Stack>
		</Flex>
	);
}

export default SidebarContent;
