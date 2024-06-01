import CatalogColumns from "../shared/helper/CatalogTable";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addCatalogData,
    deleteCatalogData,
    getAllCatalogs,
    updateCatalogData
} from "../shared/services/catalogService";
import { ReloadOutlined } from "@ant-design/icons";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const CatalogPage = () => {
    const dispatch = useDispatch();
    const [formCatalog] = Form.useForm();
    const catalog = useSelector(state => state.CatalogueReducer);
    const [catalogModal, setCatalogModal] = useState({ modalOpen: false, data: null });

    const showCatalogModal = (catalogData) => {
        formCatalog.setFieldsValue({
            modelName: catalogData ? catalogData.modelName : '',
            transmission: catalogData ? catalogData.transmission : '',
            picture: catalogData ? catalogData.picture : '',
            engine: catalogData ? catalogData.engine : '',
            frame: catalogData ? catalogData.frame : '',
        })
        setCatalogModal({ modalOpen: true, data: catalogData });
    };

    const handleCancelModal = () => {
        setCatalogModal({ modalOpen: false, data: null });
    };

    const submitFormCatalog = (value) => {
        if (catalogModal.data) {
            dispatch(updateCatalogData(value, catalogModal.data));
        } else {
            dispatch(addCatalogData(value));
        }
        setCatalogModal({ modalOpen: false, data: null });
    }

    const handleDeleteCatalog = (data) => {
        dispatch(deleteCatalogData(data));
    }

    useEffect(() => {
        dispatch(getAllCatalogs());
    }, [dispatch]);

    return (
        <>
            <Modal title={catalogModal.data ? 'Perbaharui Katalog' : 'Tambah Katalog'}
                   open={catalogModal.modalOpen}
                   onOk={() => formCatalog.submit()}
                   okText="Simpan"
                   cancelText="Batalkan"
                   onCancel={handleCancelModal}>
                <div className="w-full">
                    <Form
                        name="basic"
                        layout="vertical"
                        form={formCatalog}
                        autoComplete="off"
                        onFinish={submitFormCatalog}
                    >
                        <Form.Item
                            label="Nama Katalog"
                            name="modelName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>

                        <Form.Item
                            label="Transmisi"
                            name="transmission"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Select size="large">
                                <Select.Option value="AUTOMATIC">Automatic</Select.Option>
                                <Select.Option value="MANUAL">Manual</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Kapasitas Mesin"
                            name="engine"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Input size="large" type="number"/>
                        </Form.Item>

                        <Form.Item
                            label="Nama Rangka"
                            name="frame"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>

                        <Form.Item
                            label="Foto Katalog"
                            name="picture"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div style={{
                marginBottom: 16,
            }}>
                <Button
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                    onClick={() => {
                        showCatalogModal(null)
                    }}
                >
                    Tambah Katalog
                </Button>
                <Button
                    type="default"
                    style={{
                        marginLeft: 10,
                    }}
                    onClick={() => {
                        dispatch(getAllCatalogs())
                    }} icon={<ReloadOutlined/>}/>

            </div>
            <Table
                columns={CatalogColumns(showCatalogModal, handleDeleteCatalog)}
                dataSource={catalog.catalogs}
                loading={catalog.isLoading}
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 1000,
                }}
            />
        </>
    );
}

export default withAuthenticationRequired(CatalogPage);