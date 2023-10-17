import { Button, Modal } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import {
  ReactElement,
  createContext,
  useCallback,
  useState,
  useMemo,
} from 'react'

export interface IErrorDialogContext {
  showError: (message: string) => void
  dismiss: () => void
  isShowingError: boolean
}

export const ErrorDialogContext = createContext<IErrorDialogContext>(undefined!)

const ErrorDialogProvider = (props: React.PropsWithChildren): ReactElement => {
  const { children } = props

  const [isShowingError, setIsShowingError] = useState(false)
  const [message, setMessage] = useState('')

  const showError = useCallback((message: string) => {
    setMessage(message)
    setIsShowingError(true)
  }, [])

  const dismiss = useCallback(() => {
    setIsShowingError(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      showError,
      dismiss,
      isShowingError,
    }),
    [dismiss, isShowingError, showError]
  )

  return (
    <ErrorDialogContext.Provider value={contextValue}>
      {children}
      <Modal
        show={isShowingError}
        size="md"
        popup={true}
        dismissible={true}
        onClose={dismiss}
      >
        <ModalHeader className="text-center font-bold">Error</ModalHeader>
        <Modal.Body>
          <div className="flex flex-col justify-between text-center">
            <p className="pb-6">{message}</p>
            <div className="flex flex-col items-center">
              <Button onClick={dismiss} color="blue">
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </ErrorDialogContext.Provider>
  )
}

export default ErrorDialogProvider
