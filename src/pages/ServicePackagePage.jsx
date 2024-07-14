import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import PackageServiceColumns from "../shared/helper/ServicePackageTable";
import {
    addServicePackageData,
    deleteServicePackageData, getAllServicePackage,
    updateServicePackageData
} from "../shared/services/servciePackageService";
import TextArea from "antd/es/input/TextArea";
import { getAllPart } from "../shared/services/partService";

export const ServicePackagePage = () => {
    const dispatch = useDispatch();
    const [formServicePackage] = Form.useForm();
    const servicePackage = useSelector(state => state.ServicePackageReducer);
    const part = useSelector(state => state.PartReducer);
    const [servicePackageModal, setServicePackageModal] = useState({ modalOpen: false, data: null });

    const showServicePackageModal = (servicePackageData) => {
        formServicePackage.setFieldsValue({
            packageName: servicePackageData ? servicePackageData.packageName : '',
            description: servicePackageData ? servicePackageData.description : '',
            parts: servicePackageData ? servicePackageData.parts.map(partData => partData.id) : [],
        })
        setServicePackageModal({ modalOpen: true, data: servicePackageData });
    };

    const handleCancelModal = () => {
        setServicePackageModal({ modalOpen: false, data: null });
    };

    const submitFormCatalog = (value) => {
        if (servicePackageModal.data) {
            dispatch(updateServicePackageData(value, servicePackageModal.data));
        } else {
            dispatch(addServicePackageData(value));
        }
        setServicePackageModal({ modalOpen: false, data: null });
    }

    const handleDeleteServicePackage = (data) => {
        dispatch(deleteServicePackageData(data));
    }

    useEffect(() => {
        dispatch(getAllServicePackage());
        dispatch(getAllPart());
    }, [dispatch]);

    return (<>
        <Modal title={servicePackageModal.data ? 'Perbaharui Suku Cadang' : 'Tambah Suku Cadang'}
               open={servicePackageModal.modalOpen}
               onOk={() => formServicePackage.submit()}
               okText="Simpan"
               cancelText="Batalkan"
               onCancel={handleCancelModal}>
            <div className="w-full">
                <Form
                    name="basic"
                    layout="vertical"
                    form={formServicePackage}
                    autoComplete="off"
                    onFinish={submitFormCatalog}
                >
                    <Form.Item
                        label="Nama Paket"
                        name="packageName"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large"/>
                    </Form.Item>
                    <Form.Item
                        label="Keterangan"
                        name="description"
                    >
                        <TextArea size="large"/>
                    </Form.Item>
                    <Form.Item
                        label="Rekomendasi Suku Cadang"
                        name="parts"
                    >
                        <Select size="large" placeholder="Pilih part"
                                showSearch
                                mode="multiple"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={part.parts.map((part, key) => {
                                    return {
                                        key: key,
                                        value: part.id,
                                        label: part.partName,
                                    }
                                })}
                        />
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
                    showServicePackageModal(null)
                }}
            >
                Tambah Paket Service
            </Button>
            <Button
                type="default"
                style={{
                    marginLeft: 10,
                }}
                onClick={() => {
                    dispatch(getAllServicePackage())
                }} icon={<ReloadOutlined/>}/>

        </div>
        <Table
            columns={PackageServiceColumns(showServicePackageModal, handleDeleteServicePackage)}
            dataSource={servicePackage.servicePackages}
            loading={servicePackage.isLoading}
            pagination={{
                pageSize: 50,
            }}
            scroll={{
                y: 1000,
            }}
        />
    </>);
}