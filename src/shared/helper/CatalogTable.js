import { Button, Image, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CatalogColumns = (showModal, handleDeleteCatalog) => [
    {
        title: 'Katalog',
        dataIndex: 'modelName',
        width: 150,
    },
    {
        title: 'Transmisi',
        dataIndex: 'transmission',
        width: 150,
        render: (_, { transmission }) => {
            const color = transmission === 'AUTOMATIC' ? 'green' : 'blue';
            return (
                <Tag color={color}>
                    {transmission}
                </Tag>
            )
        },
    },
    {
        title: 'Kapasitas Mesin',
        dataIndex: 'engine',
        width: 150,
        render: (_, { engine }) => (
            <>
                {
                    <p>{engine} CC</p>
                }
            </>
        ),
    },
    {
        title: 'Foto',
        dataIndex: 'picture',
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
        title: 'Tipe Rangka',
        dataIndex: 'frame',
        width: 200,
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