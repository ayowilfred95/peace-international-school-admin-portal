import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, createTheme, ThemeProvider } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import {navConfig, teachherNavConfig} from './config';

// ----------------------------------------------------------------------

const user = JSON.parse(window.localStorage.getItem('user-info'));

const theme = createTheme({
  palette:{
    primary:{
      main:'#0098db'
    }
  }
})
const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  color:'#fff'
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const admin =JSON.parse(localStorage.getItem('user-info')); 

  // console.log(admin.data.isAdmin);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }

  }, [pathname]);

  const renderContent = (
    <ThemeProvider theme={theme}>
          <Scrollbar
      sx={{
        height: 1,
        backgroundColor:'#051e34',
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar alt="photoURL">{user?.data?.fullName?.charAt(0)}  </Avatar>

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#f0f0f0' }}>
                {user?.data?.fullName}
              </Typography>

              <Typography variant="body2" sx={{ color: '#f0f0f0b3' }}>
               Admin
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={ admin.data.isAdmin === true ? navConfig : teachherNavConfig } />
  

      <Box sx={{ flexGrow: 1 }} />


    </Scrollbar>
    </ThemeProvider>

  );

  return (
    <ThemeProvider theme={theme}>
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
    </ThemeProvider>
  );
}
