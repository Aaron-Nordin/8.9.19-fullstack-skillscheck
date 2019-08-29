//INITIAL STATE
const initialState = {
  // id: null,
  username: "",
  profile_pic: ""
};

//ACTION CONSTANTS
const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";

//ACTION BUILDERS
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
} 

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

//REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      const { username, profile_pic } = payload;
      return { ...state, username, profile_pic };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}