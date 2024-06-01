import { createBrowserRouter } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage";
import MotorcyclePage from "../pages/MotorcyclePage";
import MainLayout from "../shared/components/layout/main-layout";
import PartPage from "../pages/PartPage";
import AuthRedirection from "../shared/components/AuthRedirection";

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
        ]
    },
    {
        path: "/auth/callback",
        element: <AuthRedirection />,
    },
]);

export default router;