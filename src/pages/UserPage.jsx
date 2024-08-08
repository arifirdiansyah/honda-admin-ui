import UserColumns from "../shared/helper/UserTable";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    getAllUsers,
    updateUserData
} from "../shared/services/userService";
import { ReloadOutlined } from "@ant-design/icons";
import { getAllDealerships } from "../shared/services/dealershipService";

const UserPage = () => {
    const dispatch = useDispatch();
    const [formUser] = Form.useForm();
    const user = useSelector(state => state.UserReducer);
    const dealership = useSelector(state => state.DealershipReducer);
    const [userModal, setUserModal] = useState({ modalOpen: false, data: null });
    const [selectedRole, setSelectedRole] = useState(null);

    const showUserModal = (userData) => {
        formUser.setFieldsValue({
            name: userData ? userData.name : '',
            email: userData ? userData.email : '',
            picture: userData ? userData.picture : '',
            role: userData ? userData.role : '',
            status: userData ? userData.status : '',
            phoneNumber: userData ? userData.phoneNumber : '', // Set nomor HP
            address: userData ? userData.address : '', // Set alamat
        });
        setUserModal({ modalOpen: true, data: userData });
        setSelectedRole(userData ? userData.role : null); // Set role yang dipilih
    };

    const handleCancelModal = () => {
        setUserModal({ modalOpen: false, data: null });
        setSelectedRole(null);
    };

    const submitFormUser = (value) => {
        if (userModal.data) {
            if (selectedRole !== 'DEALER_ADMIN') {
                value.dealer = null;
            }
            if (selectedRole !== 'CUSTOMER') {
                value.phoneNumber = null;
                value.address = null;
            }
            dispatch(updateUserData(value, userModal.data));
            setUserModal({ modalOpen: false, data: null });
        }
    };

    const roleSelected = (value) => {
        setSelectedRole(value);
    };

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllDealerships());
    }, [dispatch]);

    return (
        <>
            <Modal title={userModal.data ? 'Perbaharui Pengguna' : 'Tambah Pengguna'}
                   open={userModal.modalOpen}
                   onOk={() => formUser.submit()}
                   okText="Simpan"
                   cancelText="Batalkan"
                   onCancel={handleCancelModal}>
                <div className="w-full">
                    <Form
                        name="basic"
                        layout="vertical"
                        form={formUser}
                        autoComplete="off"
                        onFinish={submitFormUser}
                    >
                        <Form.Item
                            label="Nama Pengguna"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Surel"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Input size="large" disabled />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tidak boleh kosong!',
                                },
                            ]}
                        >
                            <Select size="large" onSelect={roleSelected}>
                                <Select.Option value="SUPER_ADMIN">Super Admin</Select.Option>
                                <Select.Option value="DEALER_ADMIN">Dealer Admin</Select.Option>
                                <Select.Option value="CUSTOMER">Customer</Select.Option>
                            </Select>
                        </Form.Item>

                        {selectedRole === 'CUSTOMER' && (
                            <>
                                <Form.Item
                                    label="Nomor HP"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tidak boleh kosong!',
                                        },
                                    ]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    label="Alamat"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tidak boleh kosong!',
                                        },
                                    ]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item
                            shouldUpdate={true}
                            label="Dealer (Untuk Admin Dealer)"
                            name="dealer"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <Select size="large" placeholder="Pilih Dealer"
                                    showSearch
                                    disabled={selectedRole !== 'DEALER_ADMIN'}
                                    optionFilterProp="children"
                                    allowClear
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={dealership.dealerships.map((dealer, key) => {
                                        return {
                                            key: key,
                                            value: dealer.id,
                                            label: dealer.name,
                                        };
                                    })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Foto Pengguna"
                            name="picture"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div style={{
                marginBottom: 16,
            }}>
                <Button
                    type="default"
                    style={{
                        marginLeft: 10,
                    }}
                    onClick={() => {
                        dispatch(getAllUsers());
                    }} icon={<ReloadOutlined />} />
            </div>
            <Table
                columns={UserColumns(showUserModal)}
                dataSource={user.users}
                loading={user.isLoading}
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

export default UserPage;
