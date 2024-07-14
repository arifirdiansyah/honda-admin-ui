import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { loadCurrentUser } from "../services/userService";

const AuthRedirection = () => {
    const navigate = useNavigate();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    const getToken = async () => {
        const token = await getAccessTokenSilently();
        localStorage.setItem('token', token);
        dispatch(loadCurrentUser());
    }

    useEffect(() => {
        if (isAuthenticated) {
            getToken().then(() => {
                navigate('/');
            });
        }
    }, [navigate, isAuthenticated]);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Spin size="large"/>
        </div>
    )
}

export default AuthRedirection;