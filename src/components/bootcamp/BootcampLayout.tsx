import { Snackbar, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import BootcampFooter from './BootcampFooter'
import BootcampBar from './BootcampBar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      marginTop: theme.spacing(3),
    },
    page: {
      width: '100%',
      padding: theme.spacing(3),
    },
  }),
)

export default function MyLayout(props: any) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BootcampBar />
      <div className={classes.page}>{props.children}</div>
      <BootcampFooter />
      <Snackbar />
    </div>
  )
}
