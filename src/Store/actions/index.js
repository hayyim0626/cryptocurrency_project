export const addCurrency = (data) => {
    return {
        type: "ADD_CURRENCY",
        payload: data
    }
}

export const deleteCurrency = (data) => {
    return {
        type: "DELETE_CURRENCY",
        payload: data
    }
}