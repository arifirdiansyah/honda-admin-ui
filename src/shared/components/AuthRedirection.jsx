import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthRedirection = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/app/catalog");
        }
    }, [navigate, isAuthenticated]);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Spin size="large" />
        </div>
    )
}

export default AuthRedirection;