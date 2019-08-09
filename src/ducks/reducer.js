//INITIAL STATE
const initialState = {
  id: null,
  username: "",
  profile_pic: ""
};

//ACTION CONSTANTS

//ACTION BUILDERS

//REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
