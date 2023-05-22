import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMutation } from 'react-query'
import { useHistory } from "react-router-dom";
import { RoutesPaths } from '../../constants';

export const Login = () => {
  const history = useHistory();

  const [isPasswordVisible, togglePasswordVisibility] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const resetFields = () => {
    setLogin('')
    setPassword('')
  }

  const mutation = useMutation({
    mutationFn: ({ email, password }: any) => {
      return fetch('https://reqres.in/api/login', {
        // credentials: 'include',
        method: 'post',
        headers: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({ email, password }),
      })
    },
    onError: (error, variables, context: any) => {
      setError(String(error))
      resetFields()
    },
    onSuccess: async (request, variables, context) => {
      try {
        if (request.status === 400) {
          const { error } = await request.json()
          setError(error)
          return
        }


        const data = await request.json()
        if (data.token) {
          localStorage.setItem('token', data.token)
          history.push(RoutesPaths.Dashboard)
          return
        }

        throw new Error(JSON.stringify(data))
      } catch(error) {
        setError(String(error))
        resetFields()
      }
    }
  })

  const handleShowPassword = () => {
    togglePasswordVisibility(!isPasswordVisible)
  }

  const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
  }

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutation.mutate({ email: login, password})
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Box
          onSubmit={handleSubmit}
          width="300px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          component="form"
          mt={20}
          sx={{
            '& > :not(style)': { m: 1 }
          }}
          noValidate
        >
          <h1>Login</h1>
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="login">Email</InputLabel>
            <OutlinedInput
              value={login}
              onChange={handleLoginInput}
              required
              type='email'
              id="login"
              label="Login"
            />
          </FormControl>
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              value={password}
              onChange={handlePasswordInput}
              required
              type={isPasswordVisible ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleShowPassword}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              id="password"
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!(password && login)}
            type="submit"
          >
            Log In
          </Button>
          {error && <span style={{color: 'red'}}>{error}</span>}
        </Box>
      </Grid>
    </Grid>
  );
}
