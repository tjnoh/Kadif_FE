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
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
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
    // secondary: true,
    // secondaryLinks: [
    //   {
    //     name: '보안성 평가 시나리오',
    //     path: '/tables'
    //   },
    //   {
    //     name: '보안성 평가 API 목록',
    //     path: '/leaked'
    //   }
    // ],
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
    layout: '/account',
    path: '/edit',
    icon: <Icon as={MdManageAccounts} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '로그인',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '회원가입',
    layout: '/auth',
    path: '/sign-up',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
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
    layout: '/profile',
    path: '/logout',
    icon: <Icon as={MdOutlinePerson3} width="20px" height="20px" color="inherit" />,
  },
{
    name: '비밀번호 변경',
    layout: '/pwd',
    path: '/freq',
    icon: <Icon as={MdOutlinePerson3} width="20px" height="20px" color="inherit" />,
  },
  {
    name: '팝업창',
    layout: '/notice',
    path: '/popup',
  }
];

export default routes;
