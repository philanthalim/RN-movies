const initialState = {
    firstName: "Mabelle",
    lastName: "Lim",
  };
  export default profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_USERDETAILS": {
        return { ...state, ...action.data };
      }
      default:
          return state;
    }
  };