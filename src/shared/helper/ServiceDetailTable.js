import { Button, Image, Popconfirm, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ServiceDetailColumns = (handleDeletePart) => [
    {
        title: 'Nomor Suku Cadang',
        width: 150,
        render: (_, {part}) => {
            return (<span>{part.partNumber}</span>)
        }
    },
    {
        title: 'Nama Suku Cadang',
        width: 150,
        render: (_, {part}) => {
            return (<span>{part.partName}</span>)
        }
    },
    {
        title: 'Harga',
        width: 150,
        render: (_, {part}) => {
            return (<span>{part.price}</span>)
        }
    },
    {
        title: 'Foto',
        width: 150,
        render: (_, { part }) => (
            <>
                <Image
                    width={50}
                    src={part.picture}
                />
            </>
        ),
    },
    {
        title: 'Jumlah Di Pesan',
        width: 110,
        render: (_, { quantity }) => (
            <>
                <span>{quantity}</span>
            </>
        ),
    },
    {
        title: '',
        width: 55,
        render: (data) => {
            return (
                <div className="flex justify-end items-center">
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

export default ServiceDetailColumns;