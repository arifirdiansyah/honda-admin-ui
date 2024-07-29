import ServiceAction from "./ServiceAction";

const initPartState = {
    isLoading: false,
    services: [],
    selectedMotorcycle: null,
    serviceDetail: null
};

export default function ServiceReducer(state = initPartState, { type, payload }) {
    switch ( type ) {
        case ServiceAction.LOAD_SERVICE_REQUESTED:
        case ServiceAction.UPDATE_SERVICE_REQUESTED:
        case ServiceAction.DELETE_SERVICE_REQUESTED:
        case ServiceAction.FIND_MOTORCYCLE_REQUESTED:
        case ServiceAction.FIND_SERVICE_BY_ID_REQUESTED:
        case ServiceAction.ADD_PART_TO_SERVICE_DETAIL_REQUESTED:
        case ServiceAction.ADD_SERVICE_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ServiceAction.LOAD_SERVICE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                services: payload.items
            }
        }
        case ServiceAction.ADD_SERVICE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                services: [...state.services, payload.item]
            }
        }

        case ServiceAction.UPDATE_SERVICE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case ServiceAction.DELETE_SERVICE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                services: state.services.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }
        case ServiceAction.FIND_MOTORCYCLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                selectedMotorcycle: payload.item
            }
        }
        case ServiceAction.FIND_SERVICE_BY_ID_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                serviceDetail: payload.item
            }
        }
        case ServiceAction.SET_CURRENT_SERVICE_DETAIL: {
            return {
                ...state,
                isLoading: false,
                serviceDetail: {
                    ...state.serviceDetail,
                    technician: payload.item.technician,
                    servicePackage: { ...payload.item.servicePackage },
                    serviceDate: payload.item.serviceDate,
                    mileage: payload.item.mileage,
                    description: payload.item.description,
                    fee: payload.item.fee,
                    nama: payload.item.nama
                }
            }
        }
        case ServiceAction.ADD_PART_TO_SERVICE_DETAIL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                serviceDetail: {
                    ...state.serviceDetail,
                    replacedParts: payload.item
                }
            }
        }

        default:
            return state;
    }
}