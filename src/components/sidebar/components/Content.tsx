// chakra imports
import { Box, Flex, Stack } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import { useEffect, useState } from 'react';
import { IRoute } from 'types/navigation';
import { backIP } from 'utils/ipDomain';

// FUNCTIONS

interface SidebarContentProps {
	routes: IRoute[];
}

function SidebarContent(props: SidebarContentProps) {
	const { routes } = props;

	const [grade, setGrade] = useState();

	useEffect(() => {
		const fetchGrade = async () => {
			const response = await fetch(`${backIP}/user/grade`, {
				credentials:'include',
			});
			const data = await response.json();
			setGrade(data[0].grade);
		}
		fetchGrade();
	}, []);


	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='16px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<Links routes={routes} grade={grade} />
				</Box>
			</Stack>
		</Flex>
	);
}

export default SidebarContent;
