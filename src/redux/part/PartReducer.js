import PartAction from "./PartAction";

const initPartState = {
    isLoading: false,
    parts: [],
};

export default function PartReducer(state = initPartState, { type, payload }) {
    switch ( type ) {
        case PartAction.LOAD_PART_REQUESTED:
        case PartAction.UPDATE_PART_REQUESTED:
        case PartAction.DELETE_PART_REQUESTED:
        case PartAction.ADD_PART_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case PartAction.LOAD_PART_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                parts: payload.items
            }
        }
        case PartAction.ADD_PART_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                parts: [...state.parts, payload.item]
            }
        }

        case PartAction.UPDATE_PART_SUCCESS: {
            const partsData = state.parts.map((item) => {
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
                parts: partsData
            }
        }
        case PartAction.DELETE_PART_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                parts: state.parts.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }
        default:
            return state;
    }
}