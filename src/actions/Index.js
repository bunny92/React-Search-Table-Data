export function sendUserData(data){
    console.log("action",data);
    return {type: "ADD_USER_DATA", payload: data}
}

export function deleteUserData(id) {
    console.log("id", id);
    return {type: "DELETE_USER_DATA", payload: id}
}

export function updateUsersData(userData, index){
	return {type: "UPDATE_USER_DATA", payload: {userUpdatedData: userData, id: index} }
}