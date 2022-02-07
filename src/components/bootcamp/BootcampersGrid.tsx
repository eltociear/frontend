import React from 'react'
import { Button, Grid } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { useBootcampList } from 'common/hooks/bootcampers'

function detailsClickHandler(cellValues: GridRenderCellParams) {
  console.log(cellValues.id)
}

function editClickHandler(cellValues: GridRenderCellParams) {
  console.log(cellValues.id)
}

function deleteClickHandler(cellValues: GridRenderCellParams) {
  console.log(cellValues.id)
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

export default function BootcampersGrid() {
  const { data } = useBootcampList()

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      pageSize={4}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
    />
  )
}
