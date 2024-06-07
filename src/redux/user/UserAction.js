const userAction = {
    LOAD_USER_REQUESTED: '[User] Load User Requested',
    LOAD_USER_SUCCESS: '[User] Load User Success',
    UPDATE_USER_REQUESTED: '[User] Update User Requested',
    UPDATE_USER_SUCCESS: '[User] Update User Success',

    loadUserRequested: () => {
        return {
            type: userAction.LOAD_USER_REQUESTED
        }
    },

    loadUserSuccess: (items) => {
        return {
            type: userAction.LOAD_USER_SUCCESS,
            payload: { items }
        }
    },

    updateUserRequested: () => {
        return {
            type: userAction.UPDATE_USER_REQUESTED,
        }
    },

    updateUserSuccess: (user) => {
        return {
            type: userAction.UPDATE_USER_SUCCESS,
            payload: { item: user }
        }
    }
}

export default userAction;