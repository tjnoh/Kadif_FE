import { AtSignIcon, EmailIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdCarCrash,
  MdPerson3,
  MdOutlinePerson3,
  MdPeople,
  MdModeEdit,
  MdSettings,
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
    layout: '/dashboard',
    path: '/default',
    icon: <Icon as={AtSignIcon} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '송신탐지내역',
    layout: '/data',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/tables',
  },
  {
    name: 'User 관리',
    layout: '/users',
    path: '/control',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '개인정보수정',
    layout : '/profile',
    path : '/edit',
    secondary : true,
    icon: <Icon as={MdModeEdit} width="20px" height="20px" color="inherit"></Icon>,
  },
  {
    name: '로그인',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '설정',
    layout: '/setting',
    path: '/log',
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '서버설정',
    layout: '/setting',
    path: '/server',
    icon: <Icon as={StarIcon} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '에이전트 설정',
    layout: '/setting',
    path: '/agent',
    icon: <Icon as={RepeatIcon} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '로그아웃',
    layout: '/profile',
    path: '/logout',
    icon: <Icon as={MdOutlinePerson3} width="20px" height="20px" color="inherit" />,
  },
  
];

export default routes;
