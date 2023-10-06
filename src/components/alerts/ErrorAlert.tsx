import { Alert, AlertIcon } from "@chakra-ui/react"

interface ErrorAlertInterface{
    message: string
}

const ErrorAlert : React.FC<ErrorAlertInterface> = ({message}) => {
    return message ? (
        <Alert status='error'>
            <AlertIcon />
            {message}
        </Alert>
    ) : <></>
}

export default ErrorAlert