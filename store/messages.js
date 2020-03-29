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
    const data2 = await Fire.updatesOn(chatRoomId);
    console.log("data is: ", data);
    console.log("data2 is: ", data2);
    dispatch(setMessages(data));
  };
};
