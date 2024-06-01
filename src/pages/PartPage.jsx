import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addPartData,
    deletePartData,
    getAllPart,
    updatePartData
} from "../shared/services/partService";
import PartColumns from "../shared/helper/PartTable";
import { getAllCatalogs } from "../shared/services/catalogService";
import { ReloadOutlined } from "@ant-design/icons";
import { withAuthenticationRequired } from "@auth0/auth0-react";


const PartPage = () => {
    const dispatch = useDispatch();
    const [formPart] = Form.useForm();
    const part = useSelector(state => state.PartReducer);
    const catalog = useSelector(state => state.CatalogueReducer);
    const [partModal, setPartModal] = useState({ modalOpen: false, data: null });

    const showPartModal = (partData) => {
        formPart.setFieldsValue({
            catalogs: partData ? partData.catalogs.map(catalog => catalog.id) : [],
            partName: partData ? partData.partName : '',
            partNumber: partData ? partData.partNumber : '',
            picture: partData ? partData.picture : '',
            price: partData ? partData.price : '',
        })
        setPartModal({ modalOpen: true, data: partData });
    };

    const handleCancelModal = () => {
        setPartModal({ modalOpen: false, data: null });
    };

    const submitFormCatalog = (value) => {
        if (partModal.data) {
            dispatch(updatePartData(value, partModal.data));
        } else {
            dispatch(addPartData(value));
        }
        setPartModal({ modalOpen: false, data: null });
    }

    const handleDeletePart = (data) => {
        dispatch(deletePartData(data));
    }

    useEffect(() => {
        dispatch(getAllPart());
        dispatch(getAllCatalogs());
    }, [dispatch]);

    return (<>
        <Modal title={partModal.data ? 'Perbaharui Suku Cadang' : 'Tambah Suku Cadang'}
               open={partModal.modalOpen}
               onOk={() => formPart.submit()}
               okText="Simpan"
               cancelText="Batalkan"
               onCancel={handleCancelModal}>
            <div className="w-full">
                <Form
                    name="basic"
                    layout="vertical"
                    form={formPart}
                    autoComplete="off"
                    onFinish={submitFormCatalog}
                >
                    <Form.Item
                        label="Katalog"
                        name="catalogs"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Select size="large" placeholder="Pilih katalog"
                                showSearch
                                mode="multiple"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={catalog.catalogs.map((catalog, key) => {
                                    return {
                                        key: key,
                                        value: catalog.id,
                                        label: catalog.modelName,
                                    }
                                })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Nama Suku Cadang"
                        name="partName"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large"/>
                    </Form.Item>

                    <Form.Item
                        label="Nomor Suku Cadang"
                        name="partNumber"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large"/>
                    </Form.Item>

                    <Form.Item
                        label="Foto Suku Cadang"
                        name="picture"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large"/>
                    </Form.Item>

                    <Form.Item
                        label="Harga"
                        name="price"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large" type="number"/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
        <div style={{
            marginBottom: 16,
        }}>
            <Button
                type="primary"
                onClick={() => {
                    showPartModal(null)
                }}
            >
                Tambah Suku Cadang
            </Button>
            <Button
                type="default"
                style={{
                    marginLeft: 10,
                }}
                onClick={() => {
                    dispatch(getAllPart())
                }} icon={<ReloadOutlined />}/>

        </div>
        <Table
            columns={PartColumns(showPartModal, handleDeletePart)}
            dataSource={part.parts}
            loading={part.isLoading}
            pagination={{
                pageSize: 50,
            }}
            scroll={{
                y: 1000,
            }}
        />
    </>);
}

export default withAuthenticationRequired(PartPage);