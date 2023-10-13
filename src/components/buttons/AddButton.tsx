import { AddIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"


const AddButton = () => {


    return (
        <Button size={{base: 'sm', md: 'md' }} className="btn_blue" leftIcon={<AddIcon />}>Ajouter</Button>
    )
}

export default AddButton