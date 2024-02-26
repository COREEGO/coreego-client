import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import ForumPage from "../forum/ForumPage";
import LoginPage from "../authentification/LoginPage";
import MarketPlacePage from "../marketplace/MarketPlacePage";
import PrivateRoute from "./PrivateRoute";
import TravelPage from "../travel/TravelPage";
import DiscussionDetail from "../forum/DiscussionDetail";
import RegisterPage from "../authentification/RegisterPage";
import ProductDetail from "../marketplace/ProductDetailPage";
import PlaceDetail from "../travel/PlaceDetailPage";
import DiscussionCreatePage from "../forum/DiscussionCreatePage";
import ProductCreatePage from "../marketplace/ProductCreatePage";
import PlaceCreatePage from "../travel/PlaceCreatePage";
import ProfilPage from '../user/ProfilPage'
import TraveloguePage from "../user/TraveloguePage";
import DiscussionEditPage from "../forum/DiscussionEditPage";
import ProductEditPage from "../marketplace/ProductEditPage";
import PlaceEditPage from "../travel/PlaceEditPage";
import ProfilEditPage from "../user/ProfilEditPage";
import EmailVerifyPage from "../authentification/EmailVerifyPage";
import PasswordForgotPage from "../authentification/PasswordForgotPage";


export default function RouterOutlet() {

    return (

        <Routes>
            <Route element={<PrivateRoute />} >
                <Route path="/" element={<HomePage />} />

                <Route path="/user/profil/edit" element={<ProfilEditPage />} />


                <Route path="/forum" element={<ForumPage />} />
                <Route path="/forum/discussion/:slug" element={<DiscussionDetail />} />
                <Route path="/forum/discussion/create" element={<DiscussionCreatePage />} />
                <Route path="/forum/discussion/edit/:slug" element={<DiscussionEditPage />} />


                <Route path="/market-place" element={<MarketPlacePage />} />
                <Route path="/market-place/product/:slug" element={<ProductDetail />} />
                <Route path="/market-place/product/create" element={<ProductCreatePage />} />
                <Route path="/market-place/product/edit/:slug" element={<ProductEditPage />} />

                <Route path="/voyage" element={<TravelPage />} />
                <Route path="/voyage/place/:slug" element={<PlaceDetail />} />
                <Route path="/voyage/place/create" element={<PlaceCreatePage />} />
                <Route path="/voyage/place/edit/:slug" element={<PlaceEditPage />} />

                <Route path="/user/profil/:slug" element={<ProfilPage />} />
                <Route path="/user/carnet-de-voyage" element={<TraveloguePage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password/forgot" element={<PasswordForgotPage />} />

            <Route path="/email/verify" element={<EmailVerifyPage />} />

        </Routes>
    )

}