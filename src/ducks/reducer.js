//INITIAL STATE
const initialState = {
  id: null,
  username: "",
  profile_pic: ""
};

//ACTION CONSTANTS
const SET_USER = "SET_USER"

//ACTION BUILDERS
export function setUser(id, username, profile_pic) {
  return {
    type: SET_USER,
    payload: {id, username, profile_pic}
  };
}

//REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
      case SET_USER:
          const {id, username, profile_pic} = payload
          return {id, username, profile_pic}
    default:
      return state;
  }
}
