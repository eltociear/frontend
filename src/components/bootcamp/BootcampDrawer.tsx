import { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { SwipeableDrawer, Typography } from '@mui/material'
import { GridMenuIcon } from '@mui/x-data-grid'
import AddBoxIcon from '@mui/icons-material/AddBox'
import PeopleIcon from '@mui/icons-material/People'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import { DrawerStore } from 'stores/bootcamp/DrawerStore'

export const drawerWidth = 180

const useStyles = makeStyles(() => {
  return {
    drawer: {
      width: drawerWidth,
      position: 'absolute',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    logo: {
      width: `calc(100% - 50px)`,
      paddingBottom: '30px',
      marginTop: '10px',
    },
    active: {
      backgroundColor: '#bebaba',
    },
    item: {
      margin: '15px 0',
    },
    bottomPush: {
      width: drawerWidth,
      position: 'fixed',
      bottom: 0,
      textAlign: 'center',
      paddingBottom: 10,
      backgroundColor: '#bebaba',
    },
  }
})

const menuItems = [
  { text: 'Bootcampers', icon: <PeopleIcon />, path: '/bootcamp' },
  { text: 'Add New Bootcamper', icon: <AddBoxIcon />, path: '/bootcamp/create' },
  { text: 'Campain', icon: <LibraryBooksIcon />, path: '/campain' },
  { text: 'Cities', icon: <AccountBalanceIcon />, path: '/cities' },
]

export default function BootcampDrawer() {
  const { isDrawerOpen } = DrawerStore
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const classes = useStyles()

  return (
    <SwipeableDrawer
      title="Menu"
      elevation={2}
      ModalProps={{
        hideBackdrop: true,
      }}
      onOpen={() => null}
      onClose={() => null}
      open={isDrawerOpen}
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            onClick={() => router.push(item.path)}
            button
            key={item.text}
            className={
              router.pathname == item.path ? `${classes.active} ${classes.item}` : classes.item
            }>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setOpen((prev) => !prev)
          }}>
          <ListItemIcon>{<GridMenuIcon />}</ListItemIcon>
          <ListItemText primary={`Submenus`} />
        </ListItem>
        {open && (
          <List>
            <ListItem>
              <ListItemIcon>{<AddBoxIcon />}</ListItemIcon>
              <ListItemText primary="Option 1" />
            </ListItem>
            <ListItem>
              <ListItemIcon>{<AddBoxIcon />}</ListItemIcon>
              <ListItemText primary="Option 2" />
            </ListItem>
          </List>
        )}
      </List>
      <List className={classes.bottomPush}>
        <Typography>Menu Footer</Typography>
      </List>
    </SwipeableDrawer>
  )
}
