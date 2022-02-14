import React from 'react'

import BootcampersGrid from './aditionals/BootcampersGrid'
import OnBootcampersGrid from './aditionals/OnBootcampersGrid'
import BootcampLayout from './aditionals/BootcampLayout'

export default function BootcampersPage() {
  return (
    <BootcampLayout>
      <OnBootcampersGrid />
      <BootcampersGrid />
    </BootcampLayout>
  )
}
