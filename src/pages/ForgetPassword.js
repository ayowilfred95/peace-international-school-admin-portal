import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography,createTheme, ThemeProvider,IconButton, InputAdornment, TextField, Button} from '@mui/material';
// hooks
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import banner from '../img/RegisterCover.jpeg'

// ----------------------------------------------------------------------


const theme = createTheme({
  palette:{
    primary:{
      main:'#0098db'
    }
  }
})
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop:'100px',
  maxWidth: 580,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgetPassword() {
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(true)
  const mdUp = useResponsive('up', 'md');

const handleCheck = ()=>{
    if(rePassword === password){
        setError(false)
      }
}

  return (
    <>
      <Helmet>
        <title> Login | Promise Int'l Dashboard  </title>
      </Helmet>
<ThemeProvider theme={theme}>
      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src={banner} alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h5" gutterBottom>
            Forget Password
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Remember Password? {''}
              <Link to="/login">Login</Link>
            </Typography>
<Box>
<TextField
    fullWidth
          name="password"
          label=" New Password"
          value={password}
          margin="normal"
          onChange={(e)=>
            setPassword(e.target.value)
         }
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    <TextField
    fullWidth
          name="password"
          label="Re-Enter New Password"
          value={rePassword}
          margin="normal"
          onChange={(e)=>{
      
            setRePassword(e.target.value)
          }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    {error && 
      <LoadingButton fullWidth size="large" type="submit" onClick={handleCheck} variant="contained">
        Reset Password
      </LoadingButton>}
{!error && 
      <LoadingButton   
       fullWidth size="large" type="submit" variant="contained" >
       Reset Password
      </LoadingButton>}
</Box>
          </StyledContent>
        </Container>
      </StyledRoot>
      </ThemeProvider>
    </>
  );
}
