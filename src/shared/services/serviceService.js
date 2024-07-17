import { message } from "antd";
import axiosHttp from "../../axiosHandler";
import ServiceAction from "../../redux/service/ServiceAction";

export function getAllService() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServiceAction.LOAD_SERVICE_REQUESTED })
            const service = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/services`);

            dispatch({
                type: ServiceAction.LOAD_SERVICE_SUCCESS, payload: {
                    items: service.data.map((item) => {
                        item.key = item.id;
                        return item
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data service");
        }
    }
}

export function addServiceData(service) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServiceAction.ADD_SERVICE_REQUESTED })
            const response = await axiosHttp.post(`${process.env.REACT_APP_API_URL}/service/add`, service);
            dispatch({ type: ServiceAction.ADD_SERVICE_SUCCESS, payload: { item: response.data } })
            message.success("Service berhasil ditambah");
        } catch ( error ) {
            message.error("Gagal menambah data service");
        }
    }
}

export function updateServiceData(newService) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServiceAction.UPDATE_SERVICE_REQUESTED })
            await axiosHttp.put(`${process.env.REACT_APP_API_URL}/service/update/${newService.id}`, newService);
            dispatch({ type: ServiceAction.UPDATE_SERVICE_SUCCESS });
            message.success("Service berhasil diubah");
        } catch ( error ) {
            message.error("Gagal mengubah service");
        }
    }
}

export function deleteServiceData(service) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServiceAction.DELETE_SERVICE_REQUESTED })
            await axiosHttp.delete(`${process.env.REACT_APP_API_URL}/service/${service.id}`);
            dispatch({ type: ServiceAction.DELETE_SERVICE_SUCCESS, payload: { item: service } })
            message.success("Service berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus service");
        }
    }
}

export function getServiceDataById(serviceId) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServiceAction.FIND_SERVICE_BY_ID_REQUESTED })
            const response = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/service/${serviceId}`);
            const data = response.data;
            data.replacedParts = data.replacedParts.map((part) => {
                part.key = part.id;
                return part;
            });
            dispatch({ type: ServiceAction.FIND_SERVICE_BY_ID_SUCCESS, payload: { item: data } })
        } catch ( error ) {
            message.error("Gagal memuat data service");
        }
    }
}

export function findMotorcycleByVinNumber(vin) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServiceAction.FIND_MOTORCYCLE_REQUESTED })
            const response = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/motorcycle/vin/${vin}`);
            dispatch({ type: ServiceAction.FIND_MOTORCYCLE_SUCCESS, payload: { item: response.data } })
        } catch ( error ) {
            message.error("Gagal menemukan kendaraan");
        }
    }
}