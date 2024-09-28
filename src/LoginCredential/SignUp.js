import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import { Link as RouterLink } from 'react-router-dom'
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
// import { encryptPassword } from '../Util/encryptPassword'

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

  const signup = async () => {
    if (validate()) {
      // Ensure the form data is valid
      console.log('Form data:', formData)

      // Prepare the data to send
      const dataToSend = {
        userName: formData.userName,
        email: formData.email,
        password: CryptoJS.AES.encrypt(
          formData.password,
          '6LfSsH4oAAAAAK1fGMgUqd1moEOgYs680vyZAIAc'
        ).toString(), // Encrypt only the password
      }

      console.log('Encrypted Password:', dataToSend.password)

      try {
        // Make the API call to signup
        const response = await axios.post(
          'http://localhost:9000/api/auth/signup',
          dataToSend
        )

        // Notify the user of a successful signup
        toast.success('Signed up successfully!')
        console.log('Signup response data:', response.data)
      } catch (error) {
        console.error('Signup failed', error)
        toast.error('Signup failed! Please try again.') // Improved error message
      }
    }
  }

  //   Google Sign-In Success Handler
  const handleGoogleSuccess = async (res) => {
    const token = res.credential
    try {
      const response = await axios.post(
        'http://localhost:9000/api/auth/googlelogin',
        { token }
      )
      toast.success('Google Login Success!')
      console.log('Google Login Success:', response.data)
      localStorage.setItem('Token: ', res.data.token)
    } catch (error) {
      toast.error('Google Login Failed')
      console.error('Google Login Error:', error)
    }
  }

  // Google Sign-In Error Handler
  const handleGoogleError = () => {
    toast.error('Google Login Failed')
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
        orientation="vertical"
        size="lg"
        variant="soft"
        sx={{ maxWidth: 400, padding: 3 }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Create Your Account
          </Typography>
          {/* <form onSubmit={handleSubmit}> */}
          <form>
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
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
              onClick={signup}
            >
              Sign Up
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '16px' }}
          >
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login" // Correct routing to login page
              style={{
                textDecoration: 'none', // Removes underline
                color: '#4285F4', // Optional: Change the link color if needed
              }}
            >
              Login
            </Link>
          </Typography>

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
