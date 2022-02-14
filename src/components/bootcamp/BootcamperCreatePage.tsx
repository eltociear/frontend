import BootcampLayout from './aditionals/BootcampLayout'
import BootcampCreateEditForm from './aditionals/BootcampCreateEditForm'

export default function BootcamperCreatePage() {
  const id = undefined
  const createComponemt = BootcampCreateEditForm({ id })

  return <BootcampLayout>{createComponemt}</BootcampLayout>
}
