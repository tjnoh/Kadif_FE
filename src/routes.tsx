import { AtSignIcon, EmailIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdCarCrash,
} from 'react-icons/md';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [ 
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={AtSignIcon} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '유출탐지내역',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={EmailIcon}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    secondary: true,
  },
  {
    name: 'Media',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
  },
  {
    name: 'User 관리',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '개인정보수정',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '설정',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'ciot dashboard',
    layout : '/ciot',
    path : '/default',
    icon: <Icon as={MdCarCrash} width="20px" height="20px" color="inherit"></Icon>,
  },
];

export default routes;
