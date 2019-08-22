export function sendUserData(data){
    console.log("action",data);
    return {type: "ADD_USER_DATA", payload: data}
}