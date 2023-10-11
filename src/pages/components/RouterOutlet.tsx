import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import DiscussionFeedPage from "../discussion/DiscussionFeedPage";
import LoginPage from "../authentification/LoginPage";
import ShoppingFeedPage from "../shopping/ShoppingFeedPage";
import PrivateRoute from "../../components/navigation/PrivateRoute";
import TravelFeed from "../travel/TravelFeed";
import DiscussionDetail from "../discussion/DiscussionDetail";
import RegisterPage from "../authentification/RegisterPage";
import ValidationAccountPage from "../authentification/ValidationAccountPage";
import PasswordReset from "../authentification/PasswordReset";
import ProductDetail from "../shopping/ProductDetailPage";
import PlaceDetail from "../travel/PlaceDetailPage";

export default function RouterOutleft() {

    return (
        <Routes>
            <Route element={<PrivateRoute />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/discussions" element={<DiscussionFeedPage />} />
                <Route path="/discussions/detail/:id" element={<DiscussionDetail />} />
                <Route path="/shopping" element={<ShoppingFeedPage />} />
                <Route path="/shopping/product/detail/:id" element={<ProductDetail />} />
                <Route path="/voyage" element={<TravelFeed />} />
                <Route path="/voyage/place/detail/:id" element={<PlaceDetail />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password/reset/:id?/:token?" element={<PasswordReset />} />
            <Route path="/user/validation/account/:id/:token" element={<ValidationAccountPage />} />
        </Routes>
    )

}