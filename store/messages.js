//to do: adjust data structure of messages once firestore is implemented and we get chatroom IDs
import Fire from "../Firebase";

//ACTION CONSTANT
const SET_MESSAGES = "SET_MESSAGES";

//ACTION
const setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

//REDUCER
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};

// THUNK
export const getMessages = chatRoomId => {
  return async dispatch => {
    console.log('in thunk')
    const data = await Fire.getMessages(chatRoomId);
    console.log("gimme data from thunk", data);
    dispatch(setMessages(data));
  };
};
