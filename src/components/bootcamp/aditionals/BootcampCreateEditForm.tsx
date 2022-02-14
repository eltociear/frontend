import * as yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'
import { Button, Grid, Typography } from '@mui/material'

import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { createBootcamper, editBootcamper } from 'common/rest'
import { routes } from 'common/routes'
import { BootcampType } from 'gql/bootcamp'
import { AlertStore } from 'stores/AlertStore'

import { useViewBootcamper } from 'common/hooks/bootcampers'

const useStyles = makeStyles(() => {
  return {
    internForm: {
      marginTop: '100px',
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

type Props = { id: string }
type Nrops = { id: undefined }
export default function BootcampCreateEditForm({ id }: Props | Nrops) {
  let defaults: BootcampType = {
    firstName: '',
    lastName: '',
    id: '',
  }
  if (id) {
    const { data } = useViewBootcamper(id)
    defaults = data ? Object.assign(defaults, data) : defaults
  }

  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<BootcampType>, AxiosError<ApiErrors>, BootcampType>({
    mutationFn: defaults.id ? editBootcamper : createBootcamper,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show('Succes', 'success'),
  })

  const onSubmit = async (
    values: BootcampType,
    { setFieldError, resetForm }: FormikHelpers<BootcampType>,
  ) => {
    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        id: defaults.id,
      })
      if (defaults.id) {
        router.push(routes.bootcamp.index)
      } else {
        resetForm()
      }
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
          {defaults.id ? t('bootcamp:title.edit') : t('bootcamp:title.create')}
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
