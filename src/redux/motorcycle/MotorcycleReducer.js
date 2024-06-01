import MotorcycleAction from "./MotorcycleAction";

const initMotorcycleState = {
    isLoading: false,
    motorcycles: [],
};

export default function MotorcycleReducer(state = initMotorcycleState, { type, payload }) {
    switch ( type ) {
        case MotorcycleAction.LOAD_MOTORCYCLE_REQUESTED:
        case MotorcycleAction.UPDATE_MOTORCYCLE_REQUESTED:
        case MotorcycleAction.DELETE_MOTORCYCLE_REQUESTED:
        case MotorcycleAction.ADD_MOTORCYCLE_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case MotorcycleAction.LOAD_MOTORCYCLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                motorcycles: payload.items
            }
        }
        case MotorcycleAction.ADD_MOTORCYCLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                motorcycles: [...state.motorcycles, payload.item]
            }
        }

        case MotorcycleAction.UPDATE_MOTORCYCLE_SUCCESS: {
            const motorcyclesData = state.motorcycles.map((item) => {
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
                motorcycles: motorcyclesData
            }
        }
        case MotorcycleAction.DELETE_MOTORCYCLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                motorcycles: state.motorcycles.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }
        default:
            return state;
    }
}