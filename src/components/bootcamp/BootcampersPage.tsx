import React from 'react'
import { Container } from '@mui/material'

import BootcampersGrid from './BootcampersGrid'
import OnBootcampersGrid from './OnBootcampersGrid'
import BootcampLayout from './BootcampLayout'

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
