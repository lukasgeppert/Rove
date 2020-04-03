//ACTION CONSTANT
const SET_LOCATION = "SET_LOCATION"
const SET_IMAGE = "SET_IMAGE"
const SET_PROFESSION = "SET_PROFESSION"
const SET_BIO = "SET_BIO"
const SET_INTERESTS = "SET_INTERESTS"

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
export const setBio = bio => ({
    type: SET_BIO,
    bio
})
export const setInterests = interests => ({
    type: SET_INTERESTS,
    interests
})

//REDUCER
const initialState = {};

export default (state = initialState, action) => {
    let newState = state;
  switch (action.type) {
    case SET_INTERESTS:
        newState.interests=action.interests
        return newState;
    case SET_BIO:
        newState.bio=action.bio
        return newState;
    case SET_PROFESSION:
        newState.profession=action.profession
        return newState;
    case SET_IMAGE:
        newState.image=action.image
        return newState;
    case SET_LOCATION:
        newState.location=action.location
      return newState;
    default:
      return state;
  }
};