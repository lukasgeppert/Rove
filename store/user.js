
//ACTION CONSTANT
export const SET_USER = "SET_USER";

//ACTION
export const setUser = user => ({
  type: SET_USER,
  user
});

//REDUCER
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

//THUNK
// export const getUser = () => {
//     return async (dispatch) => {
//         const data = 
//         const user = 'stuff that is in data'
//         dispatch(setUser(user))
//     }
// }