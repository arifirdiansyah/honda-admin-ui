import axios from "axios";
import { message } from "antd";
import PartAction from "../../redux/part/PartAction";

export function getAllPart() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PartAction.LOAD_PART_REQUESTED })
            const catalogs = await axios.get(`${process.env.REACT_APP_API_URL}/parts`);

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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/part/add`, part);
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
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/part/update/${part.id}`, newPartData);
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/part/${part.id}`);
            dispatch({ type: PartAction.DELETE_PART_SUCCESS, payload: { item: part } })
            message.success("Suku cadang berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus suku cadang");
        }
    }
}