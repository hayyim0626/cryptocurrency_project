export const addCurrency = (data) => {
  return {
    type: "ADD_CURRENCY",
    payload: data,
  };
};

export const deleteCurrency = (data) => {
  return {
    type: "DELETE_CURRENCY",
    payload: data,
  };
};

export const entireCurrency = (data) => {
  return {
    type: "ENTIRE_DATA",
    payload: data,
  };
};

export const entireCurrencyAdd = (data) => {
    return {
      type: "ENTIRE_DATA_ADD",
      payload: data,
    };
  };