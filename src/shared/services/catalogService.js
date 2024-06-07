import axios from "axios";
import CatalogAction from "../../redux/catalog/CatalogAction";
import { message } from 'antd';

export function getAllCatalogs() {
    return async (dispatch, getState) => {
        try {
            console.log(`${process.env.REACT_APP_API_URL}/catalogs`);
            dispatch({ type: CatalogAction.LOAD_CATALOG_REQUESTED })
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/catalogs`);

            dispatch({
                type: CatalogAction.LOAD_CATALOG_SUCCESS, payload: {
                    items: response.data.map((item, key) => {
                        item.key = key;
                        return item
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data katalog");
        }
    }
}

export function addCatalogData(catalog) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CatalogAction.ADD_CATALOG_REQUESTED })
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/catalog/add`, catalog);
            dispatch({ type: CatalogAction.ADD_CATALOG_SUCCESS, payload: { item: response.data } })
            message.success("Katalog berhasil ditambah");
        } catch ( error ) {
            message.error("Gagal menambah katalog");
        }
    }
}

export function updateCatalogData(newCatalogData, catalog) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CatalogAction.UPDATE_CATALOG_REQUESTED })
            await axios.put(`${process.env.REACT_APP_API_URL}/catalog/update/${catalog.id}`, newCatalogData);
            const updatedCatalog = {
                ...catalog,
                ...newCatalogData
            }
            dispatch({ type: CatalogAction.UPDATE_CATALOG_SUCCESS, payload: { item: updatedCatalog } });
            message.success("Katalog berhasil diubah");
        } catch ( error ) {
            message.error("Gagal mengubah katalog");
        }
    }
}

export function deleteCatalogData(catalog) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CatalogAction.DELETE_CATALOG_REQUESTED })
            await axios.delete(`${process.env.REACT_APP_API_URL}/catalog/${catalog.id}`);
            dispatch({ type: CatalogAction.DELETE_CATALOG_SUCCESS, payload: { item: catalog } })
            message.success("Katalog berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus katalog");
        }
    }
}

