import * as yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { FormikHelpers } from 'formik'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'
import { Button, Grid, Typography } from '@mui/material'

import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { BootcampEdit, BootcampInput, BootcampType } from 'gql/bootcamp'

import { drawerWidth } from '../BootcampDrawer'
import { createBootcamper, editBootcamper } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

const useStyles = makeStyles(() => {
  return {
    internForm: {
      marginLeft: drawerWidth,
      marginTop: '200px',
    },
    internFormHeader: {
      marginBottom: '50px',
    },
  }
})

const validationSchema: yup.SchemaOf<BootcampType> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().trim().min(2).max(30).required(),
    lastName: yup.string().trim().min(2).max(30).required(),
    id: yup.string(),
  })

const defaults: BootcampType = {
  firstName: '',
  lastName: '',
  id: '',
}

export default function BootcampCreateForm(valus: any) {
  defaults.firstName = valus ? valus.firstName : ''
  defaults.lastName = valus ? valus.lastName : ''
  defaults.id = valus ? valus.id : ''

  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<BootcampType>, AxiosError<ApiErrors>, BootcampType>({
    mutationFn: defaults.id ? editBootcamper : createBootcamper,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BootcampType,
    { setFieldError, resetForm }: FormikHelpers<BootcampType>,
  ) => {
    try {
      router.push(routes.bootcamp.index)

      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        id: defaults.id,
      })
      resetForm()
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid className={classes.internForm} container direction="column" component="section">
      <Grid container justifyContent={'space-between'} className={classes.internFormHeader}>
        <Typography variant="h4" component="h1">
          {defaults.id ? 'Edit' : 'Add new'} Bootcamper
        </Typography>
        <Button size="medium" variant="outlined" onClick={() => router.push(routes.bootcamp.index)}>
          View All
        </Button>
      </Grid>
      <GenericForm onSubmit={onSubmit} initialValues={defaults} validationSchema={validationSchema}>
        <Grid container spacing={1.3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="firstName"
              label="First name"
              autoComplete="firstName"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" name="lastName" label="Last name" autoComplete="lastName" />
          </Grid>
          <Grid item mt={3} xs={12}>
            <SubmitButton fullWidth />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
