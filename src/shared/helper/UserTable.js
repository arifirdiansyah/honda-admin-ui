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

            switch (role) {
                case 'SUPER_ADMIN':
                    color = 'red';
                    break;
                case 'DEALER_ADMIN':
                    color = 'blue';
                    break;
                case 'ADMIN':
                    color = 'green';
                    break;
                case 'CUSTOMER':
                    color = 'grey';
                    break;
                default:
                    color = 'grey';
                    break;
            }
            return (<Tag color={color}>{role}</Tag>);
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: 150,
        render: (_, { status }) => (
            <Tag>{status}</Tag>
        ),
    },
    {
        title: 'Nomor HP',
        dataIndex: 'phoneNumber',
        width: 200,
        render: (_, { phoneNumber, role }) => {
            if (role === 'CUSTOMER') {
                return phoneNumber;
            }
            return null; // Atau bisa juga dikembalikan string kosong ''
        },
    },
    {
        title: 'Alamat',
        dataIndex: 'address',
        width: 300,
        render: (_, { address, role }) => {
            if (role === 'CUSTOMER') {
                return address;
            }
            return null; // Atau bisa juga dikembalikan string kosong ''
        },
    },
    {
        title: '',
        width: 80,
        render: (data) => {
            return (
                <div className="flex justify-end items-center">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(data)} />
                </div>
            );
        },
    }
];

export default UserColumns;
