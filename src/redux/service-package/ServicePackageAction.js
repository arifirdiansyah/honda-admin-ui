const servicePackageAction = {
    LOAD_SERVICE_PACKAGE_REQUESTED: '[ServicePackage] Load ServicePackage Requested',
    LOAD_SERVICE_PACKAGE_SUCCESS: '[ServicePackage] Load ServicePackage Success',
    ADD_SERVICE_PACKAGE_REQUESTED: '[ServicePackage] Add ServicePackage Requested',
    ADD_SERVICE_PACKAGE_SUCCESS: '[ServicePackage] Add ServicePackage Success',
    UPDATE_SERVICE_PACKAGE_REQUESTED: '[ServicePackage] Update ServicePackage Requested',
    UPDATE_SERVICE_PACKAGE_SUCCESS: '[ServicePackage] Update ServicePackage Success',
    DELETE_SERVICE_PACKAGE_REQUESTED: '[ServicePackage] Delete ServicePackage Requested',
    DELETE_SERVICE_PACKAGE_SUCCESS: '[ServicePackage] Delete ServicePackage Success',

    loadServicePackageRequested: () => {
        return {
            type: servicePackageAction.LOAD_SERVICE_PACKAGE_REQUESTED
        }
    },

    loadServicePackageSuccess: (items) => {
        return {
            type: servicePackageAction.LOAD_SERVICE_PACKAGE_SUCCESS,
            payload: { items }
        }
    },

    addServicePackageRequested: () => {
        return {
            type: servicePackageAction.ADD_SERVICE_PACKAGE_REQUESTED
        }
    },

    addServicePackageSuccess: (catalog) => {
        return {
            type: servicePackageAction.ADD_SERVICE_PACKAGE_SUCCESS,
            payload: { item: catalog }
        }
    },

    updateServicePackageRequested: () => {
        return {
            type: servicePackageAction.UPDATE_SERVICE_PACKAGE_REQUESTED,
        }
    },

    updateServicePackageSuccess: (catalog) => {
        return {
            type: servicePackageAction.UPDATE_SERVICE_PACKAGE_SUCCESS,
            payload: { item: catalog }
        }
    },

    deleteServicePackageRequested: () => {
        return {
            type: servicePackageAction.DELETE_SERVICE_PACKAGE_REQUESTED,
        }
    },

    deleteServicePackageSuccess: (catalog) => {
        return {
            type: servicePackageAction.DELETE_SERVICE_PACKAGE_SUCCESS,
            payload: { item: catalog }
        }
    }

}

export default servicePackageAction;