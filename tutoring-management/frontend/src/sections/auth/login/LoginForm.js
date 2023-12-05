import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Alert, Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import UserContext from '../../../UserContext';
// services
import { login } from '../../../services/loginService'
import { setPairingToken } from '../../../services/pairingService';
import { setSessionToken } from '../../../services/sessionService';
import { setTutorToken } from '../../../services/tutorService';
import { setTuteeToken } from '../../../services/tuteeService';
import { setUserToken } from '../../../services/userService';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext)

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [notif, setNotif] = useState(null);

  const handleClick = async () => {
    // post it to /api/login, then render accordingly.
    try {
        const user = await login({ username, password })
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        ) 
        setPairingToken(user.token)
        setSessionToken(user.token)
        setTutorToken(user.token)
        setTuteeToken(user.token)
        setUserToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        navigate('/dashboard', { replace: true });
    } catch (exception) {
        setNotif('Incorrect credentials')
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Username" value={username} onChange={({ target }) => setUsername(target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password} 
          onChange={({ target }) => setPassword(target.value)}
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

      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        Remember me
      </Stack>

      { notif ? <Alert variant='outlined' severity='error' sx={{ mb: 2 }}>{notif}</Alert> : null}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}