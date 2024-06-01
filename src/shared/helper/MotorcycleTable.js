import { Button, Image, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const MotorcycleColumns = (showModal, handleDeleteMotorcycle) => [
    {
        title: 'Model Kendaraan',
        dataIndex: 'catalogId',
        width: 250,
        render: (_, { catalogId }) => (
            <>
                {catalogId.modelName}
            </>
        ),
    },
    {
        title: 'Tahun Perakitan',
        dataIndex: 'buildDate',
        width: 250,
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
        width: 250,
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
        width: 55,
        render: (data) => {
            return (
                <div className="flex justify-between">
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => showModal(data)}/>
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