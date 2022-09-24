import storage, {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {isEmpty} from 'lodash';

import {api, GET, POST} from '../helper/apiConstants';
import {makeAPIRequest} from '../helper/Global';
import {ALL_USER_DATA, GET_COUNTRY_DATA, GET_USER_DATA} from './types';

// export const getUserData = request => async dispatch => {
//   dispatch({ type: GET_USER_DATA, payload: request });
// };

export const getCountryData = request => async dispatch => {
  return makeAPIRequest({
    method: GET,
    baseURL: api.countryData,
  })
    .then(response => {
      if (request.onSuccess) request.onSuccess(response);
      dispatch({
        type: GET_COUNTRY_DATA,
        payload: response?.data?.data?.sort(),
      });
    })
    .catch(error => {
      console.log('error', error);
      if (request.onFail) request.onFail(error);
    });
};

export const getUserData = request => async dispatch => {
  let uid = auth()?.currentUser?.uid;
  firebase
    .firestore()
    .collection('User')
    .doc(uid)
    .onSnapshot(snapshot => {
      console.log('getUserData Response', snapshot?.data());
      if (request.onSuccess) request.onSuccess(snapshot?.data());
      dispatch({type: GET_USER_DATA, payload: snapshot?.data()});
    });
};
export const getStudentData = request => async dispatch => {
  let uid = auth()?.currentUser?.uid;
  firebase
    .firestore()
    .collection('User')
    .onSnapshot(snapshots => {
      let studentData = [];
      snapshots.forEach(docs => {
        console.log('docs', docs);
        studentData.push(docs.data());
      });

      console.log('studentData', studentData);
      // console.log('getUserData Response', snapshot?.data());
      // if (request.onSuccess) request.onSuccess(snapshot?.data());
      dispatch({
        type: ALL_USER_DATA,
        payload: studentData?.filter(item => item?.UserType != 'A'),
      });
    });
};
