export type BootcampType = {
  id: UUID
  firstName: string
  lastName: string
}

export type BootcampInput = {
  firstName: string
  lastName: string
}

export type BootcampEdit = {
  data: BootcampInput
  id: string
}
