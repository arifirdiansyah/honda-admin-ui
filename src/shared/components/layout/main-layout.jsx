import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, PoweroffOutlined
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../../services/userService";
import { get } from "lodash";
import { ItemMenu } from "./ItemMenu";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth0();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.UserReducer);

    useEffect(() => {
        dispatch(loadCurrentUser())
    }, [dispatch]);

    const onNavigatePage = (data) => {
        switch ( data.key ) {
            case '1':
                navigate('/app/catalog');
                break;
            case '2':
                navigate('/app/motorcycle');
                break;
            case '3':
                navigate('/app/part');
                break;
            case '4':
                navigate('/app/dealership');
                break;
            case '5':
                navigate('/app/user');
                break;
            case '11':
                navigate('/dealership/service-package');
                break;
            case '12':
                navigate('/dealership/service');
                break;
            case '13':
                navigate('/dealership/motorcycles');
                break;
            default:
                break;
        }
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        logout();
    }

    return (
        <div className="w-screen h-screen"> 
            <Layout className="h-auto">
                <Sider trigger={null} collapsible collapsed={collapsed} className="flex flex-col">
                    <div className="flex justify-center items-center mb-2 px-2 py-5">
                        <img src="/honda.svg" alt="logo"/>
                    </div>
                    <ItemMenu userRole={get(userInfo.currentUser, 'role')} onNavigatePage={onNavigatePage}/>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div className="flex justify-between pr-10 items-center">
                            <div className="flex">
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                                <div>
                                    <span className="font-medium">Halo, </span>
                                    <span>{get(userInfo.currentUser, 'name', userInfo.currentUser.email)}</span>
                                </div>
                            </div>
                            <Button danger icon={<PoweroffOutlined/>} onClick={onLogout}>Log Out</Button>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};
export default withAuthenticationRequired(MainLayout, {
    onRedirecting: () => <Loading loadingText="Sedang memuat..."/>
});