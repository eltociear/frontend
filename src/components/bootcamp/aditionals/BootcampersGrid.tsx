import React, { useState } from 'react'
import router from 'next/router'
import { DataGrid, GridCellParams, GridColumns } from '@mui/x-data-grid'
import { Box, Button, Grid } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { useBootcampList } from 'common/hooks/bootcampers'
import { routes } from 'common/routes'

import BootInfoModal from './BootInfoModal'
import BootDeleteModal from './BootDeleteModal'

export default function BootcampersGrid() {
  const { data } = useBootcampList()

  const [openInfo, setOpenInfo] = useState(false)
  const [details, setDetails] = useState({})
  const [openDelete, setOpenDelete] = useState(false)

  function editClickHandler(cellValues: GridCellParams) {
    router.push(routes.bootcamp.edit(String(cellValues.id)))
  }

  function detailsClickHandler(cellValues: GridCellParams) {
    setDetails(cellValues.row)
    setOpenInfo(true)
  }

  function deleteClickHandler(cellValues: GridCellParams) {
    setOpenDelete(true)
    setDetails(cellValues.row)
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
      <BootInfoModal info={{ openInfo, setOpenInfo, details }} />
      <BootDeleteModal info={{ openDelete, setOpenDelete, details }} />
    </Box>
  )
}
