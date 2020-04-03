//ACTION CONSTANT
const SET_LOCATION = "SET_LOCATION"
const SET_IMAGE = "SET_IMAGE"
const SET_PROFESSION = "SET_PROFESSION"

//ACTION
export const setLocation = location => ({
    type: SET_LOCATION,
    location
})
export const setImage = image => ({
    type: SET_IMAGE,
    image
})
export const setProfession = profession => ({
    type: SET_PROFESSION,
    profession
})

//REDUCER
const initialState = {};

export default (state = initialState, action) => {
    let newState = state;
  switch (action.type) {
    case SET_PROFESSION:
        newState.profession=action.profession
        return newState;
    case SET_IMAGE:
        newState.image=action.image
        return newState;
    case SET_LOCATION:
        console.log('location is set')
        newState.location=action.location
      return newState;
    default:
      return state;
  }
};