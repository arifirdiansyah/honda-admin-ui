import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getServiceDataById, updateServiceData } from "../shared/services/serviceService";
import { useNavigate, useParams } from "react-router-dom";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import ServiceDetailColumns from "../shared/helper/ServiceDetailTable";
import { get } from "lodash";
import dayjs from 'dayjs';
import TextArea from "antd/es/input/TextArea";
import { getAllServicePackage } from "../shared/services/servciePackageService";
import ServiceAction from "../redux/service/ServiceAction";
import { getAllPart } from "../shared/services/partService";

const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
};

export const ServiceDetailsPage = () => {
    const dispatch = useDispatch();
    let params = useParams();
    const navigate = useNavigate();
    const serviceSelector = useSelector(state => state.ServiceReducer);
    const partSelector = useSelector(state => state.PartReducer);
    const [serviceModal, setServiceModal] = useState({ modalOpen: false });
    const [addPartModal, setAddPartModal] = useState({ modalOpen: false });
    const servicePackages = useSelector(state => state.ServicePackageReducer);
    const [formService] = Form.useForm();
    const [formAddPart] = Form.useForm();
    const [serviceDate, setServiceDate] = useState('');
    const dateFormat = 'YYYY-MM-DD';

    useEffect(() => {
        dispatch(getAllServicePackage());
        dispatch(getServiceDataById(params.serviceId));
    }, [params, dispatch]);

    const showServiceModal = () => {
        formService.setFieldsValue({
            servicePackage: get(serviceSelector.serviceDetail, 'servicePackage.id', ''),
            technician: get(serviceSelector.serviceDetail, 'technician', ''),
            serviceDate: dayjs(get(serviceSelector.serviceDetail, 'serviceDate'), dateFormat),
            mileage: get(serviceSelector.serviceDetail, 'mileage', ''),
            description: get(serviceSelector.serviceDetail, 'description', ''),
            fee: get(serviceSelector.serviceDetail, 'fee', ''),
            nama: get(serviceSelector.serviceDetail, 'nama', '')
        });
        setServiceModal({ modalOpen: true });
    };

    const showAddPartModal = () => {
        dispatch(getAllPart());
        formAddPart.setFieldsValue({
            part: ''
        });
        setAddPartModal({ modalOpen: true });
    };

    const cancelAddPartModal = () => {
        setAddPartModal({ modalOpen: false });
    };

    const addPartToList = (value) => {
        dispatch({ type: ServiceAction.ADD_PART_TO_SERVICE_DETAIL_REQUESTED, payload: {} });

        setTimeout(() => {
            const addedPart = partSelector.parts.find(part => part.id === value.part);
            let replacedPart = serviceSelector.serviceDetail.replacedParts;
            const isPartExist = replacedPart.find(partList => partList.part.id === addedPart.id);

            if (!isPartExist) {
                addedPart.key = addedPart.id;
                replacedPart.push({ part: addedPart, quantity: 1 });
            } else {
                replacedPart = replacedPart.map(partList => {
                    if (partList.part.id === value.part) {
                        partList.quantity += 1;
                    }
                    return partList;
                });
            }

            dispatch({ type: ServiceAction.ADD_PART_TO_SERVICE_DETAIL_SUCCESS, payload: { item: replacedPart } });
            setAddPartModal({ modalOpen: false });
        }, 100);
    };

    const handleCancelModal = () => {
        setServiceModal({ modalOpen: false });
        setServiceDate('');
    };

    const submitFormService = (value) => {
        console.log(value);
        setServiceModal({ modalOpen: false });
        value.serviceDate = serviceDate ? serviceDate : get(serviceSelector.serviceDetail, 'serviceDate');
        value.servicePackage = servicePackages.servicePackages.find(sp => sp.id === value.servicePackage);
        dispatch({ type: ServiceAction.SET_CURRENT_SERVICE_DETAIL, payload: { item: value } });
    };

    const onServiceDateChange = (date, dateString) => {
        setServiceDate(dateString);
    };

    const handleDeletePart = (deletedPart) => {
        dispatch({ type: ServiceAction.ADD_PART_TO_SERVICE_DETAIL_REQUESTED });

        setTimeout(() => {
            const parts = serviceSelector.serviceDetail.replacedParts.filter(partList => partList.part.id !== deletedPart.part.id);

            dispatch({ type: ServiceAction.ADD_PART_TO_SERVICE_DETAIL_SUCCESS, payload: { item: parts } });
            setAddPartModal({ modalOpen: false });
        }, 100);
    };

    const saveServiceData = () => {
        const replacedParts = serviceSelector.serviceDetail.replacedParts.map(partList => {
            return {
                ...partList,
                part: partList.part.id,
            };
        });
        const servicePackageId = serviceSelector.serviceDetail.servicePackage.id;
        const motorcycleId = serviceSelector.serviceDetail.motorcycleId.id;
        const serviceData = {
            ...serviceSelector.serviceDetail,
            replacedParts: replacedParts,
            servicePackage: servicePackageId,
            motorcycleId: motorcycleId,
            totalPrice: countTotalPrice()
        };
        dispatch(updateServiceData(serviceData));
    };

    const backToServiceList = () => {
        navigate('/dealership/service');
    };

    const countTotalPrice = () => {
        let total = 0;

        get(serviceSelector.serviceDetail, 'replacedParts', []).forEach(partList => {
            total += Number(partList.quantity) * Number(partList.part.price);
        });
        total += Number(get(serviceSelector.serviceDetail, 'fee', 0));

        return Number(total).toFixed(0);
    };

    return (
        <>
            <Modal title={'Perbaharui Data Service'}
                   open={serviceModal.modalOpen}
                   onOk={() => formService.submit()}
                   okText="Simpan"
                   cancelText="Batalkan"
                   onCancel={handleCancelModal}>
                <div className="w-full">
                    <Form
                        name="updateDetail"
                        layout="vertical"
                        form={formService}
                        autoComplete="off"
                        onFinish={submitFormService}
                    >
                        <Form.Item
                            label="Paket Service"
                            name="servicePackage"
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
                                    options={servicePackages.servicePackages.map((servicePackage, key) => {
                                        return {
                                            key: key,
                                            value: servicePackage.id,
                                            label: servicePackage.packageName,
                                        };
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
                            <Input size="large"/>
                        </Form.Item>

                        <Form.Item
                        label="Nama Pemilik"
                        name="nama"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Input size="large"/>
                    </Form.Item>

                        <div className="flex justify-between w-full">
                            <Form.Item
                                label="Kilometer"
                                name="mileage"
                                rules={[{
                                    required: true, message: 'Tidak boleh kosong!',
                                },]}
                            >
                                <InputNumber min={0} size="large"/>
                            </Form.Item>

                            <Form.Item
                                label="Biaya Jasa"
                                name="fee"
                                rules={[{
                                    required: true, message: 'Tidak boleh kosong!',
                                },]}
                            >
                                <Input size="large" type="number"/>
                            </Form.Item>

                            <Form.Item
                                label="Tanggal Service"
                                name="serviceDate"
                                rules={[{
                                    required: true, message: 'Tidak boleh kosong!',
                                },]}
                            >
                                <DatePicker size="large" onChange={onServiceDateChange}/>
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Keterangan"
                            name="description"
                        >
                            <TextArea size="large"/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal title={'Tambah Suku Cadang'}
                   open={addPartModal.modalOpen}
                   onOk={() => formAddPart.submit()}
                   okText="Simpan"
                   cancelText="Batalkan"
                   onCancel={cancelAddPartModal}>
                <div className="w-full">
                    <Form
                        name="partForm"
                        layout="vertical"
                        form={formAddPart}
                        autoComplete="off"
                        onFinish={addPartToList}
                    >
                        <Form.Item
                            label="Suku Cadang"
                            name="part"
                            rules={[{
                                required: true, message: 'Tidak boleh kosong!',
                            },]}
                        >
                            <Select size="large" placeholder="Pilih suku cadang"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={partSelector.parts.map((part, key) => {
                                        return {
                                            key: key,
                                            value: part.id,
                                            label: part.partName,
                                        };
                                    })}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div className="flex flex-col justify-between h-full w-full">
                <div className="flex flex-col">
                    <div className="flex w-full justify-start">
                        <div className="flex w-full gap-10">
                            <div className="felx flex-col w-2/12 sm:w-1/3">
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Plat Nomor</span>
                                    <span>{get(serviceSelector.serviceDetail, 'motorcycleId.vin', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Nama Pemilik</span>
                                    <span>{get(serviceSelector.serviceDetail, 'nama', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Jenis Kendaraan</span>
                                    <span>{get(serviceSelector.serviceDetail, 'motorcycleId.catalogId.modelName', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Transmisi</span>
                                    <span
                                        className="justify-self-start">{get(serviceSelector.serviceDetail, 'motorcycleId.catalogId.transmission', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Tahun Perakitan</span>
                                    <span
                                        className="justify-self-start">{get(serviceSelector.serviceDetail, 'motorcycleId.buildDate', '')}</span>
                                </div>
                            </div>
                            <div className="felx flex-col w-2/12 sm:w-1/3">
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Paket Service</span>
                                    <span>{get(serviceSelector.serviceDetail, 'servicePackage.packageName', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Nama Teknisi</span>
                                    <span>{get(serviceSelector.serviceDetail, 'technician', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Tanggal Service</span>
                                    <span>{get(serviceSelector.serviceDetail, 'serviceDate', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Kilometer (KM)</span>
                                    <span>{get(serviceSelector.serviceDetail, 'mileage', '')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold flex-grow">Biaya Jasa (Rp.)</span>
                                    <span>{formatRupiah(get(serviceSelector.serviceDetail, 'fee', 0))}</span>
                                </div>
                            </div>
                            <div>
                                <Button type="primary" ghost onClick={showServiceModal}>Ubah</Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Table
                            columns={ServiceDetailColumns(handleDeletePart)}
                            dataSource={serviceSelector.isLoading ? [] : get(serviceSelector.serviceDetail, 'replacedParts', [])}
                            loading={serviceSelector.isLoading}
                            pagination={false}
                        />
                        <Button type="primary" className="mt-5" onClick={showAddPartModal}>Tambah Suku Cadang</Button>
                    </div>
                </div>
                <div className="h-16 bg-gray-200 flex justify-between items-center px-10 mt-5">
                    <div className="">
                        <span className="text-xl font-bold mr-5">Total Harga:</span>
                        <span className="text-2xl font-bold">{formatRupiah(countTotalPrice())}</span>
                    </div>
                    <div>
                        <Button danger size="large" className="mr-5" onClick={backToServiceList}>Batalkan</Button>
                        <Button type="primary" size="large" onClick={saveServiceData}>Simpan</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
