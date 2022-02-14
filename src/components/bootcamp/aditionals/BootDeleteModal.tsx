import { Dialog, DialogTitle, DialogActions, Button, Grid } from '@mui/material'
import { deleteBootcamper } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'

export default function BootDeleteModal(props: any) {
  const { openDelete, setOpenDelete, details } = props.info

  const onDeleteClick = (id: any) => async () => {
    console.log(id)
    try {
      setOpenDelete(false)
      await deleteBootcamper(id)
      AlertStore.show(`Deleted: ${id}`, 'success')
      window.location.reload()
    } catch (err) {
      AlertStore.show(`Unsuccessfull Deleted!`, 'error')
    }
  }

  return (
    <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
      <DialogTitle>Are you sure to delete:</DialogTitle>
      <Grid fontSize={18} m={2}>
        {' '}
        First Name: {details.firstName}
      </Grid>
      <Grid fontSize={18} m={2}>
        {' '}
        Last Name: {details.lastName}
      </Grid>
      <DialogActions>
        <Button onClick={onDeleteClick(details.id)} autoFocus>
          Yes
        </Button>
        <Button onClick={() => setOpenDelete(false)}>No</Button>
      </DialogActions>
    </Dialog>
  )
}
