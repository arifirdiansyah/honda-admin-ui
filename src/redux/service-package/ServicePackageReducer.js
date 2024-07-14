import ServicePackageAction from "./ServicePackageAction";

const initPartState = {
    isLoading: false,
    servicePackages: [],
};

export default function ServicePackageReducer(state = initPartState, { type, payload }) {
    switch ( type ) {
        case ServicePackageAction.LOAD_SERVICE_PACKAGE_REQUESTED:
        case ServicePackageAction.UPDATE_SERVICE_PACKAGE_REQUESTED:
        case ServicePackageAction.DELETE_SERVICE_PACKAGE_REQUESTED:
        case ServicePackageAction.ADD_SERVICE_PACKAGE_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ServicePackageAction.LOAD_SERVICE_PACKAGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                servicePackages: payload.items
            }
        }
        case ServicePackageAction.ADD_SERVICE_PACKAGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                servicePackages: [...state.servicePackages, payload.item]
            }
        }

        case ServicePackageAction.UPDATE_SERVICE_PACKAGE_SUCCESS: {
            const servicePackageData = state.servicePackages.map((item) => {
                if (item.id === payload.item.id) {
                    return {
                        ...payload.item
                    };
                }

                return item;
            });

            return {
                ...state,
                isLoading: false,
                servicePackages: servicePackageData
            }
        }
        case ServicePackageAction.DELETE_SERVICE_PACKAGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                servicePackages: state.servicePackages.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }
        default:
            return state;
    }
}