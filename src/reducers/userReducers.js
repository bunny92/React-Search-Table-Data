const userReducers = (state = { user: [] }, action) => {
  if (action.type === "ADD_USER_DATA") {
    return { user: [...state.user.concat(action.payload)] };
  } else if (action.type === "DELETE_USER_DATA") {
    return {
      user: [
        ...state.user.slice(0, action.payload),
        ...state.user.slice(action.payload + 1)
      ]
    };
  } else if (action.type === "UPDATE_USER_DATA") {


    let updateUserData = [...state.user]; //copy of the array present in the redux object
    const indexToUpdate = updateUserData.findIndex(function(user, id) {
      return id === action.payload.id;
    });
    console.log("$$$", indexToUpdate);

    const updatedUserValue = {
      category: action.payload.userUpdatedData.category,
      name: action.payload.userUpdatedData.name,
      price: action.payload.userUpdatedData.price,
      stocked: action.payload.userUpdatedData.stocked
    };
    return {
      user: [
        ...state.user.slice(0, indexToUpdate),
        updatedUserValue,
        ...state.user.slice(indexToUpdate + 1)
      ]
    };
  }


  return state;
};
export default userReducers;
