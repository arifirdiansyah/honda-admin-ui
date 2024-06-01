import axios from "axios";
import { message } from 'antd';
import UserAction from "../../redux/user/UserAction";

export function getAllUsers() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: UserAction.LOAD_USER_REQUESTED });
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);

            dispatch({
                type: UserAction.LOAD_USER_SUCCESS, payload: {
                    items: response.data.map((item, key) => {
                        item.key = key;
                        return item
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data pengguna");
        }
    }
}

export function addCatalogData(catalog) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: UserAction.ADD_USER_REQUESTED })
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/catalog/add`, catalog);
            dispatch({ type: UserAction.ADD_USER_SUCCESS, payload: { item: response.data } })
            message.success("Katalog berhasil ditambah");
        } catch ( error ) {
            message.error("Gagal menambah pengguna");
        }
    }
}

export function updateCatalogData(newCatalogData, catalog) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: UserAction.UPDATE_USER_REQUESTED })
            await axios.put(`${process.env.REACT_APP_API_URL}/catalog/update/${catalog.id}`, newCatalogData);
            const updatedCatalog = {
                ...catalog,
                ...newCatalogData
            }
            dispatch({ type: UserAction.UPDATE_USER_SUCCESS, payload: { item: updatedCatalog } });
            message.success("Katalog berhasil diubah");
        } catch ( error ) {
            message.error("Gagal mengubah pengguna");
        }
    }
}

export function deleteCatalogData(catalog) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: UserAction.DELETE_USER_REQUESTED })
            await axios.delete(`${process.env.REACT_APP_API_URL}/catalog/${catalog.id}`);
            dispatch({ type: UserAction.DELETE_USER_SUCCESS, payload: { item: catalog } })
            message.success("Katalog berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus pengguna");
        }
    }
}

