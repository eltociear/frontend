import BootcampLayout from './aditionals/BootcampLayout'
import BootcampCreateEditForm from './aditionals/BootcampCreateEditForm'

export default function BootcamperEditPage(props: any) {
  const editComponemt = BootcampCreateEditForm(props.values)

  return <BootcampLayout>{editComponemt}</BootcampLayout>
}
