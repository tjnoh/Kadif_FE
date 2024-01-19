import { AtSignIcon, EmailIcon } from '@chakra-ui/icons';
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
    name: '사용자 관리',
    layout: '',
    path: '',
    secondary: true,
    secondaryLinks: [
      {
        name: '사용자 관리',
        path: '/users/control'
      },
      {
        name: '개인정보수정',
        path: '/profile/edit'
      }
    ],
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
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
    path: '',
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
    secondary: true,
    secondaryLinks: [{
      name: '서버',
      path: '/server'
    },
    {
      name: '에이전트',
      path: '/agent'
    },
    {
      name: '로그',
      path: '/log'
    }],
  },
  {
    name: '로그아웃',
    layout: '/profile',
    path: '/logout',
    icon: <Icon as={MdOutlinePerson3} width="20px" height="20px" color="inherit" />,
  },

];

export default routes;
