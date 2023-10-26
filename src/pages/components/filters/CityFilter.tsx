import { Box, Button, FormControl, FormLabel, IconButton, Input, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from "@chakra-ui/react"
import { useFilterContext } from "../../../contexts/FilterProvider"
import { useSelector } from "react-redux"
import { useCallback, useEffect, useRef, useState } from "react"
import CityDistrictSelectInput from "../../../components/inputs/CityDistrictSelectInput"
import { TbMapSearch } from "react-icons/tb"

interface CityFilterInterface {
    type?: 'list' | 'input'
}

const CityFilter: React.FC<CityFilterInterface> = ({ type = "input" }) => {

    const { updateFilter, params } = useFilterContext()

    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <IconButton isRound={true} colorScheme="whiteAlpha" border={"1px solid black"}  onClick={onOpen} icon={<TbMapSearch color="black" />} aria-label={"open modal"} />
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader sx={{ display: 'flex', alignItems: 'center' }} >
                    Localisation
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CityDistrictSelectInput
                        updateCity={(e:any)=>updateFilter('city', e)}
                        cityValue={params.city}
                        updateDistrict={(e:any) => updateFilter('district', e)}
                        districtValue={params.district}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button type="button" onClick={onClose} w="100%" colorScheme='blue'>
                        Recherchez
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>

}

export default CityFilter