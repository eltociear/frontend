import { useState, MouseEvent } from 'react'
import { observer } from 'mobx-react'

import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { drawerWidth } from './BootcampDrawer'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import { DrawerStore } from 'stores/bootcamp/DrawerStore'

const settings = ['Profile', 'Logout']

const useStyles = makeStyles(() => {
  return {
    appbar: {
      width: '100%',
    },
    shrinkedAppbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }
})

export default observer(function BootcampBar() {
  const classes = useStyles()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { isDrawerOpen, closeDrawer, openDrawer } = DrawerStore

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const changeHandler = () => {
    isDrawerOpen ? closeDrawer() : openDrawer()
  }

  return (
    <AppBar
      elevation={2}
      className={isDrawerOpen ? `${classes.shrinkedAppbar}` : `${classes.appbar}`}>
      <Toolbar disableGutters>
        {/* <BootcampDrawer /> */}
        <IconButton onClick={changeHandler} sx={{ mr: 2 }}>
          <MenuIcon color="secondary" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <PodkrepiIcon color="secondary" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" color="secondary">
            Admin Panel
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Kalin" src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
})
