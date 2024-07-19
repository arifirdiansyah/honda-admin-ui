import DealershipColumns from "../shared/helper/DealershipTable";
import { Button, Divider, Form, Input, Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addDealershipData,
    deleteDealershipData,
    getAllDealerships,
    updateDealershipData
} from "../shared/services/dealershipService";
import { ReloadOutlined } from "@ant-design/icons";

const DealershipPage = () => {
    const dispatch = useDispatch();
    const [formDealership] = Form.useForm();
    const dealership = useSelector(state => state.DealershipReducer);
    const [dealershipModal, setDealershipModal] = useState({ modalOpen: false, data: null });

    const showDealershipModal = (dealershipData) => {
        formDealership.setFieldsValue({
            name: dealershipData && dealershipData.name ? dealershipData.name : '',
            photo: dealershipData && dealershipData.photo ? dealershipData.photo : '',
            phone: dealershipData && dealershipData.phone ? dealershipData.phone : '',
            provinces: dealershipData && dealershipData.address ? dealershipData.address.provinces : '',
            city: dealershipData && dealershipData.address ? dealershipData.address.city : '',
            subdistrict: dealershipData && dealershipData.address ? dealershipData.address.subdistrict : '',
            urbanVillage: dealershipData && dealershipData.address ? dealershipData.address.urbanVillage : ''
        })
        setDealershipModal({ modalOpen: true, data: dealershipData });
    };

    const handleCancelModal = () => {
        setDealershipModal({ modalOpen: false, data: null });
    };

    const submitFormDealership = (value) => {
        const dealerModel = {
            name: value.name,
            photo: value.photo,
            phone: value.phone,
            address: {
                provinces: value.provinces,
                city: value.city,
                subdistrict: value.subdistrict,
                urbanVillage: value.urbanVillage
            }
        }
        if (dealershipModal.data) {
            dispatch(updateDealershipData(dealerModel, dealershipModal.data));
        } else {
            dispatch(addDealershipData(dealerModel));
        }
        setDealershipModal({ modalOpen: false, data: null });
    }

    const handleDeleteDealership = (data) => {
        dispatch(deleteDealershipData(data));
    }

    useEffect(() => {
        dispatch(getAllDealerships());
    }, [dispatch]);

    return (
        <>
            <Modal title={dealershipModal.data ? 'Perbaharui Dealer' : 'Tambah Dealer'}
                   open={dealershipModal.modalOpen}
                   onOk={() => formDealership.submit()}
                   okText="Simpan"
                   cancelText="Batalkan"
                   onCancel={handleCancelModal}>
                <div className="w-full">
                    <Form
                        name="basic"
                        layout="vertical"
                        form={formDealership}
                        autoComplete="off"
                        onFinish={submitFormDealership}
                    >
                        <Form.Item
                            label="Nama Dealer"
                            name="name"
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
                            label="Photo"
                            name="photo"
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
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>
                        <Divider>Alamat</Divider>
                        <Form.Item
                            label="Provinsi"
                            name="provinces"
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
                            label="Kota/Kabupaten"
                            name="city"
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
                            label="Kecamatan"
                            name="subdistrict"
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
                            label="Desa"
                            name="urbanVillage"
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
                        showDealershipModal(null)
                    }}
                >
                    Tambah Dealer
                </Button>
                <Button
                    type="default"
                    style={{
                        marginLeft: 10,
                    }}
                    onClick={() => {
                        dispatch(getAllDealerships())
                    }} icon={<ReloadOutlined/>}/>

            </div>
            <Table
                columns={DealershipColumns(showDealershipModal, handleDeleteDealership)}
                dataSource={dealership.dealerships}
                loading={dealership.isLoading}
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

export default DealershipPage;