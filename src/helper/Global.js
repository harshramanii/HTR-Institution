import axios from 'axios';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {colors} from './utils';

export const makeAPIRequest = ({method, url, data, headers, params, baseURL}) =>
  new Promise(async (resolve, reject) => {
    let headers = {
      'Content-Type': 'multipart/form-data',
    };
    const options = {
      method,
      baseURL,
      url,
      data,
      headers,
      params,
    };

    options.validateStatus = () => {
      return true;
    };

    axios(options)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const verifyEmail = email => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
};

export const verifyPassword = password => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;
  return reg.test(password);
};

export const flashMsg = (title, desc) => {
  showMessage({
    message: title || '',
    description: desc,
    textStyle: colors.white,
    backgroundColor: colors.primary1,
  });
};

export const timeStampToDate = seconds => {
  var timestamp = seconds;
  var myDate = new Date(timestamp * 1000);
  return myDate.toJSON();
};
