import { message } from "antd";
import PartAction from "../../redux/part/PartAction";
import axiosHttp from "../../axiosHandler";

export function getAllPart() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PartAction.LOAD_PART_REQUESTED })
            const catalogs = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/parts`);

            dispatch({
                type: PartAction.LOAD_PART_SUCCESS, payload: {
                    items: catalogs.data.map((item) => {
                        item.key = item.id;
                        return item
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data suku cadang");
        }
    }
}

export function addPartData(part) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PartAction.ADD_PART_REQUESTED })
            const response = await axiosHttp.post(`${process.env.REACT_APP_API_URL}/part/add`, part);
            dispatch({ type: PartAction.ADD_PART_SUCCESS, payload: { item: response.data } })
            message.success("Suku cadang berhasil ditambah");
        } catch ( error ) {
            message.error("Gagal menambah data suku cadang");
        }
    }
}

export function updatePartData(newPartData, part) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PartAction.UPDATE_PART_REQUESTED })
            const response = await axiosHttp.put(`${process.env.REACT_APP_API_URL}/part/update/${part.id}`, newPartData);
            dispatch({ type: PartAction.UPDATE_PART_SUCCESS, payload: { item: response.data } });
            message.success("Suku cadang berhasil diubah");
        } catch ( error ) {
            message.error("Gagal mengubah suku cadang");
        }
    }
}

export function deletePartData(part) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PartAction.DELETE_PART_REQUESTED })
            await axiosHttp.delete(`${process.env.REACT_APP_API_URL}/part/${part.id}`);
            dispatch({ type: PartAction.DELETE_PART_SUCCESS, payload: { item: part } })
            message.success("Suku cadang berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus suku cadang");
        }
    }
}