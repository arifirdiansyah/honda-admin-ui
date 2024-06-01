import UserAction from "./UserAction";

const initUserState = {
    isLoading: false,
    users: [],
};

export default function UserReducer(state = initUserState, {type, payload}) {
    switch (type) {
        case UserAction.LOAD_USER_REQUESTED:
        case UserAction.UPDATE_USER_REQUESTED:
        case UserAction.DELETE_USER_REQUESTED:
        case UserAction.ADD_USER_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UserAction.LOAD_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                users: payload.items
            }
        }
        case UserAction.ADD_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                users: [...state.users, payload.item]
            }
        }

        case UserAction.UPDATE_USER_SUCCESS: {
            const usersData = state.users.map((item) => {
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
                users: usersData
            }
        }
        case UserAction.DELETE_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                users: state.users.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }
        default:
            return state;
    }
}