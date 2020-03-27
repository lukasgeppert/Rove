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
    const data = await Fire.getMessages(chatRoomId);
    dispatch(setMessages(data));
  };
};
