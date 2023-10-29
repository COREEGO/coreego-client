import { Button } from "@chakra-ui/react"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { NavLink } from "react-router-dom"


interface AddNewTopicInterface{
    label: string,
    url: string
}

const AddNewTopikButton : React.FC<AddNewTopicInterface> = ({label,url}) => {

    return (
        <NavLink to={url}>
            <Button colorScheme="twitter" color="white" rightIcon={<BsFillPlusCircleFill />}>{label}</Button>
        </NavLink>
    )
}

export default AddNewTopikButton