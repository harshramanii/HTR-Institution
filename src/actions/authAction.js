import { isEmpty } from "lodash";
import { makeAPIRequest } from "../helper/Global";
import { api, POST } from "../helper/apiConstants";

import { GET_USER_DATA } from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";

export const emailPasswordVerification = (request) => async (dispatch) => {
  console.log("request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.login,
    data: request?.data,
  })
    .then(async (response) => {
      // let abc = {};
      // let oldUserData = await AsyncStorage.getItem("USERINFO");
      // if (isEmpty(JSON.parse(oldUserData))) {
      //   abc = response?.data?.data;
      // } else {
      //   abc = {
      //     ...response?.data?.data,
      //     name: isEmpty(response?.data?.data?.name)
      //       ? JSON.parse(oldUserData)?.name
      //       : response?.data?.data?.name,
      //     email: isEmpty(response?.data?.data?.email)
      //       ? JSON.parse(oldUserData)?.email
      //       : response?.data?.data?.email,
      //     contact_no: isEmpty(response?.data?.data?.contact_no)
      //       ? JSON.parse(oldUserData)?.contact_no
      //       : response?.data?.data?.contact_no,
      //     country: isEmpty(response?.data?.data?.country)
      //       ? JSON.parse(oldUserData)?.country
      //       : response?.data?.data?.country,
      //   };
      // }
      // AsyncStorage.setItem("USERINFO", JSON.stringify(abc));
      console.log("response response responseresponse", response);
      if (response?.data?.success) {
        AsyncStorage.setItem("LOGININFO", JSON.stringify(response?.data?.data));

        if (request.onSuccess) request.onSuccess(response);
      } else {
        Alert.alert(response?.data?.message || "");
        if (request.onFail) request.onFail(response?.data?.message);
      }

      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
      // Alert.alert("Something went to wrong");
      Alert.alert(error?.data?.message || "Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};

export const signUpAccount = (request) => async (dispatch) => {
  console.log("request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.signUp,
    data: request?.data,
  })
    .then((response) => {
      if (request.onSuccess) request.onSuccess(response?.data?.data);
      console.log("response signUpAccount", response);
    })
    .catch((error) => {
      console.log("error", error);
      Alert.alert("Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};

export const phoneVerification = (request) => async (dispatch) => {
  console.log("request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.mobileVerification,
    data: request?.data,
  })
    .then((response) => {
      if (request.onSuccess) request.onSuccess(response?.data?.data);
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
      Alert.alert("Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};

export const otpVerification = (request) => async (dispatch) => {
  console.log("request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.otpVerification,
    data: request?.data,
  })
    .then((response) => {
      if (request.onSuccess) request.onSuccess(response?.data?.data);
      console.log("otpVerification response", response);
    })
    .catch((error) => {
      console.log("error", error);
      Alert.alert("Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};

export const vendorSubmitForm = (request) => async (dispatch) => {
  console.log(" vendorSubmitForm request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.vendor,
    data: request?.data,
  })
    .then((response) => {
      Alert.alert(response?.data?.message || "");
      if (request.onSuccess) request.onSuccess(response);
      console.log("vendorSubmitForm response", response);
    })
    .catch((error) => {
      console.log("error", error);
      Alert.alert("Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};

export const jobsSubmitForm = (request) => async (dispatch) => {
  console.log(" jobsSubmitForm request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.jobs,
    data: request?.data,
  })
    .then((response) => {
      Alert.alert(response?.data?.message || "");

      if (request.onSuccess) request.onSuccess(response);
      console.log("jobsSubmitForm response", response);
    })
    .catch((error) => {
      console.log("error", error);
      if (request.onFail) request.onFail(error);
    });
};

export const customerSubmitForm = (request) => async (dispatch) => {
  console.log(" customerSubmitForm request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.customer,
    data: request?.data,
  })
    .then((response) => {
      // Alert.alert(response?.data?.message || "");

      if (request.onSuccess) request.onSuccess(response);
      console.log("customerSubmitForm response", response);
    })
    .catch((error) => {
      console.log("error", error);
      Alert.alert("Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};

export const advertisementSubmitForm = (request) => async (dispatch) => {
  console.log(" advertisementSubmitForm request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.advertisement,
    data: request?.data,
  })
    .then((response) => {
      Alert.alert(response?.data?.message || "");
      if (request.onSuccess) request.onSuccess(response);
      console.log("advertisementSubmitForm response", response);
    })
    .catch((error) => {
      console.log("error", error);
      Alert.alert("Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};

export const othersSubmitForm = (request) => async (dispatch) => {
  console.log(" orthersSubmitForm request", request);
  return makeAPIRequest({
    method: POST,
    baseURL: api.other,
    data: request?.data,
  })
    .then((response) => {
      Alert.alert(response?.data?.message || "");
      if (request.onSuccess) request.onSuccess(response);
      console.log("orthersSubmitForm response", response);
    })
    .catch((error) => {
      console.log("error", error);
      Alert.alert("Something went to wrong");

      if (request.onFail) request.onFail(error);
    });
};
