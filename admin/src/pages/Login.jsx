import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Button, TextField, Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'


const Login = () => {
    const { login, user, isLoggedIn } = useAuthContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        const data = {
            email,
            password
        }
        login(data)
    }
    if (user) {
        return <Navigate to='/' />
    }
    console.log(user)
    console.log(isLoggedIn)
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <Typography variant='h1' sx={{

            }}>Login</Typography>
            <TextField
                sx={{ width: '300px', marginTop: '20px', color: 'red' }}
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"

            />
            <TextField
                sx={{ width: '300px', marginTop: '20px' }}
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <Button
                sx={{ width: '300px', marginTop: '20px' }}
                variant="contained"
                onClick={handleLogin}
            >
                Login
            </Button>
        </Box>

    )
}

export default Login