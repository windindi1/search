import {
    USER_SEARCH_DATA_FETCHED
  } from './actions';
  
  const initialState = {
    searchData: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case USER_SEARCH_DATA_FETCHED:
        return { ...state, searchData : action};
      default:
        return state;
    }
  };
  