export const authReducer = (state, actions) => {
    if (actions.type === "auth") return { ...state, auth: actions.payload.auth }
    if (actions.type === "loading") return { ...state, loading: actions.payload.loading }
    if (actions.type === "user") return { ...state, user: actions.payload.user }
}