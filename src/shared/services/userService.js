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

export function updateUserData(newUserData, user) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: UserAction.UPDATE_USER_REQUESTED })
            await axios.put(`${process.env.REACT_APP_API_URL}/user/update/${user.id}`, newUserData);
            const updatedUser = {
                ...user,
                ...newUserData
            }
            dispatch({ type: UserAction.UPDATE_USER_SUCCESS, payload: { item: updatedUser } });
            message.success("Katalog berhasil diubah");
        } catch ( error ) {
            message.error("Gagal mengubah pengguna");
        }
    }
}
