import { Grid } from '@mui/material'

import BootcampLayout from '../BootcampLayout'
import BootcampCreateForm from '../createPage/BootcampCreateForm'

export default function BootcamperEditPage(props: any) {
  const editComponemt = BootcampCreateForm(props.values)

  return <BootcampLayout>{editComponemt}</BootcampLayout>
}
