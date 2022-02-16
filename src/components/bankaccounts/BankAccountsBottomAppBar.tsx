import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  Share as ShareIcon,
  EventNote as EventNoteIcon,
} from '@mui/icons-material'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/dashboard/ModalStore'

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}
const iconStyles = {
  background: 'white',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.5,
  boxShadow: 3,
  mr: 1,
}
export default observer(function BottomAppBar() {
  const { openCfrm, carSelected } = ModalStore
  const { t } = useTranslation()
  const router = useRouter()
  const deleteHandler = () => {
    carSelected ? openCfrm() : AlertStore.show(t('common:alerts.noselected'), 'info')
  }
  return (
    <Toolbar
      sx={{
        background: 'white',
        borderTop: '1px solid lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        height: '72px',
      }}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>Всички банкови сметки</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Преглед">
            <EventNoteIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Изтрий избраните">
            <DeleteIcon onClick={deleteHandler} sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Запази">
            <SaveIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Принт">
            <PrintIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Сподели">
            <ShareIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Добави">
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => {
                router.push(routes.admin.bankaccounts.add)
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
})
