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
  const { openInfo, setOpenInfo, details } = props.info
  return (
    <Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
      <DialogTitle>Bootcamper Details</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Box fontSize={18}>First Name: {details.firstName}</Box>
          <Box fontSize={18}>Last Name: {details.lastName}</Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpenInfo(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
