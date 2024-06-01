const motorcycleAction = {
    LOAD_MOTORCYCLE_REQUESTED: '[Motorcycle] Load Motorcycle Requested',
    LOAD_MOTORCYCLE_SUCCESS: '[Motorcycle] Load Motorcycle Success',
    ADD_MOTORCYCLE_REQUESTED: '[Motorcycle] Add Motorcycle Requested',
    ADD_MOTORCYCLE_SUCCESS: '[Motorcycle] Add Motorcycle Success',
    UPDATE_MOTORCYCLE_REQUESTED: '[Motorcycle] Update Motorcycle Requested',
    UPDATE_MOTORCYCLE_SUCCESS: '[Motorcycle] Update Motorcycle Success',
    DELETE_MOTORCYCLE_REQUESTED: '[Motorcycle] Delete Motorcycle Requested',
    DELETE_MOTORCYCLE_SUCCESS: '[Motorcycle] Delete Motorcycle Success',

    loadMotorcycleRequested: () => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_REQUESTED
        }
    },

    loadMotorcycleSuccess: (items) => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_SUCCESS,
            payload: { items }
        }
    },

    addMotorcycleRequested: () => {
        return {
            type: motorcycleAction.ADD_MOTORCYCLE_REQUESTED
        }
    },

    addMotorcycleSuccess: (catalog) => {
        return {
            type: motorcycleAction.ADD_MOTORCYCLE_SUCCESS,
            payload: { item: catalog }
        }
    },

    updateMotorcycleRequested: () => {
        return {
            type: motorcycleAction.UPDATE_MOTORCYCLE_REQUESTED,
        }
    },

    updateMotorcycleSuccess: (catalog) => {
        return {
            type: motorcycleAction.UPDATE_MOTORCYCLE_SUCCESS,
            payload: { item: catalog }
        }
    },

    deleteMotorcycleRequested: () => {
        return {
            type: motorcycleAction.DELETE_MOTORCYCLE_REQUESTED,
        }
    },

    deleteMotorcycleSuccess: (catalog) => {
        return {
            type: motorcycleAction.DELETE_MOTORCYCLE_SUCCESS,
            payload: { item: catalog }
        }
    }

}

export default motorcycleAction;