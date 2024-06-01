import axios from "axios";
import { message } from "antd";
import MotorcycleAction from "../../redux/motorcycle/MotorcycleAction";

export function getAllMotorcycle() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.LOAD_MOTORCYCLE_REQUESTED })
            const catalogs = await axios.get(`${process.env.REACT_APP_API_URL}/motorcycles`);

            dispatch({
                type: MotorcycleAction.LOAD_MOTORCYCLE_SUCCESS, payload: {
                    items: catalogs.data.map((item) => {
                        item.key = item.id;
                        return item
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data kendaraan");
        }
    }
}

export function addMotorcycleData(motorcycle) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.ADD_MOTORCYCLE_REQUESTED })
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/motorcycle/add`, motorcycle);
            dispatch({ type: MotorcycleAction.ADD_MOTORCYCLE_SUCCESS, payload: { item: response.data } })
            message.success("Kendaraan berhasil ditambah");
        } catch ( error ) {
            message.error("Gagal menambah data kendaraan");
        }
    }
}

export function updateMotorcycleData(newMotorcycleData, motorcycle) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.UPDATE_MOTORCYCLE_REQUESTED })
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/motorcycle/update/${motorcycle.id}`, newMotorcycleData);
            dispatch({ type: MotorcycleAction.UPDATE_MOTORCYCLE_SUCCESS, payload: { item: response.data } });
            message.success("Kendaraan berhasil diubah");
        } catch ( error ) {
            message.error("Gagal mengubah kendaraan");
        }
    }
}

export function deleteMotorcycleData(motorcycle) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.DELETE_MOTORCYCLE_REQUESTED })
            await axios.delete(`${process.env.REACT_APP_API_URL}/motorcycle/${motorcycle.id}`);
            dispatch({ type: MotorcycleAction.DELETE_MOTORCYCLE_SUCCESS, payload: { item: motorcycle } })
            message.success("Kendaraan berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus kendaraan");
        }
    }
}