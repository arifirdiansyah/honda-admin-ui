import UserAction from "./UserAction";

const initUserState = {
    isLoading: false,
    users: [],
    currentUser: {}
};

export default function UserReducer(state = initUserState, { type, payload }) {
    switch ( type ) {
        case UserAction.LOAD_USER_REQUESTED:
        case UserAction.LOAD_CURRENT_USER_REQUESTED:
        case UserAction.UPDATE_USER_REQUESTED: {
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

        case UserAction.LOAD_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                currentUser: payload.user
            }
        }

        default:
            return state;
    }
}