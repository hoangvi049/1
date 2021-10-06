import { actionTypes } from "../actions/type";

let initialState = {
  userList: [],
  userDetail: {},
  filmList: [],
  filmDetail: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_LIST:
      let cloneList = action.payload;
      return { ...state, userList: cloneList };
    case actionTypes.FETCH_FILM_LIST:
      let cloneFilm = action.payload;
      return { ...state, filmList: cloneFilm };
    case actionTypes.FETCH_FILM_DETAIL:
      return { ...state, filmDetail: action.payload };
    case actionTypes.FETCH_USER_DETAIL:
      return { ...state, userDetail: action.payload };
    default:
      return state;
  }
};

export default reducer;
