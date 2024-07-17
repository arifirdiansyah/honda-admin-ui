import { Button, Image, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const MotorcycleColumns = (showModal, handleDeleteMotorcycle) => [
    {
        title: 'Model Kendaraan',
        dataIndex: 'catalogId',
        width: 150,
        render: (_, { catalogId }) => (
            <>
                {catalogId.modelName}
            </>
        ),
    },
    {
        title: 'Tahun Perakitan',
        dataIndex: 'buildDate',
        width: 80,
    },
    {
        title: 'Nomor Rangka',
        dataIndex: 'vin',
        width: 250,
        render: (_, { vin }) => (
            <>
                {vin.toUpperCase()}
            </>
        ),
    },
    {
        title: 'Warna',
        dataIndex: 'color',
        width: 120,
        render: (_, { color }) => (
            <>
                <Tag>
                    {color}
                </Tag>
            </>
        ),
    },
    {
        title: 'Foto',
        dataIndex: 'cover',
        width: 150,
        render: (_, { cover }) => (
            <>
                <Image
                    width={50}
                    src={cover}
                />
            </>
        ),
    },
    {
        title: '',
        width: 80,
        render: (data) => {
            return (
                <div className="flex items-center justify-end">
                    <Button type="primary" className="mr-2" icon={<EditOutlined/>} onClick={() => showModal(data)}/>
                    <Popconfirm
                        title="Hapus Kendaraan"
                        description="Anda yakin ingin melanjutkan?"
                        okText="Lanjutkan"
                        cancelText="Tidak"
                        onConfirm={() => handleDeleteMotorcycle(data)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </div>
            )
        },
    }
];

export default MotorcycleColumns;