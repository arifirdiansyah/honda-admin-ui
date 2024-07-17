import { createBrowserRouter } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage";
import MotorcyclePage from "../pages/MotorcyclePage";
import MainLayout from "../shared/components/layout/main-layout";
import PartPage from "../pages/PartPage";
import AuthRedirection from "../shared/components/AuthRedirection";
import UserPage from "../pages/UserPage";
import DealershipPage from "../pages/DealershipPage";
import { ServicePackagePage } from "../pages/ServicePackagePage";
import { ServicePage } from "../pages/ServicePage";
import HomePage from "../pages/HomePage";
import { ServiceDetailsPage } from "../pages/ServiceDetailPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: "/app",
        element: <MainLayout/>,
        children: [
            {
                path: "catalog",
                element: <CatalogPage/>,
            },
            {
                path: "motorcycle",
                element: <MotorcyclePage/>,
            },
            {
                path: "part",
                element: <PartPage/>,
            },
            {
                path: "dealership",
                element: <DealershipPage/>,
            },
            {
                path: "user",
                element: <UserPage/>,
            },
        ]
    },
    {
        path: "/dealership",
        element: <MainLayout/>,
        children: [
            {
                path: "service-package",
                element: <ServicePackagePage/>,
            },
            {
                path: "service",
                element: <ServicePage/>,
            },
            {
                path: "service-detail/:serviceId",
                element: <ServiceDetailsPage/>,
            },
        ]
    },
    {
        path: "/auth/callback",
        element: <AuthRedirection/>,
    },
]);

export default router;