const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ENTIRE_DATA":
      return [...action.payload];
    case "ENTIRE_DATA_ADD":
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default dataReducer;

const INITIAL_STATE = [];
