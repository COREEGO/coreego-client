import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import DiscussionFeedPage from "../discussion/DiscussionFeedPage";
import LoginPage from "../authentification/LoginPage";
import MarketPlaceFeedPage from "../marketplace/MarketPlaceFeedPage";
import PrivateRoute from "../../components/navigation/PrivateRoute";
import TravelFeed from "../travel/TravelFeed";
import DiscussionDetail from "../discussion/DiscussionDetail";
import RegisterPage from "../authentification/RegisterPage";
import ValidationAccountPage from "../authentification/ValidationAccountPage";
import PasswordReset from "../authentification/PasswordReset";
import ProductDetail from "../marketplace/ProductDetailPage";
import PlaceDetail from "../travel/PlaceDetailPage";
import DiscussionCreatePage from "../discussion/DiscussionCreatePage";
import ProductCreatePage from "../marketplace/ProductCreatePage";
import PlaceCreatePage from "../travel/PlaceCreatePage";

export default function RouterOutleft() {

    return (
        <Routes>
            <Route element={<PrivateRoute />} >
                <Route path="/" element={<HomePage />} />

                {/* Discussions */}
                <Route path="/discussions" element={<DiscussionFeedPage />} />
                <Route path="/discussions/detail/:id" element={<DiscussionDetail />} />
                <Route path="/discussions/create" element={<DiscussionCreatePage />} />

                <Route path="/market-place" element={<MarketPlaceFeedPage />} />
                <Route path="/market-place/product/detail/:id" element={<ProductDetail />} />
                <Route path="/market-place/product/create" element={<ProductCreatePage />} />

                <Route path="/voyage" element={<TravelFeed />} />
                <Route path="/voyage/place/detail/:id" element={<PlaceDetail />} />
                <Route path="/voyage/place/create" element={<PlaceCreatePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password/reset/:id?/:token?" element={<PasswordReset />} />
            <Route path="/user/validation/account/:id/:token" element={<ValidationAccountPage />} />
        </Routes>
    )

}