const dealershipAction = {
    LOAD_DEALERSHIP_REQUESTED: '[Dealership] Load Dealership Requested',
    LOAD_DEALERSHIP_SUCCESS: '[Dealership] Load Dealership Success',
    ADD_DEALERSHIP_REQUESTED: '[Dealership] Add Dealership Requested',
    ADD_DEALERSHIP_SUCCESS: '[Dealership] Add Dealership Success',
    UPDATE_DEALERSHIP_REQUESTED: '[Dealership] Update Dealership Requested',
    UPDATE_DEALERSHIP_SUCCESS: '[Dealership] Update Dealership Success',
    DELETE_DEALERSHIP_REQUESTED: '[Dealership] Delete Dealership Requested',
    DELETE_DEALERSHIP_SUCCESS: '[Dealership] Delete Dealership Success',

    loadDealershipRequested: () => {
        return {
            type: dealershipAction.LOAD_DEALERSHIP_REQUESTED
        }
    },

    loadDealershipSuccess: (items) => {
        return {
            type: dealershipAction.LOAD_DEALERSHIP_SUCCESS,
            payload: { items }
        }
    },

    addDealershipRequested: () => {
        return {
            type: dealershipAction.ADD_DEALERSHIP_REQUESTED
        }
    },

    addDealershipSuccess: (dealership) => {
        return {
            type: dealershipAction.ADD_DEALERSHIP_SUCCESS,
            payload: { item: dealership }
        }
    },

    updateDealershipRequested: () => {
        return {
            type: dealershipAction.UPDATE_DEALERSHIP_REQUESTED,
        }
    },

    updateDealershipSuccess: (dealership) => {
        return {
            type: dealershipAction.UPDATE_DEALERSHIP_SUCCESS,
            payload: { item: dealership }
        }
    },

    deleteDealershipRequested: () => {
        return {
            type: dealershipAction.DELETE_DEALERSHIP_REQUESTED,
        }
    },

    deleteDealershipSuccess: (dealership) => {
        return {
            type: dealershipAction.DELETE_DEALERSHIP_SUCCESS,
            payload: { item: dealership }
        }
    }

}

export default dealershipAction;
