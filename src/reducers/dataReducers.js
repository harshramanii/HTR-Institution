import {ALL_USER_DATA, GET_COUNTRY_DATA, GET_USER_DATA} from '../actions/types';

const INITIAL_STATE = {
  userData: {},
  countryData: [],
  allUserData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {...state, userData: action.payload};
    case ALL_USER_DATA:
      return {...state, allUserData: action.payload};
    case GET_COUNTRY_DATA:
      return {...state, countryData: action.payload};
    default:
      return state;
  }
};
