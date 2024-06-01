import React, { useState } from 'react';
import {
    CarOutlined, InboxOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, ToolOutlined,
    UserOutlined,TeamOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    const onNavigatePage = (data) => {
        switch (data.key) {
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
            default:
                break;
        }
    }

    return (
        <div className="w-screen h-screen">
            <Layout className="h-full">
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical"/>
                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={onNavigatePage}
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <InboxOutlined />,
                                label: 'Katalog',
                            },
                            {
                                key: '2',
                                icon: <CarOutlined />,
                                label: 'Sepeda Motor',
                            },
                            {
                                key: '3',
                                icon: <ToolOutlined />,
                                label: 'Suku Cadang',
                            },
                            {
                                key: '4',
                                icon: <TeamOutlined />,
                                label: 'Daftar Dealer',
                            },
                            {
                                key: '5',
                                icon: <UserOutlined />,
                                label: 'Daftar Pengguna',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
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
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};
export default MainLayout;