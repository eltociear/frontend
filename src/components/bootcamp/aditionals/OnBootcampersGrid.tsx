import { Button, Grid, Toolbar, Typography } from '@mui/material'
import { routes } from 'common/routes'
import { useRouter } from 'next/router'

export default function OnBootcampersGrid({ selected }: any) {
  const router = useRouter()
  const deleteHandler = () => {
    if (selected.length == 0) {
      console.log(selected)
    }
  }

  return (
    <Toolbar disableGutters>
      <Typography variant="h4" component="h1">
        Bootcampers
      </Typography>
      <Grid container justifyContent="flex-end">
        <Button size="small" variant="outlined" onClick={() => router.push(routes.bootcamp.create)}>
          Add New
        </Button>
        <Button size="small" variant="outlined" onClick={deleteHandler}>
          Delete Selected
        </Button>
      </Grid>
    </Toolbar>
  )
}
