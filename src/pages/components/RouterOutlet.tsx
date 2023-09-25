import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import DiscussionFeedPage from "../discussion/DiscussionFeedPage";
import LoginPage from "../authentification/LoginPage";
import ShoppingFeedPage from "../shopping/ShoppingFeedPage";
import PrivateRoute from "../../components/navigation/PrivateRoute";
import { Component, Suspense, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthProvider } from "../../contexts/AuthProvider";
import TravelFeed from "../travel/TravelFeed";
import DiscussionDetail from "../discussion/DiscussionDetail";
import RegisterPage from "../authentification/RegisterPage";


export default function RouterOutleft() {

    return (
        <Routes>
            <Route element={<PrivateRoute />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/discussions" element={<DiscussionFeedPage />} />
                <Route path="/discussions/detail/:id" element={<DiscussionDetail />} />
                <Route path="/shopping" element={<ShoppingFeedPage />} />
                <Route path="/voyage" element={<TravelFeed />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    )

}