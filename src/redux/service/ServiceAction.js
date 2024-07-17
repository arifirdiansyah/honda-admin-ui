const serviceAction = {
    LOAD_SERVICE_REQUESTED: '[Service] Load Service Requested',
    LOAD_SERVICE_SUCCESS: '[Service] Load Service Success',
    FIND_SERVICE_BY_ID_REQUESTED: '[Service] Find Service By ID Requested',
    FIND_SERVICE_BY_ID_SUCCESS: '[Service] Find Service By ID Success',
    ADD_SERVICE_REQUESTED: '[Service] Add Service Requested',
    ADD_SERVICE_SUCCESS: '[Service] Add Service Success',
    UPDATE_SERVICE_REQUESTED: '[Service] Update Service Requested',
    UPDATE_SERVICE_SUCCESS: '[Service] Update Service Success',
    DELETE_SERVICE_REQUESTED: '[Service] Delete Service Requested',
    DELETE_SERVICE_SUCCESS: '[Service] Delete Service Success',
    FIND_MOTORCYCLE_REQUESTED: '[Service] Find Motorcycle Requested',
    FIND_MOTORCYCLE_SUCCESS: '[Service] Find Motorcycle Success',
    SET_CURRENT_SERVICE_DETAIL: '[Service] Update Service Detail',
    ADD_PART_TO_SERVICE_DETAIL_REQUESTED: '[Service] Add Part To Service Detail Requested',
    ADD_PART_TO_SERVICE_DETAIL_SUCCESS: '[Service] Add Part To Service Detail Success',

    loadServiceRequested: () => {
        return {
            type: serviceAction.LOAD_SERVICE_REQUESTED
        }
    },

    loadServiceSuccess: (items) => {
        return {
            type: serviceAction.LOAD_SERVICE_SUCCESS,
            payload: { items }
        }
    },

    addServiceRequested: () => {
        return {
            type: serviceAction.ADD_SERVICE_REQUESTED
        }
    },

    addServiceSuccess: (catalog) => {
        return {
            type: serviceAction.ADD_SERVICE_SUCCESS,
            payload: { item: catalog }
        }
    },

    updateServiceRequested: () => {
        return {
            type: serviceAction.UPDATE_SERVICE_REQUESTED,
        }
    },

    updateServiceSuccess: () => {
        return {
            type: serviceAction.UPDATE_SERVICE_SUCCESS,
        }
    },

    deleteServiceRequested: () => {
        return {
            type: serviceAction.DELETE_SERVICE_REQUESTED,
        }
    },

    deleteServiceSuccess: (catalog) => {
        return {
            type: serviceAction.DELETE_SERVICE_SUCCESS,
            payload: { item: catalog }
        }
    },

    findMotorcycleRequested: () => {
        return {
            type: serviceAction.FIND_MOTORCYCLE_REQUESTED,
        }
    },

    findMotorcycleSuccess: (motorcycle) => {
        return {
            type: serviceAction.FIND_MOTORCYCLE_SUCCESS,
            payload: { item: motorcycle }
        }
    },

    findServiceByIdRequested: () => {
        return {
            type: serviceAction.FIND_SERVICE_BY_ID_REQUESTED,
        }
    },

    findServiceByIdSuccess: (service) => {
        return {
            type: serviceAction.FIND_SERVICE_BY_ID_SUCCESS,
            payload: { item: service }
        }
    },

    setCurrentServiceDetail: (service) => {
        return {
            type: serviceAction.SET_CURRENT_SERVICE_DETAIL,
            payload: { item: service }
        }
    },

    addPartToServiceDetailRequested: (parts) => {
        return {
            type: serviceAction.ADD_PART_TO_SERVICE_DETAIL_REQUESTED,
        }
    },

    addPartToServiceDetailSuccess: (parts) => {
        return {
            type: serviceAction.ADD_PART_TO_SERVICE_DETAIL_SUCCESS,
            payload: { item: parts }
        }
    }
}

export default serviceAction;