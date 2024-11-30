import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Link,
  Typography,
} from '@mui/material'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { encryptPassword } from '../Util/encryptPassword'
import { useNavigate } from 'react-router-dom'
import api from '../ApiStructure/api'
import apiCalls from '../ApiStructure/ApiCall'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    //To show the message after login
    if (localStorage.getItem('signupSuccess') === 'true') {
      toast.success('Signed Up! Login Your Account!')
      localStorage.removeItem('signupSuccess')
    }
  }, [])

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
      const response = await apiCalls('post', `/auth/login`, dataToSend)
      console.log('Backend response:', response)

      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('name', response.name)
        localStorage.setItem('email', response.email)
        localStorage.setItem('editId', response.id)

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
      const response = await apiCalls('post', `/auth/googlelogin`, { token })
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
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                endAdornment={
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
              {errors.password && (
                <Typography color="error" variant="caption">
                  {errors.password}
                </Typography>
              )}
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
