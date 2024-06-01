import CatalogAction from "./CatalogAction";

const initCatalogState = {
    isLoading: false,
    catalogs: [],
};

export default function CatalogReducer(state = initCatalogState, {type, payload}) {
    switch (type) {
        case CatalogAction.LOAD_CATALOG_REQUESTED:
        case CatalogAction.UPDATE_CATALOG_REQUESTED:
        case CatalogAction.DELETE_CATALOG_REQUESTED:
        case CatalogAction.ADD_CATALOG_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case CatalogAction.LOAD_CATALOG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                catalogs: payload.items
            }
        }
        case CatalogAction.ADD_CATALOG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                catalogs: [...state.catalogs, payload.item]
            }
        }

        case CatalogAction.UPDATE_CATALOG_SUCCESS: {
            const catalogsData = state.catalogs.map((item) => {
                if (item.id === payload.item.id) {
                    return {
                        ...item,
                        ...payload.item
                    };
                }

                return item;
            });

            return {
                ...state,
                isLoading: false,
                catalogs: catalogsData
            }
        }
        case CatalogAction.DELETE_CATALOG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                catalogs: state.catalogs.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }
        default:
            return state;
    }
}