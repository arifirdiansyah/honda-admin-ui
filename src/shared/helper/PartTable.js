import { Button, Image, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const PartColumns = (showModal, handleDeletePart) => [

    {
        title: 'Nama Suku Cadang',
        dataIndex: 'partName',
        width: 250,
    },
    {
        title: 'Nomor Suku Cadang',
        dataIndex: 'partNumber',
        width: 150,
        render: (_, { partNumber }) => (
            <>
                {partNumber.toUpperCase()}
            </>
        ),
    },
    {
        title: 'Foto',
        width: 150,
        render: (_, { picture }) => (
            <>
                <Image
                    width={50}
                    src={picture}
                />
            </>
        ),
    },
    {
        title: 'Harga',
        dataIndex: 'price',
        width: 150,
        render: (_, { price }) => (
            <>
                <Tag>
                    {price}
                </Tag>
            </>
        ),
    },
    {
        title: 'Model Kendaraan',
        dataIndex: 'catalogs',
        width: 150,
        render: (_, { catalogs }) => (
            <>
                {catalogs.map((catalog, key) => {
                    return <Tag key={key}>{catalog.modelName}</Tag>
                })}
            </>
        ),
    },
    {
        title: '',
        width: 80,
        render: (data) => {
            return (
                <div className="flex justify-end items-center">
                    <Button type="primary" className="mr-2" icon={<EditOutlined/>} onClick={() => showModal(data)}/>
                    <Popconfirm
                        title="Hapus Suku Cadang"
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

export default PartColumns;