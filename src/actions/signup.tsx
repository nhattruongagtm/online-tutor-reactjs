
export const updateStatus = (payload: number) => {
    return {
        type: "STATUS__SIGNUP",
        payload: payload,
    }
}
export const updateStatusForgotPassword = (payload: number) => {
    return {
        type: "STATUS__FORGOT",
        payload: payload,
    }
}