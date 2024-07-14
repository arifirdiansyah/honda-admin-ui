import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadCurrentUser } from "../shared/services/userService";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../shared/components/Loading";

const HomePage = () => {
    const userInfo = useSelector(state => state.UserReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (userInfo && userInfo.currentUser) {
            switch ( userInfo.currentUser.role ) {
                case "SUPER_ADMIN": {
                    navigate('/app/catalog');
                    break;
                }
                case 'DEALER_ADMIN': {
                    navigate('/dealership/service');
                    break;
                }
                default: {
                    break;
                }
            }
        } else {
        }
    }, [userInfo, dispatch]);

    return <>
        <Loading loadingText="Sedang Mengarahkan..."/>
    </>;
}

export default withAuthenticationRequired(HomePage, {
    onRedirecting: () => <Loading loadingText="Sedang Memeriksa..."/>
});