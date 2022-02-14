import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import {
  DataGrid,
  GridCellParams,
  GridCellValue,
  GridColumns,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { useBootcampList } from 'common/hooks/bootcampers'
import { deleteBootcamper } from 'common/rest'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { BootcampInput, BootcampType } from 'gql/bootcamp'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'common/api-errors'
import router from 'next/router'
import { routes } from 'common/routes'
import { string } from 'yup'
import DetailsModal from 'components/modal/DetailsModal'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import BootInfoModal from './BootInfoModal'

function editClickHandler(cellValues: GridRenderCellParams) {
  router.push(routes.bootcamp.edit(String(cellValues.id)))
}

const deleteClickHandler = async (cellValues: GridCellParams) => {
  const mutation = useMutation<AxiosResponse<BootcampType>, AxiosError<ApiErrors>, string>({
    mutationFn: deleteBootcamper,
    onError: () => AlertStore.show('delete error', 'error'),
    onSuccess: () => AlertStore.show('success', 'success'),
  })
  try {
    await mutation.mutateAsync(String(cellValues.id))
    router.push(routes.bootcamp.index)
  } catch (error) {
    AlertStore.show('delete error', 'error')
  }
  // setDeleteOpen(false)
  // router.push(routes.bootcamp.index)

  // const { data } = await deleteBootcamper(String(cellValues.id))

  // if (data) {
  //   AlertStore.show(`Deleted: ${data.id}`, 'success')
  //   router.push(routes.bootcamp.index)
  // } else {
  //   AlertStore.show(`Unsuccessfull Deleted!`, 'error')
  // }
}

export default function BootcampersGrid() {
  const { data } = useBootcampList()

  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState({})

  function detailsClickHandler(cellValues: GridCellParams) {
    setDetails(cellValues.row)
    setOpen(true)
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'firstName',
      headerName: 'First Name',
      editable: true,
      width: 220,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      editable: true,
      width: 260,
    },
    {
      field: 'actions',
      headerName: '',
      renderCell: (cellValues) => {
        return (
          <Grid>
            <Button>
              <InfoIcon onClick={() => detailsClickHandler(cellValues)} />
            </Button>
            <Button>
              <EditIcon onClick={() => editClickHandler(cellValues)} />
            </Button>
            <Button>
              <DeleteIcon onClick={() => deleteClickHandler(cellValues)} />
            </Button>
          </Grid>
        )
      },
      width: 200,
      align: 'right',
    },
  ]

  return (
    <Box>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={4}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
      />
      <BootInfoModal info={{ open, setOpen, details }} />
    </Box>
  )
}
