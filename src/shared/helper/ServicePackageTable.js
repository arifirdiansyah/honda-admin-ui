import { Button, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const PackageServiceColumns = (showModal, handleDeletePart) => [

    {
        title: 'Nama Paket',
        dataIndex: 'packageName',
        width: 150,
    },
    {
        title: 'Keterangan',
        dataIndex: 'description',
        width: 150,
    },
    {
        title: 'Rekomendasi Suku Cadang',
        dataIndex: 'parts',
        width: 150,
        render: (_, { parts }) => (
            <>
                {parts.map((part, key) => {
                    return <span key={key} className="max-w-32 overflow-ellipsis">{part.partName}</span>
                })}
            </>
        ),
    },
    {
        title: '',
        width: 55,
        render: (data) => {
            return (
                <div className="flex justify-start">
                    <Button className="mr-2" type="primary" icon={<EditOutlined/>} onClick={() => showModal(data)}/>
                    <Popconfirm
                        title="Hapus Paket Service"
                        description="Anda yakin ingin melanjutkan?"
                        okText="Lanjutkan"
                        cancelText="Tidak"
                        onConfirm={() => handleDeletePart(data)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </div>
            )
        },
    }
];

export default PackageServiceColumns;