import ProductForm from "../../components/forms/ProductForm"
import { Helmet } from 'react-helmet'
const ProductCreatePage = () => {

    return (
        <>
            <Helmet>
                <title>Nouveau produit | Coreego</title>
            </Helmet>
            <ProductForm />
        </>
    )
}

export default ProductCreatePage