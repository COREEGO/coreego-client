import { Alert, AlertIcon } from "@chakra-ui/react"

interface SuccessAlertInterface{
    message: string
}

const SuccessAlert : React.FC<SuccessAlertInterface> = ({message}) => {
    return message ? (
        <Alert status='success'>
            <AlertIcon />
            {message}
        </Alert>
    ) : <></>
}

export default SuccessAlert