import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material'

export default function BootInfoModal(props: any) {
  console.log(props)
  const { open, setOpen, details } = props.info
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Bootcamper Details</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Box fontSize={18}>First Name: {details.firstName}</Box>
          <Box fontSize={18}>Last Name: {details.lastName}</Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
