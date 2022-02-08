import * as yup from 'yup'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { BootcampInput } from 'gql/bootcamp'
import { NotificationStore } from 'stores/bootcamp/NotificationStore'

import { drawerWidth } from '../BootcampDrawer'

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

const defaults: BootcampInput = {
  firstName: '',
  lastName: '',
}

export default observer(function BootcampCreateForm() {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation()
  const { setNotificationMessage, showNotification } = NotificationStore

  const createBootcamper = async (bootcamperData: BootcampInput) => {
    await axios.post(endpoints.bootcamp.createBootcamper.url, bootcamperData)
  }

  const mutation = useMutation({
    mutationFn: createBootcamper,
    onError: () => {
      showNotification()
      setNotificationMessage('Something went wrong, please try again later.')
    },
    onSuccess: () => {
      router.push(routes.bootcamp.create)
      showNotification()
      setNotificationMessage('Sucessfully created new Bootcamper.')
    },
  })

  const onSubmit = async (values: any, { setFieldError, resetForm }: FormikHelpers<any>) => {
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
      <GenericForm onSubmit={onSubmit} initialValues={defaults}>
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
})
