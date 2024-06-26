import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import ForumPage from "../forum/ForumPage";
import LoginPage from "../authentification/LoginPage";
import MarketPlacePage from "../marketplace/MarketPlacePage";
import PrivateRoute from "./PrivateRoute";
import DiscussionDetail from "../forum/DiscussionDetail";
import RegisterPage from "../authentification/RegisterPage";
import ProductDetail from "../marketplace/ProductDetailPage";
import PlaceDetail from "../travel/PlaceDetailPage";
import DiscussionCreatePage from "../forum/DiscussionCreatePage";
import ProductCreatePage from "../marketplace/ProductCreatePage";
import PlaceCreatePage from "../travel/PlaceCreatePage";
import ProfilPage from '../user/ProfilPage'
import DiscussionEditPage from "../forum/DiscussionEditPage";
import ProductEditPage from "../marketplace/ProductEditPage";
import PlaceEditPage from "../travel/PlaceEditPage";
import ProfilEditPage from "../user/ProfilEditPage";
import EmailVerifyPage from "../authentification/EmailVerifyPage";
import PasswordForgotPage from "../authentification/PasswordForgotPage";
import AnaliticPage from "../dashboard/analitics/AnalisticPage";
import UsersDashboardPage from "../dashboard/UsersDashboardPage";
import DiscussionsPublicationsDashboardPage from "../dashboard/publications/DiscussionsPublicationsDashboardPage";
import ProductsPublicationsDashboardPage from "../dashboard/publications/ProductsPublicationsDashboardPage";
import PlacesPublicationsDashboardPage from "../dashboard/publications/PlacesPublicationsDashboardPage";
import CommentsPublicationsDashboard from "../dashboard/publications/CommentsPublicationsDashboard";
import ReviewPublicationsDashboard from "../dashboard/publications/ReviewPublicationsDashboard";
import ReportDashboard from "../dashboard/ReportDashboard";
import NotificationPage from "../user/NotificationPage";
import AccountPage from "../user/AccountPage";
import UserLikes from "../user/UserLikesPage";
import ExplorePage from "../travel/ExplorePage";
import TravelLoguePage from "../user/TravelLoguePage";
import NotFoundPage from "../NotFoundPage";
import ConfidentialitePage from "../mentions-legale/ConfidentialitePage";
import ConditionsPage from "../mentions-legale/ConditionsPage";
import FonctionalsPage from "../mentions-legale/FonctionalsPage";
import Error500 from "../Error500";
import PrivateUnloggedRoute from "./PrivateUnloggedRoute";


export default function RouterOutlet() {

    return (

        <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="error" element={<Error500 />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/discussion/:slug" element={<DiscussionDetail />} />
            <Route path="/marketplace" element={<MarketPlacePage />} />

            <Route path="/marketplace/produit/:slug" element={<ProductDetail />} />
            <Route path="/explorer" element={<ExplorePage />} />
            <Route path="/explorer/lieu/:slug" element={<PlaceDetail />} />

            <Route element={<PrivateUnloggedRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/password/forgot" element={<PasswordForgotPage />} />
                <Route path="/email/verify" element={<EmailVerifyPage />} />
            </Route>

            <Route path="/confidentialite" element={<ConfidentialitePage />} />
            <Route path="/conditions-generales" element={<ConditionsPage />} />
            <Route path="/fonctionnement-site" element={<FonctionalsPage />} />

            <Route element={<PrivateRoute />} >
                <Route path="/user/profil/modification" element={<ProfilEditPage />} />

                <Route path="/mes-notifications" element={<NotificationPage />} />
                <Route path="/mon-compte" element={<AccountPage />} />
                <Route path="/mes-likes" element={<UserLikes />} />
                <Route path="/forum/discussion/creation" element={<DiscussionCreatePage />} />
                <Route path="/forum/discussion/modification/:slug" element={<DiscussionEditPage />} />

                <Route path="/marketplace/produit/creation" element={<ProductCreatePage />} />
                <Route path="/marketplace/produit/modification/:slug" element={<ProductEditPage />} />

                <Route path="/explorer/lieu/creation" element={<PlaceCreatePage />} />

                <Route path="/explorer/lieu/modification/:slug" element={<PlaceEditPage />} />

                <Route path="/mon-carnet-de-voyage" element={<TravelLoguePage />} />

                <Route path="/user/profil/:slug" element={<ProfilPage />} />

                <Route element={<PrivateRoute middlewareIsAdmin={true} />}>
                    <Route path="/dashboard/analyse-des-donnees" element={<AnaliticPage />} />
                    <Route path="/dashboard/utilisateurs" element={<UsersDashboardPage />} />
                    <Route path="/dashboard/signalements" element={<ReportDashboard />} />
                    <Route path="/dashboard/publication/discussions" element={<DiscussionsPublicationsDashboardPage />} />
                    <Route path="/dashboard/publication/produits" element={<ProductsPublicationsDashboardPage />} />
                    <Route path="/dashboard/publication/lieux" element={<PlacesPublicationsDashboardPage />} />
                    <Route path="/dashboard/publication/commentaires" element={<CommentsPublicationsDashboard />} />
                    <Route path="/dashboard/publication/avis" element={<ReviewPublicationsDashboard />} />
                </Route>
            </Route>

        </Routes>
    )

}