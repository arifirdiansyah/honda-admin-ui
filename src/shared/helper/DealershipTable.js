import { Button, Image, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CatalogColumns = (showModal, handleDeleteCatalog) => [
    {
        title: 'Nama Dealer',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Alamat',
        dataIndex: 'address',
        width: 150,
        render: (_, { address }) => {
            return (
                <Tag>
                    {address.urbanVillage}, {address.subdistrict}, {address.city}, {address.provinces}
                </Tag>
            )
        },
    },
    {
        title: '',
        width: 80,
        render: (data) => {
            return (
                <div className="flex items-center justify-end">
                    <Button type="primary" className="mr-2" icon={<EditOutlined />} onClick={() => showModal(data)}/>
                    <Popconfirm
                        title="Hapus Katalog"
                        description="Anda yakin ingin melanjutkan?"
                        okText="Lanjutkan"
                        cancelText="Tidak"
                        onConfirm={() => handleDeleteCatalog(data)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            )
        },
    }
];

export default CatalogColumns;