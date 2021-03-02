const userDataReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "update":
      return { ...action.payload };
    default:
      throw new Error();
  }
};

export default userDataReducer;
