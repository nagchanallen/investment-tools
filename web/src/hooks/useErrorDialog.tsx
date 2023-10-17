import { useContext } from 'react'

import {
  IErrorDialogContext,
  ErrorDialogContext,
} from '../providers/ErrorDialogProvider'

const useErrorDialog = (): IErrorDialogContext => {
  const context = useContext(ErrorDialogContext)

  if (!context) {
    throw new Error('useErrorDialog must be used within a ErrorDialogProvider')
  }

  return context
}

export default useErrorDialog
