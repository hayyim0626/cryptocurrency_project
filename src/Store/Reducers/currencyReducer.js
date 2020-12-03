const currencyReducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
        case "ADD_CURRENCY":
        return [...state, action.payload]
        case "DELETE_CURRENCY":
        return [...action.payload]
        default:
            return state
    }
}

export default currencyReducer;

const INITIAL_STATE = []