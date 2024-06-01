import DealershipAction from "./DealershipAction";

const initDealershipState = {
    isLoading: false,
    dealerships: [],
};

export default function DealershipReducer(state = initDealershipState, {type, payload}) {
    switch (type) {
        case DealershipAction.LOAD_DEALERSHIP_REQUESTED:
        case DealershipAction.UPDATE_DEALERSHIP_REQUESTED:
        case DealershipAction.DELETE_DEALERSHIP_REQUESTED:
        case DealershipAction.ADD_DEALERSHIP_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DealershipAction.LOAD_DEALERSHIP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                dealerships: payload.items
            }
        }
        case DealershipAction.ADD_DEALERSHIP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                dealerships: [...state.dealerships, payload.item]
            }
        }

        case DealershipAction.UPDATE_DEALERSHIP_SUCCESS: {
            const dealershipsData = state.dealerships.map((item) => {
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
                dealerships: dealershipsData
            }
        }
        case DealershipAction.DELETE_DEALERSHIP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                dealerships: state.dealerships.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }
        default:
            return state;
    }
}
