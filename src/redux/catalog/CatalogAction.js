const catalogAction = {
    LOAD_CATALOG_REQUESTED: '[Catalog] Load Catalog Requested',
    LOAD_CATALOG_SUCCESS: '[Catalog] Load Catalog Success',
    ADD_CATALOG_REQUESTED: '[Catalog] Add Catalog Requested',
    ADD_CATALOG_SUCCESS: '[Catalog] Add Catalog Success',
    UPDATE_CATALOG_REQUESTED: '[Catalog] Update Catalog Requested',
    UPDATE_CATALOG_SUCCESS: '[Catalog] Update Catalog Success',
    DELETE_CATALOG_REQUESTED: '[Catalog] Delete Catalog Requested',
    DELETE_CATALOG_SUCCESS: '[Catalog] Delete Catalog Success',

    loadCatalogRequested: () => {
        return {
            type: catalogAction.LOAD_CATALOG_REQUESTED
        }
    },

    loadCatalogSuccess: (items) => {
        return {
            type: catalogAction.LOAD_CATALOG_SUCCESS,
            payload: { items }
        }
    },

    addCatalogRequested: () => {
        return {
            type: catalogAction.ADD_CATALOG_REQUESTED
        }
    },

    addCatalogSuccess: (catalog) => {
        return {
            type: catalogAction.ADD_CATALOG_SUCCESS,
            payload: { item: catalog }
        }
    },

    updateCatalogRequested: () => {
        return {
            type: catalogAction.UPDATE_CATALOG_REQUESTED,
        }
    },

    updateCatalogSuccess: (catalog) => {
        return {
            type: catalogAction.UPDATE_CATALOG_SUCCESS,
            payload: { item: catalog }
        }
    },

    deleteCatalogRequested: () => {
        return {
            type: catalogAction.DELETE_CATALOG_REQUESTED,
        }
    },

    deleteCatalogSuccess: (catalog) => {
        return {
            type: catalogAction.DELETE_CATALOG_SUCCESS,
            payload: { item: catalog }
        }
    }

}

export default catalogAction;