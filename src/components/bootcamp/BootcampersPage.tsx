import React from 'react'
import { Container } from '@mui/material'

import BootcampersGrid from './aditionals/BootcampersGrid'
import OnBootcampersGrid from './aditionals/OnBootcampersGrid'
import BootcampLayout from './aditionals/BootcampLayout'

export default function BootcampersPage() {
  return (
    <BootcampLayout>
      <Container sx={{ width: 780, p: 8 }}>
        <OnBootcampersGrid />
        <BootcampersGrid />
      </Container>
    </BootcampLayout>
  )
}
