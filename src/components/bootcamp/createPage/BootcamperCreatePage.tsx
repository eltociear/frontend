import { Grid } from '@mui/material'

import BootcampLayout from '../BootcampLayout'
import BootcampCreateForm from './BootcampCreateForm'

export default function BootcamperCreatePage() {
  return (
    <BootcampLayout>
      <Grid container>
        <BootcampCreateForm />
      </Grid>
    </BootcampLayout>
  )
}
