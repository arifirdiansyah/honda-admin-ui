import { Button, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ServiceColumns = (editService, handleDeleteService) => [
    {
        title: 'Nomor Rangka',
        width: 150,
        render: (_, { motorcycleId }) => (
            <>
                {motorcycleId.vin.toUpperCase()}
            </>
        ),
    },
    {
        title: 'Jenis Kendaraan',
        width: 150,
        render: (_, { motorcycleId }) => (
            <>
                {motorcycleId.catalogId.modelName}
            </>
        ),
    },
    {
        title: 'Tanggal Service',
        dataIndex: 'serviceDate',
        width: 150,
    },
    {
        title: 'Total Harga',
        dataIndex: 'fee',
        width: 150,
    },
    {
        title: 'Keterangan',
        dataIndex: 'description',
        width: 150,
    },
    {
        title: '',
        width: 55,
        render: (data) => {
            return (
                <div className="flex justify-end items-center">
                    <Button className="mr-2" type="primary" icon={<EditOutlined/>} onClick={() => editService(data)}/>
                    <Popconfirm
                        title="Hapus Paket Service"
                        description="Anda yakin ingin melanjutkan?"
                        okText="Lanjutkan"
                        cancelText="Tidak"
                        onConfirm={() => handleDeleteService(data)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </div>
            )
        },
    }
];

export default ServiceColumns;