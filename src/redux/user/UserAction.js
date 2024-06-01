const userAction = {
    LOAD_USER_REQUESTED: '[User] Load User Requested',
    LOAD_USER_SUCCESS: '[User] Load User Success',
    ADD_USER_REQUESTED: '[User] Add User Requested',
    ADD_USER_SUCCESS: '[User] Add User Success',
    UPDATE_USER_REQUESTED: '[User] Update User Requested',
    UPDATE_USER_SUCCESS: '[User] Update User Success',
    DELETE_USER_REQUESTED: '[User] Delete User Requested',
    DELETE_USER_SUCCESS: '[User] Delete User Success',

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

    addUserRequested: () => {
        return {
            type: userAction.ADD_USER_REQUESTED
        }
    },

    addUserSuccess: (user) => {
        return {
            type: userAction.ADD_USER_SUCCESS,
            payload: { item: user }
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
    },

    deleteUserRequested: () => {
        return {
            type: userAction.DELETE_USER_REQUESTED,
        }
    },

    deleteUserSuccess: (user) => {
        return {
            type: userAction.DELETE_USER_SUCCESS,
            payload: { item: user }
        }
    }

}

export default userAction;