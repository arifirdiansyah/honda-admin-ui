import axios from "axios";
import { message } from 'antd';
import DealershipAction from "../../redux/dealership/DealershipAction";

export function getAllDealerships() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: DealershipAction.LOAD_DEALERSHIP_REQUESTED });
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/dealerships`);

            dispatch({
                type: DealershipAction.LOAD_DEALERSHIP_SUCCESS, payload: {
                    items: response.data.map((item, key) => {
                        item.key = key;
                        return item;
                    })
                }
            });
        } catch (error) {
            message.error("Gagal memuat data dealer");
        }
    }
}

export function addDealershipData(dealership) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: DealershipAction.ADD_DEALERSHIP_REQUESTED });
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/dealership/add`, dealership);
            dispatch({ type: DealershipAction.ADD_DEALERSHIP_SUCCESS, payload: { item: response.data } });
            message.success("Dealer berhasil ditambah");
        } catch (error) {
            message.error("Gagal menambah dealer");
        }
    }
}

export function updateDealershipData(newDealershipData, dealership) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: DealershipAction.UPDATE_DEALERSHIP_REQUESTED });
            await axios.put(`${process.env.REACT_APP_API_URL}/dealership/update/${dealership.id}`, newDealershipData);
            const updatedDealership = {
                ...dealership,
                ...newDealershipData
            };
            dispatch({ type: DealershipAction.UPDATE_DEALERSHIP_SUCCESS, payload: { item: updatedDealership } });
            message.success("Dealer berhasil diubah");
        } catch (error) {
            message.error("Gagal mengubah dealer");
        }
    }
}

export function deleteDealershipData(dealership) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: DealershipAction.DELETE_DEALERSHIP_REQUESTED });
            await axios.delete(`${process.env.REACT_APP_API_URL}/dealership/${dealership.id}`);
            dispatch({ type: DealershipAction.DELETE_DEALERSHIP_SUCCESS, payload: { item: dealership } });
            message.success("Dealer berhasil dihapus");
        } catch (error) {
            message.error("Gagal menghapus dealer");
        }
    }
}
