import { Menu } from "antd";
import {
    CarOutlined,
    CodeSandboxOutlined,
    InboxOutlined, PartitionOutlined,
    TeamOutlined,
    ToolOutlined,
    UserOutlined
} from "@ant-design/icons";
import React from "react";

export const ItemMenu = ({ userRole, onNavigatePage }) => {
    switch ( userRole ) {
        case 'SUPER_ADMIN': {
            return (<Menu
                theme="dark"
                mode="inline"
                onClick={onNavigatePage}
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <InboxOutlined/>,
                        label: 'Katalog',
                    },
                    {
                        key: '2',
                        icon: <CarOutlined/>,
                        label: 'Sepeda Motor',
                    },
                    {
                        key: '3',
                        icon: <ToolOutlined/>,
                        label: 'Suku Cadang',
                    },
                    {
                        key: '4',
                        icon: <TeamOutlined/>,
                        label: 'Daftar Dealer',
                    },
                    {
                        key: '5',
                        icon: <UserOutlined/>,
                        label: 'Daftar Pengguna',
                    },
                ]}
            />);
        }
        case 'DEALER_ADMIN': {
            return (<Menu
                theme="dark"
                mode="inline"
                onClick={onNavigatePage}
                defaultSelectedKeys={['11']}
                items={[
                    {
                        key: '11',
                        icon: <CodeSandboxOutlined/>,
                        label: 'Paket Service',
                    },
                    {
                        key: '12',
                        icon: <PartitionOutlined />,
                        label: 'Service',
                    },
                ]}
            />);
        }
        default:
            return <></>
    }
}