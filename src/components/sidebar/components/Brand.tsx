// Chakra imports
import { Flex, Img, Link, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';
import { frontIP } from 'utils/ipDomain';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	const brandClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		const savedIndex = sessionStorage.getItem('sidebarIndex');
  
		if (savedIndex) {
			sessionStorage .setItem('sidebarIndex', '');
		}

		window.location.href = `${frontIP}/dashboard/default`;
	}

	return (
		<Flex alignItems='center' flexDirection='column'>
			{/* <HorizonLogo h='175px' w='175px' my='32px' color={logoColor} /> */}
			{/* <HSeparator mb='20px' />/ */}
			<Link
			href={`${frontIP}/dashboard/default`}
			onClick = {brandClick}
			>
				<h2 color={'white'}>Pnc 솔루션</h2>
			</Link>
		</Flex>
	);
}

export default SidebarBrand;
