import { Card, CardBody, Divider, Grid, GridItem, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Text, useDisclosure } from "@chakra-ui/react"
import PlaceCard from "../card/PlaceCard"
import { MdOutlineComment, MdOutlineShoppingBag, MdOutlineTravelExplore } from "react-icons/md"
import { NavLink } from "react-router-dom"
import DiscussionCard from "../card/DiscussionCard"
import ProductCard from "../card/ProductCard"


interface PropsInterface {
    cardName: 'discussion' | 'product' | 'place',
    datas: any
}

const ModalProfilPublications: React.FC<PropsInterface> = ({ cardName, datas }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const modalTitle = () => {
        let title = ''
        switch (cardName) {
            case 'discussion':
                title = 'discussions'
                break;
            case 'product':
                title = 'produits'
                break;
            case 'place':
                title = 'lieux'
                break;
            default:
                break;
        }
        return datas.length  + ' ' + title
    }

    return (
        <>
            <Card w="100%" as="button" onClick={onOpen}>
                <CardBody display={"flex"} justifyContent={"center"} w="100%">
                    <Text fontSize="lg" as="span">
                        <HStack>
                            {
                                cardName == 'place' && <>
                                    <MdOutlineTravelExplore />
                                    <Text>Lieux</Text>
                                </>
                            }
                            {
                                cardName == 'discussion' && <>
                                    <MdOutlineComment />
                                    <Text>Discussions</Text>
                                </>
                            }
                            {
                                cardName == 'product' && <>
                                    <MdOutlineShoppingBag />
                                    <Text>Produits</Text>
                                </>
                            }

                        </HStack>
                    </Text>
                </CardBody>
            </Card>
            <Modal size="full" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>
                        {modalTitle()}
                    </ModalHeader>
                    <Divider borderColor={"black"} opacity={1} />
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid gap={5} templateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(1, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        }}>
                            {datas.map((data: any) => {
                                return (
                                    <GridItem key={data.id}>
                                        {cardName === "discussion" &&
                                            <NavLink to={'/forum/discussion/detail/' + data.id}>
                                                <DiscussionCard size="sm" discussion={data} />
                                            </NavLink>
                                        }
                                        {cardName === "product" &&
                                            <NavLink to={'/market-place/product/detail/' + data.id}>
                                                <ProductCard size="sm" product={data} />
                                            </NavLink>
                                        }
                                        {cardName === "place" &&
                                            <NavLink to={'/voyage/place/detail/' + data.id}>
                                                <PlaceCard size="sm" place={data} />
                                            </NavLink>
                                        }
                                    </GridItem>
                                )
                            })}
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}

export default ModalProfilPublications