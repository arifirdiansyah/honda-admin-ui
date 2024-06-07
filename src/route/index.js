import { createBrowserRouter } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage";
import MotorcyclePage from "../pages/MotorcyclePage";
import MainLayout from "../shared/components/layout/main-layout";
import PartPage from "../pages/PartPage";
import AuthRedirection from "../shared/components/AuthRedirection";
import UserPage from "../pages/UserPage";
import DealershipPage from "../pages/DealershipPage";

const router = createBrowserRouter([
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
        path: "/auth/callback",
        element: <AuthRedirection />,
    },
]);

export default router;