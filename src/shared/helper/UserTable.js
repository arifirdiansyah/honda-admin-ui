import { Button, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

const UserColumns = (showModal) => [
    {
        title: 'Nama',
        dataIndex: 'name',
        width: 250,
    },
    {
        title: 'Surel',
        dataIndex: 'email',
        width: 250,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        width: 150,
        render: (_, { role }) => {
            let color;

            switch ( role ) {
                case 'SUPER_ADMIN':
                    color = 'red';
                    break;
                case 'ADMIN':
                    color = 'green';
                    break;
                case 'DEALER_ADMIN':
                    color = 'blue';
                    break;
                default:
                    color = 'grey';
                    break;
            }
            return (<>
                <Tag color={color}>{role}</Tag>
            </>)
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: 150,
        render: (_, { status }) => (
            <>
                <Tag>{status}</Tag>
            </>
        ),
    },
    {
        title: '',
        width: 80,
        render: (data) => {
            return (
                <div className="flex justify-end items-center">
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => showModal(data)}/>
                </div>
            )
        },
    }
];

export default UserColumns;