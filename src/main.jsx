import React from "react";
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import LogIn from "./pages/LogIn.jsx";
import Profile from "./pages/Profile.jsx";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/custom.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AdminPage from "./pages/AdminPage.jsx";
import CollectionCreationPage from "./pages/CollectionCreationPage.jsx";
import PrivateRoute from "./utils/WithPrivateRoute.jsx";
import LoginRoute from "./utils/OnlyLoginRoute.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/signup',
        element: <SignUp/>,
    },
    {
        path: '/login',
        element: <LogIn/>,
    },
    {
        path: `/profile/:uid`,
        element: <PrivateRoute><Profile/></PrivateRoute>,
    },
    {
        path: '/admin',
        element: <PrivateRoute><AdminPage/></PrivateRoute>,
    },
    {
        path: '/collections/create-collection',
        element: <LoginRoute><CollectionCreationPage/></LoginRoute>,
    },
    {
        path: '/collections/collection/:id',
        element: <CollectionPage/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
