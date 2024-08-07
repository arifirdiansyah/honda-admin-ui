import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
    addServiceData,
    deleteServiceData,
    findMotorcycleByVinNumber,
    getAllService
} from "../shared/services/serviceService";
import { getAllServicePackage } from "../shared/services/servciePackageService";
import { get } from "lodash";
import ServiceAction from "../redux/service/ServiceAction";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ReloadOutlined } from "@ant-design/icons";
import ServiceColumns from "../shared/helper/ServiceTable";

dayjs.extend(customParseFormat);


export const ServicePage = () => {
    const navigate = useNavigate();
    const [serviceModal, setServiceModal] = useState({ modalOpen: false });
    const [formService] = Form.useForm();
    const dispatch = useDispatch();
    const servicePackages = useSelector(state => state.ServicePackageReducer);
    const serviceSelector = useSelector(state => state.ServiceReducer);
    const [serviceDate, setServiceDate] = useState('');

    useEffect(() => {
        dispatch(getAllServicePackage())
        dispatch(getAllService())
    }, [dispatch]);

    const showServiceModal = () => {
        dispatch({ type: ServiceAction.FIND_MOTORCYCLE_SUCCESS, payload: { item: null } })
        formService.setFieldsValue({
            motorcycleId: '',
            servicePackage: '',
            technician: '',
            mileage: 0,
            description: '',
            totalPrice: 0,
            serviceDate: '',
            replacedParts: [],
            nama: ''
        })
        setServiceModal({ modalOpen: true });
    };

    const handleCancelModal = () => {
        setServiceModal({ modalOpen: false });
        setServiceDate('');
    };

    const submitFormService = (value) => {
        setServiceModal({ modalOpen: false });
        value.replacedParts = servicePackages.servicePackages.find(packages => packages.id === value.servicePackage).parts.map(part => {
            return {
                part: part.id,
                quantity: 1
            }
        });
        value.serviceDate = serviceDate;
        value.motorcycleId = serviceSelector.selectedMotorcycle.id;
        dispatch(addServiceData({ ...value, totalPrice: 0 }));
    }

    const findMotorCycleByVin = (vin) => {
        if (!vin) {
            return;
        }
        dispatch(findMotorcycleByVinNumber(vin));
    }

    const onServiceDateChange = (date, dateString) => {
        setServiceDate(dateString);
    }

    const navigateToServiceDetail = (service) => {
        navigate(`/dealership/service-detail/${service.id}`);
    }


    const handleDeleteService = (service) => {
        dispatch(deleteServiceData(service));
    }

    return (<>
        <Modal title={'Tambah Rekaman Service'}
               open={serviceModal.modalOpen}
               onOk={() => formService.submit()}
               okText="Simpan"
               cancelText="Batalkan"
               onCancel={handleCancelModal}>
            <div className="w-full">
                <Form
                    name="basic"
                    layout="vertical"
                    form={formService}
                    autoComplete="off"
                    onFinish={submitFormService}
                >
                    <Form.Item
                        label="Plat Nomor Kendaraan"
                        name="motorcycleId"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Search placeholder="Plat Nomor" size="large" onSearch={findMotorCycleByVin} enterButton/>
                    </Form.Item>

                    <Form.Item
                        label="Paket Service"
                        name="servicePackage"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Select size="large" placeholder="Pilih katalog"
                                showSearch
                                disabled={!get(serviceSelector, 'selectedMotorcycle')}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={servicePackages.servicePackages.map((servicePackage, key) => {
                                    return {
                                        key: key,
                                        value: servicePackage.id,
                                        label: servicePackage.packageName,
                                    }
                                })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Nama Teknisi"
                        name="technician"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large" disabled={!serviceSelector.selectedMotorcycle}/>
                    </Form.Item>

                    <Form.Item
                        label="Nama Pemilik"
                        name="nama"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large" disabled={!serviceSelector.selectedMotorcycle}/>
                    </Form.Item>

                    <div className="flex justify-between w-full">
                        <Form.Item
                            label="Kilometer"
                            name="mileage"
                            rules={[{
                                required: true, message: 'Tidak boleh kosong!',
                            },]}
                        >
                            <InputNumber min={0} size="large" disabled={!serviceSelector.selectedMotorcycle}/>
                        </Form.Item>

                        <Form.Item
                            label="Tanggal Service"
                            name="serviceDate"
                            rules={[{
                                required: true, message: 'Tidak boleh kosong!',
                            },]}
                        >
                            <DatePicker size="large" disabled={!serviceSelector.selectedMotorcycle}
                                        onChange={onServiceDateChange}/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Keterangan"
                        name="description"
                    >
                        <TextArea size="large" disabled={!serviceSelector.selectedMotorcycle}/>
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
                    showServiceModal()
                }}
            >
                Mulai Service
            </Button>
            <Button
                type="default"
                style={{
                    marginLeft: 10,
                }}
                onClick={() => {
                    dispatch(getAllService())
                }} icon={<ReloadOutlined/>}/>
        </div>
        <Table
            columns={ServiceColumns(navigateToServiceDetail, handleDeleteService)}
            dataSource={serviceSelector.services}
            loading={serviceSelector.isLoading}
            pagination={{
                pageSize: 50,
            }}
            scroll={{
                y: 1000,
            }}
        />
    </>)
}