import { useParams } from "react-router"
import { Suspense } from "react"
import LoadingPage from "../../components/LoadingPage"
import useSWR from "swr"
import ProductForm from "../../components/forms/ProductForm"

const Product = () => {

    const params = useParams()

    const { data, error, mutate } = useSWR(`/product/${params.id}`, {suspense: true})

    if (error) console.log(error)

    return <ProductForm isEditMode={true} data={data} mutate={mutate} />
}

const ProductEditPage = () => {
    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Product />
        </Suspense>
    )
}

export default ProductEditPage