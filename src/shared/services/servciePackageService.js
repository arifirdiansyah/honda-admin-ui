import { message } from "antd";
import axiosHttp from "../../axiosHandler";
import ServicePackageAction from "../../redux/service-package/ServicePackageAction";

export function getAllServicePackage() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServicePackageAction.LOAD_SERVICE_PACKAGE_REQUESTED })
            const servicePackage = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/servicePackages`);

            dispatch({
                type: ServicePackageAction.LOAD_SERVICE_PACKAGE_SUCCESS, payload: {
                    items: servicePackage.data.map((item) => {
                        item.key = item.id;
                        return item
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data paket service");
        }
    }
}

export function addServicePackageData(part) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServicePackageAction.ADD_SERVICE_PACKAGE_REQUESTED })
            const response = await axiosHttp.post(`${process.env.REACT_APP_API_URL}/servicePackage/add`, part);
            dispatch({ type: ServicePackageAction.ADD_SERVICE_PACKAGE_SUCCESS, payload: { item: response.data } })
            message.success("Paket service berhasil ditambah");
        } catch ( error ) {
            message.error("Gagal menambah data paket service");
        }
    }
}

export function updateServicePackageData(newServicePackage, servicePackage) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServicePackageAction.UPDATE_SERVICE_PACKAGE_REQUESTED })
            const response = await axiosHttp.put(`${process.env.REACT_APP_API_URL}/servicePackage/update/${servicePackage.id}`, newServicePackage);
            dispatch({ type: ServicePackageAction.UPDATE_SERVICE_PACKAGE_SUCCESS, payload: { item:  response.data } });
            message.success("Paket service berhasil diubah");
        } catch ( error ) {
            message.error("Gagal mengubah paket service");
        }
    }
}

export function deleteServicePackageData(servicePackage) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ServicePackageAction.DELETE_SERVICE_PACKAGE_REQUESTED })
            await axiosHttp.delete(`${process.env.REACT_APP_API_URL}/servicePackage/${servicePackage.id}`);
            dispatch({ type: ServicePackageAction.DELETE_SERVICE_PACKAGE_SUCCESS, payload: { item: servicePackage } })
            message.success("Paket service berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus paket service");
        }
    }
}