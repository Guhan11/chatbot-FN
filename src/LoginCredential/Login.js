import {
  Button,
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Link,
  Typography,
} from '@mui/material'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { encryptPassword } from '../Util/encryptPassword'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const login = async (e) => {
    setErrors({})
    // Encrypt the password before sending to the backend
    const encryptedPassword = encryptPassword(formData.password)

    const dataToSend = {
      email: formData.email,
      password: encryptedPassword,
    }

    try {
      const response = await axios.post(
        'http://localhost:9000/api/auth/login',
        dataToSend
      )

      if (response.data === true) {
        // Redirect to chatbot page
        navigate('/chatApp')
        toast.success('Login successful!')
      } else {
        toast.error('Invalid Credentials')
      }
    } catch (error) {
      toast.error('Login failed! Please try again.')
      setErrors(error.response ? error.response.data.errors : {})
    }
  }
  const handleGoogleSuccess = async (res) => {
    const token = res.credential
    try {
      const response = await axios.post(
        'http://localhost:9000/api/auth/googlelogin',
        { token }
      )
      toast.success('Google Login Success!')
      console.log('Google Login Success:', response.data)
      localStorage.setItem('Token: ', token)
    } catch (error) {
      toast.error('Google Login Failed')
      //   console.error('Google Login Error:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        color="primary"
        variant="outlined"
        sx={{ maxWidth: 400, padding: 3 }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>

          <form>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
              onClick={login}
            >
              Login
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '16px', marginBottom: '16px' }}
          >
            OR
          </Typography>
          <GoogleOAuthProvider clientId="407970374604-3g6c02mk9rsnjhrchsl1pna3t8g20h8h.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              //   onError={handleGoogleError}
            />
          </GoogleOAuthProvider>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '16px' }}
          >
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to="/signup"
              style={{ textDecoration: 'none', color: '#4285F4' }}
            >
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default Login
