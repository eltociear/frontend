import * as yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { FormikHelpers } from 'formik'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'
import { Grid, Typography } from '@mui/material'

import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { BootcampInput, BootcampType } from 'gql/bootcamp'

import { drawerWidth } from '../BootcampDrawer'
import { createBootcamper } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'

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

const validationSchema: yup.SchemaOf<BootcampInput> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().trim().min(2).max(30).required(),
    lastName: yup.string().trim().min(2).max(30).required(),
  })

const defaults: BootcampInput = {
  firstName: '',
  lastName: '',
}

export default function BootcampCreateForm() {
  const classes = useStyles()
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<BootcampType>, AxiosError<ApiErrors>, BootcampInput>({
    mutationFn: createBootcamper,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BootcampInput,
    { setFieldError, resetForm }: FormikHelpers<BootcampInput>,
  ) => {
    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
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
      <Typography variant="h3" className={classes.internFormHeader}>
        Create new Bootcamper
      </Typography>
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
