import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Stack, Alert, IconButton, InputAdornment, TextField, Checkbox, InputLabel, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null)
    setIsPending(true);
    try {
      const item = { email, password };
      const result = await fetch('https://ulego.ng/api/v1/admin/login', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json ',
          //  "Accept":"application/json",
        },
        body: JSON.stringify(item),
      });

      const res = await result.json();
      // console.log(res)
      localStorage.setItem('user-info', JSON.stringify(res));

      const stat = res.status;
      // console.log(stat)

      if (stat === 'success') {
        setIsPending(false);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError('Incorrect Login Details');
        navigate('/login');
        setIsPending(false);
      }
    } catch (err) {
      setError(err);
      setIsPending(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        {error && <Alert severity="error">{ error}</Alert>}
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Box display="flex" alignItems="center">
          <Checkbox name="remember" label="Remember me" />
          <InputLabel>Remember Me</InputLabel>
        </Box>

        <Link to="/forgetpassword" style={{ textDecoration: 'none', color: '#000' }}>
          Forgot password?
        </Link>
      </Stack>

      {!isPending && (
        <LoadingButton disabled={!email || !password } fullWidth size="large" type="submit" onClick={handleLogin} variant="contained">
          Login
        </LoadingButton>
      )}
      {isPending && (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled
        >
          Loging in
        </LoadingButton>
      )}
    </>
  );
}
