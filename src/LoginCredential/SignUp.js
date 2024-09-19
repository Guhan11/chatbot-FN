import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Input,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Link,
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'

export const SignUp = () => {
  const allowedChars = /^[a-zA-Z0-9 ]*$/

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleUserNameChange = (e) => {
    const { name, value } = e.target

    // Filter out disallowed characters
    const filteredValue = value
      .split('')
      .filter((char) => allowedChars.test(char))
      .join('')

    setFormData({
      ...formData,
      [name]: filteredValue,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.userName) newErrors.userName = 'UserName is Required'
    if (!formData.email) newErrors.email = 'Email is Required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is Invalid'
    if (!formData.password) newErrors.password = 'Password is Required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Password do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefalult()
    if (validate()) {
      try {
        toast.error('User Created, Welcome to chat GPT!')
        console.log('Form submitted:', formData)
      } catch (error) {
        toast.error('User Creation Failed')
        console.error('Submission error:', error)
      }
    }
  }

//   Google Sign-In Success Handler
    const handleGoogleSuccess = async (res) => {
      const token = res.credential
      try {
        const response = await axios.post(
          'http://localhost:9000/api/user/googlelogin',
          { token }
        )
        toast.success('Google Login Success!')
        console.log('Google Login Success:', response.data)
      } catch (error) {
        toast.error('Google Login Failed')
        console.error('Google Login Error:', error)
      }
    }

    // Google Sign-In Error Handler
    const handleGoogleError = () => {
      toast.error('Google Login Failed')
    }

//   const responseGoogle = (response) => {
//     console.log('Login Success:', response)
//     alert(`Signed up successfully as: ${response.profileObj.name}`)

//     // Here you can save user info or token
//     localStorage.setItem('token', response.tokenId)
//   }

//   const onFailure = (error) => {
//     console.error('Login failed: ', error)
//     toast.error('Login failed. Please try again.')
//   }

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
        invertedColors
        orientation="vertical"
        size="lg"
        variant="soft"
        sx={{ maxWidth: 400, padding: 3 }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Create Your Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="userName">UserName</InputLabel>
              <Input
                id="userName"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleUserNameChange}
                error={!!errors.userName}
              />
              {errors.userName && (
                <Typography color="error" variant="caption">
                  {errors.userName}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography color="error" variant="caption">
                  {errors.email}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
              />
              {errors.password && (
                <Typography color="error" variant="caption">
                  {errors.password}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <Typography color="error" variant="caption">
                  {errors.confirmPassword}
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Sign Up
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '16px' }}
          >
            Already have an account? <Link href="/login">Login</Link>
          </Typography>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '16px' }}
          >
            OR
          </Typography>

          <GoogleOAuthProvider clientId="407970374604-3g6c02mk9rsnjhrchsl1pna3t8g20h8h.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </GoogleOAuthProvider>

          {/* <GoogleOAuthProvider>
            <GoogleLogin
              clientId="407970374604-3g6c02mk9rsnjhrchsl1pna3t8g20h8h.apps.googleusercontent.com" // Replace with your Client ID
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            />
          </GoogleOAuthProvider> */}
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

export default SignUp