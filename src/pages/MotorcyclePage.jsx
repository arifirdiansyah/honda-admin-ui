import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addMotorcycleData,
    deleteMotorcycleData,
    getAllMotorcycle,
    updateMotorcycleData
} from "../shared/services/motorcycleService";
import MotorcycleColumns from "../shared/helper/MotorcycleTable";
import { getAllCatalogs } from "../shared/services/catalogService";
import { ReloadOutlined } from "@ant-design/icons";


const MotorcyclePage = () => {
    const dispatch = useDispatch();
    const [formMotorcycle] = Form.useForm();
    const motorcycle = useSelector(state => state.MotorcycleReducer);
    const catalog = useSelector(state => state.CatalogueReducer);
    const [motorcycleModal, setMotorcycleModal] = useState({ modalOpen: false, data: null });

    const showMotorcycleModal = (motorcycleData) => {
        formMotorcycle.setFieldsValue({
            catalogId: motorcycleData ? motorcycleData.catalogId.id : '',
            buildDate: motorcycleData ? motorcycleData.buildDate : '',
            vin: motorcycleData ? motorcycleData.vin : '',
            color: motorcycleData ? motorcycleData.color : '',
            cover: motorcycleData ? motorcycleData.cover : '',
           
        })
        setMotorcycleModal({ modalOpen: true, data: motorcycleData });
    };

    const handleCancelModal = () => {
        setMotorcycleModal({ modalOpen: false, data: null });
    };

    const submitFormCatalog = (value) => {
        if (motorcycleModal.data) {
            dispatch(updateMotorcycleData(value, motorcycleModal.data));
        } else {
            dispatch(addMotorcycleData(value));
        }
        setMotorcycleModal({ modalOpen: false, data: null });
    }

    const handleDeleteMotorcycle = (data) => {
        dispatch(deleteMotorcycleData(data));
    }

    useEffect(() => {
        dispatch(getAllMotorcycle());
        dispatch(getAllCatalogs());
    }, [dispatch]);

    return (<>
        <Modal title={motorcycleModal.data ? 'Perbaharui Kendaraan' : 'Tambah Kendaraan'}
               open={motorcycleModal.modalOpen}
               onOk={() => formMotorcycle.submit()}
               okText="Simpan"
               cancelText="Batalkan"
               onCancel={handleCancelModal}>
            <div className="w-full">
                <Form
                    name="basic"
                    layout="vertical"
                    form={formMotorcycle}
                    autoComplete="off"
                    onFinish={submitFormCatalog}
                >
                    <Form.Item
                        label="Nama Katalog"
                        name="catalogId"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Select size="large" placeholder="Pilih katalog"
                                showSearch
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
                        label="Tahun Perakitan"
                        name="buildDate"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large" type="number"/>
                    </Form.Item>

                    <Form.Item
                        label="Plat Nomor"
                        name="vin"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large"/>
                    </Form.Item>

                    <Form.Item
                        label="Warna"
                        name="color"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large"/>
                    </Form.Item>

                    <Form.Item
                        label="Foto Kendaraan"
                        name="cover"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
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
                onClick={() => {
                    showMotorcycleModal(null)
                }}
            >
                Tambah Kendaraan
            </Button>
            <Button
                type="default"
                style={{
                    marginLeft: 10,
                }}
                onClick={() => {
                    dispatch(getAllMotorcycle())
                }} icon={<ReloadOutlined />}/>

        </div>
        <Table
            columns={MotorcycleColumns(showMotorcycleModal, handleDeleteMotorcycle)}
            dataSource={motorcycle.motorcycles}
            loading={motorcycle.isLoading}
            pagination={{
                pageSize: 50,
            }}
            scroll={{
                y: 1000,
            }}
        />
    </>);
}

export default MotorcyclePage;