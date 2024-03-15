import { useParams } from "react-router"
import React from "react"
import LoadingPage from "../../components/LoadingPage"
import ProductForm from "../../components/forms/ProductForm"
import axios from "axios"
import useMalware from "../../hooks/useMalware"

const ProductEditPage = () => {

    const params = useParams()
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [product, setProduct] = React.useState();

    const {canEdit} = useMalware()

    React.useEffect(()=>{
        loadProduct()
    }, [])

    const loadProduct = async () => {
        try {
            const response = await axios.get(`/products/${params.slug}`)
            canEdit(response.data.user.id)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoaded(true)
        }
    }

    return isLoaded ? (
    <ProductForm isEditMode={true} product={product} mutate={loadProduct} />
    ) : <LoadingPage type="page" />
}

export default ProductEditPage