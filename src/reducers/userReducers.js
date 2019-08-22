const userReducers = (state = {user: []}, action) => {
    if(action.type === 'ADD_USER_DATA'){
        return { user: [ ...state.user.concat(action.payload) ]} 
    }
}
export default userReducers;