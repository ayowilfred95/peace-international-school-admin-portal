import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export default function NotificationsPopover() {
  useEffect(() => {
    handlePush();
  }, []);

  const [notifications, setNotifications] = useState([]);

  // const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const USER = JSON.parse(window.localStorage.getItem('user-info'));

  const token = USER.token;

  const handlePush = async () => {
    // e.preventDefault();

    try {
      let result = await fetch('https://ulego.ng/api/v1/notification', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json ',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      result = await result.json();
      console.log('result', result);
      setNotifications(result.data ?? []);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleMarkAllAsRead = () => {
  //   setNotifications(
  //     notifications.map((notification) => ({
  //       ...notification,
  //       isUnRead: false,
  //     }))
  //   );
  // };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={notifications.length} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have unread messages
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {notifications.slice(0, 5).map((notification) => (
            <List sx={{ p: 3 }} key={notification.id} disablePadding>
              <Typography variant="h6">{notification.title}</Typography>
              <Typography variant="body">{notification.body}</Typography>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.disabled',
                }}
              >
                <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
                {fToNow(notification.createdAt)}
              </Typography>
            </List>
          ))}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

// NotificationItem.propTypes = {
//   notification: PropTypes.shape({
//     createdAt: PropTypes.instanceOf(Date),
//     id: PropTypes.string,
//     isUnRead: PropTypes.bool,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     type: PropTypes.string,
//     avatar: PropTypes.any,
//   }),
// };

// function NotificationItem({ notification }) {
//   const {  title } = renderContent(notification);

//   return (
//     <ListItemButton
//       sx={{
//         py: 1.5,
//         px: 2.5,
//         mt: '1px',
//         ...(notification.isUnRead && {
//           bgcolor: 'action.selected',
//         }),
//       }}
//     >

//       <ListItemText
//         primary={title}
//         secondary={
//           <Typography
//             variant="caption"
//             sx={{
//               mt: 0.5,
//               display: 'flex',
//               alignItems: 'center',
//               color: 'text.disabled',
//             }}
//           >
//             <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
//             {fToNow(notification.createdAt)}
//           </Typography>
//         }
//       />
//     </ListItemButton>
//   );
// }

// // ----------------------------------------------------------------------

// function renderContent(notification) {
//   const title = (
//     <Typography variant="subtitle2">
//       {notification.title}
//       <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
//         &nbsp; {noCase(notification.description)}
//       </Typography>
//     </Typography>
//   );

//   if (notification.type === 'order_placed') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'order_shipped') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'mail') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'chat_message') {
//     return {
//       avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
//       title,
//     };
//   }
//   return {
//     avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
//     title,
//   };
// }
