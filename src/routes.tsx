import { AtSignIcon, EmailIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { BsClipboardData } from 'react-icons/bs';
import { IoMdAnalytics } from 'react-icons/io';
import {
  MdBarChart,
  MdLock,
  MdManageAccounts,
  MdNotStarted,
  MdNote,
  MdOutlineFactCheck,
  MdOutlineListAlt,
  MdOutlineManageSearch,
  MdOutlinePerson3,
  MdOutlinePolicy,
  MdOutlineQueuePlayNext,
  MdPeople,
} from 'react-icons/md';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/dashboard',
    path: '/default',
    icon: <Icon as={AtSignIcon} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '점검 정책',
    layout: '/policy',
    path: '/list',
    // secondary: true,
    // secondaryLinks: [
    //   {
    //     name: '실행',
    //     path: '/list',
    //     icon: <Icon as={MdOutlineQueuePlayNext} width="24px" height="24px" color="inherit" />
    //   },
    //   {
    //     name: '미실행',
    //     path: '/result',
    //     icon: <Icon as={TbDeviceDesktopAnalytics} width="24px" height="24px" color="inherit" />
    //   }
    // ],
    icon: <Icon as={MdOutlinePolicy} width="24px" height="24px" color="inherit" />,
  },
  {
    name: '세션 목록',
    layout: '/data',
    path: '/tables',
    icon: <Icon as={MdOutlineManageSearch} width="24px" height="24px" color="inherit" />,
  },
  // {
  //   name: '분석',
  //   layout: '/analytics',
  //   path: '/main',
  //   icon: <Icon as={IoMdAnalytics} width="20px" height="20px" color="inherit" />,
  // },
 {
    name: '사용자 관리',
    layout: '/users',
    path: '/control',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '본인정보수정',
    layout: '/profile',
    path: '/edit',
    icon: <Icon as={MdManageAccounts} width="20px" height="20px" color="inherit" />,
  },
/*  {
    name: '로그',
    layout: '/log',
    path: '',
    icon: <Icon as={MdFileCopy} width="20px" height="20px" color="inherit" />,
    secondary: true,
    secondaryLinks: [{
      name: '감사 로그',
      path: '/config'
    },
    {
      name: '에러 로그',
      path: '/error',
    }
    ]
  },*/
  {
    name: '로그아웃',
    layout: '/auth',
    path: '/sign-out',
    icon: <Icon as={MdOutlinePerson3} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
