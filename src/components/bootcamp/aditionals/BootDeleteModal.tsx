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

export default function BootcampModal(props: any) {
  const { firstName, lastName, open, setOpen } = props.modalProps
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="draggable-dialog-title">
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Bootcamper Details
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Box fontSize={18}>First Name:{firstName}</Box>
          <Box fontSize={18}>Last Name: {lastName}</Box>
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
