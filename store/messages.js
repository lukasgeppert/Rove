//to do: adjust data structure of messages once firestore is implemented and we get chatroom IDs

//ACTION CONSTANT
const SET_MESSAGES = "SET_MESSAGES";

//ACTION
const setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

//REDUCER
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};

//THUNK
// export const getMessages = () => {
//     return async (dispatch) => {
//         const data = 
//         const messages = 'stuff that is in data'
//         dispatch(setMessages(messages))
//     }
// }