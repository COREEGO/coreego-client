import DiscussionForm from "../../components/forms/DiscussionForm"
import { Helmet } from "react-helmet";

const DiscussionCreatePage = () => {

    return (
        <>
            <Helmet>
                <title>Nouvelle discussion | Coreego</title>
            </Helmet>
            <DiscussionForm />
        </>
    )
}

export default DiscussionCreatePage