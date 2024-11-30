import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Button,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import apiCalls from '../ApiStructure/ApiCall' // Ensure this is correctly defined and imported
import { toast, ToastContainer } from 'react-toastify' // Import toast for success/error notifications
import axios from 'axios'

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [loginEmail, setloginEmail] = useState(localStorage.getItem('email'))
  const [loginName, setloginName] = useState(localStorage.getItem('name'))
  const [editId, setEditId] = useState(localStorage.getItem('editId'))
  const [profileImage, setProfileImage] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [imageStatus, setImageStatus] = useState(null)

  const [profileData, setProfileData] = useState({
    userName: loginName,
    age: '',
    gender: '',
    email: loginEmail,
    phone: '',
  })

  const [editedData, setEditedData] = useState({
    age: '',
    gender: '',
    phone: '',
  })

  const navigate = useNavigate()

  const handleOpen = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleChangeAccount = () => {
    setConfirmDialogOpen(false)
    navigate('/')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('editId')
  }

  const handleOpenConfirmDialog = () => {
    setAnchorEl(null)
    setConfirmDialogOpen(true)
  }

  const handleCloseConfirmDialog = () => setConfirmDialogOpen(false)

  const handleLogout = () => {
    console.log('User logged out')
    setAnchorEl(null)
  }

  // Update input fields in the Edit Profile dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target // Fix the 'userName' to 'name'
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (editId) {
      getUserDetails(editId)
    }
  }, [])

  const getUserDetails = async () => {
    try {
      const response = await apiCalls('get', `/user/getUserById?id=${editId}`)
      const userDetails = response.paramObjectsMap?.userVO[0]
      if (userDetails) {
        const updateData = {
          gender: userDetails.gender || '',
          phone: userDetails.phone || '',
          age: userDetails.age || '',
        }
        setProfileData(updateData)
        setEditedData(updateData)
      }
    } catch (error) {
      console.log('User Info by Id Failed')
      toast.error('User Information not Found!')
    }
  }

  const handleSaveProfile = async () => {
    try {
      const response = await apiCalls(
        'put',
        `/user/editProfile?id=${editId}`,
        editedData
      )
      console.log('Profile updated successfully:', response.data)
      toast.success('Profile Details Added Successfully')
    } catch (error) {
      toast.error('Failed To Store The Profile Details')
      console.error('Error updating profile:', error)
    }

    setProfileData(editedData) // Save the updated data
    setOpenDialog(false) // Close the dialog
    console.log('Profile updated:', editedData) // Debugging/logging updated data
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      try {
        await axios.put(
          `http://localhost:9000/api/user/uploadProfileImage?id=${editId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        toast.success('Profile picture updated successfully!')
        fetchProfileImage()
      } catch (error) {
        toast.error('Failed to upload profile picture')
        console.error('Error uploading image:', error)
      }
    }
  }

  useEffect(() => {
    fetchProfileImage()
  }, [])

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/user/getProfileImage?id=${editId}`,
        { responseType: 'blob' }
      )
      // Convert the binary data (blob) into an image URL
      if (response.status === 200) {
        const imageUrl = URL.createObjectURL(response.data)
        setProfileImage(imageUrl)
        setImageStatus(200)
      } else if (response.status === 204) {
        // If status is 204, no content, so set the default icon
        setProfileImage(null) // No image, default icon should be shown
        setImageStatus(204)
      }
    } catch (error) {
      console.error('Error fetching profile image:', error)
      toast.error('Failed to load profile picture')
      setImageStatus(204)
    }
  }
  // const toastContainerRef = useRef()
  // useEffect(() => {
  //   // Incorrectly trying to access internal methods or state
  //   toastContainerRef.current.toggle()
  // }, [])

  return (
    <div>
      <IconButton
        sx={{ width: 50, height: 50, padding: 0 }}
        onClick={handleOpen}
      >
        {imageStatus === 200 ? (
          // Show the profile image if it exists
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%', // Circular shape
              overflow: 'hidden', // Make sure the image covers the space
              transition: 'all 0.3s ease', // Smooth transition for hover effect
              border: '4px solid #9e9e9e ', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
              '&:hover': {
                border: '2px solid #1976d2', // Add blue border on hover
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Stronger shadow on hover
              },
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.border = '4px solid #1976d2'; // Blue border on hover
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'; // Reset zoom
              e.currentTarget.style.border = '4px solid #9e9e9e'; // Reset border
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Reset shadow
            }}
          />
        ) : (
          // Show the default icon if there's no profile image
          <AccountCircleIcon
            fontSize="large"
            sx={{
              color: '#0d47a1', // Dark blue color for the icon
              transition: 'color 0.3s ease', // Smooth color change
              '&:hover': {
                color: '#1976d2', // Lighter blue on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              },
            }}
          />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: '8px', boxShadow: 3, width: '250px' },
        }}
      >
        <MenuItem
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Avatar with dynamic image */}
            <Avatar
              src={profileImage}
              alt="Profile Picture"
              sx={{ cursor: 'pointer' }}
            />

            {/* Edit Icon appears only when the avatar is hovered */}
            {isHovered && (
              <Tooltip
                color="black"
                title="Edit Profile Picture"
                sx={{ size: 'small' }}
              >
                <IconButton
                  color="black"
                  // color="primary"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: 'translate(25%, 25%)',
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  onClick={() => document.getElementById('file-input').click()} // Trigger file input click
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Hidden file input for image upload */}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <ToastContainer />
          </div>
          <div className="ml-2 flex justify-between items-center w-full">
            <div>
              <Typography variant="body1" style={{ fontWeight: '600' }}>
                {loginName}
              </Typography>
            </div>
            <IconButton color="black" onClick={handleOpenDialog} size="small">
              <EditIcon />
            </IconButton>
          </div>
        </MenuItem>

        <Divider />

        <MenuItem style={{ padding: '10px 20px', fontWeight: '500' }}>
          <Typography variant="body2" color="textSecondary">
            {loginEmail}
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem
          style={{ padding: '10px 20px' }}
          onClick={handleOpenConfirmDialog}
        >
          <SwapHorizIcon style={{ marginRight: '10px' }} />
          <Typography variant="body2">Change Account</Typography>
        </MenuItem>

        <MenuItem
          style={{ padding: '10px 20px', fontWeight: '500' }}
          onClick={handleLogout}
        >
          <IconButton color="black">
            <LogoutIcon />
          </IconButton>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>

      {/* Edit Profile Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="userName" // Use 'name' instead of 'userName'
            value={loginName}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Email"
            name="email" // Use 'name' instead of 'userName'
            value={loginEmail}
            onChange={handleInputChange}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone" // Use 'name' instead of 'userName'
            value={editedData.phone}
            onChange={handleInputChange}
            fullWidth
            type="number"
          />
          <TextField
            margin="dense"
            label="Age"
            name="age" // Use 'name' instead of 'userName'
            value={editedData.age}
            onChange={handleInputChange}
            fullWidth
            type="number"
            inputProps={{ min: 1, max: 120 }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={editedData.gender}
              onChange={handleInputChange}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Rather not to say">Rather not to say</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Account Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Change Account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to change the account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangeAccount} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default ProfileMenu
