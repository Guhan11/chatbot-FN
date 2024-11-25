import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  return (
    <>
      <div>
        <IconButton onClick={handleOpen} color="primary">
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Avatar />
            <div className="ml-2">
              <Typography variant="body1">John Doe</Typography>
              <Typography variant="body2" color="textSecondary">
                johndoe@gmail.com
              </Typography>
            </div>
          </MenuItem>
          <MenuItem onClick={handleClose}>Phone: 123-456-7890</MenuItem>
          <MenuItem onClick={handleClose}>City: New York</MenuItem>
          <MenuItem>
            Logout
            <IconButton color="primary" aria-label="logout">
              <LogoutIcon />
            </IconButton>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

export default ProfileMenu
