// component
import BeenhereIcon from '@mui/icons-material/Beenhere';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SvgColor from '../../../components/svg-color';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon:<DashboardIcon/> ,
  },
  {
    title: 'student List',
    path: '/dashboard/student',
    icon: <Diversity3Icon/>,
  },
  {
    title: 'Teachers',
    path: '/dashboard/teachers',
    icon: <PeopleIcon/>,
  },
  {
    title: 'Result',
    path: '/dashboard/result',
    icon: <BeenhereIcon/>,
  },
  {
    title: 'Tests',
    path: '/dashboard/tests',
    icon: <HistoryEduIcon/>,
  },
  {
    title: 'Payment',
    path: '/dashboard/payment',
    icon:<ReceiptIcon/> ,
  },
  {
    title: 'Announcement',
    path: '/dashboard/push',
    icon: <CampaignIcon/>,
  },
  {
    title: 'Overall Best',
    path: '/dashboard/overall_best',
    icon: <EmojiEventsRoundedIcon/>,
  },

];

// export default navConfig;



export  const teachherNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon:<DashboardIcon/> ,
  },
  {
    title: 'student List',
    path: '/dashboard/student',
    icon: <Diversity3Icon/>,
  },
  {
    title: 'Result',
    path: '/dashboard/result',
    icon: <BeenhereIcon/>,
  },
  {
    title: 'Tests',
    path: '/dashboard/tests',
    icon: <HistoryEduIcon/>,
  },
  {
    title: 'Overall Best',
    path: '/dashboard/overall_best',
    icon: <EmojiEventsRoundedIcon/>,
  },

];

// export default teachherNavConfig;
