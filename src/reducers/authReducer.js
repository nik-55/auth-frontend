import { authConstant } from "../constants/authConstant"

export const authReducer = (state, actions) => {
    if (actions.type === authConstant.AUTH) return { ...state, auth: actions.payload.auth }
    if (actions.type === authConstant.LOADING) return { ...state, loading: actions.payload.loading }
    if (actions.type === authConstant.USER) return { ...state, user: actions.payload.user }
}