const partAction = {
    LOAD_PART_REQUESTED: '[Part] Load Part Requested',
    LOAD_PART_SUCCESS: '[Part] Load Part Success',
    ADD_PART_REQUESTED: '[Part] Add Part Requested',
    ADD_PART_SUCCESS: '[Part] Add Part Success',
    UPDATE_PART_REQUESTED: '[Part] Update Part Requested',
    UPDATE_PART_SUCCESS: '[Part] Update Part Success',
    DELETE_PART_REQUESTED: '[Part] Delete Part Requested',
    DELETE_PART_SUCCESS: '[Part] Delete Part Success',

    loadPartRequested: () => {
        return {
            type: partAction.LOAD_PART_REQUESTED
        }
    },

    loadPartSuccess: (items) => {
        return {
            type: partAction.LOAD_PART_SUCCESS,
            payload: { items }
        }
    },

    addPartRequested: () => {
        return {
            type: partAction.ADD_PART_REQUESTED
        }
    },

    addPartSuccess: (catalog) => {
        return {
            type: partAction.ADD_PART_SUCCESS,
            payload: { item: catalog }
        }
    },

    updatePartRequested: () => {
        return {
            type: partAction.UPDATE_PART_REQUESTED,
        }
    },

    updatePartSuccess: (catalog) => {
        return {
            type: partAction.UPDATE_PART_SUCCESS,
            payload: { item: catalog }
        }
    },

    deletePartRequested: () => {
        return {
            type: partAction.DELETE_PART_REQUESTED,
        }
    },

    deletePartSuccess: (catalog) => {
        return {
            type: partAction.DELETE_PART_SUCCESS,
            payload: { item: catalog }
        }
    }

}

export default partAction;