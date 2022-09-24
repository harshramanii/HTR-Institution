/* API Methods */
export const GET = "get";
export const POST = "post";
export const PUT = "put";
export const DELETE = "delete";

export const baseURL = `https://mamata.aimbys.in`;

export const api = {
  login: baseURL + `/api/login`,
  signUp: baseURL + `/api/user_register`,
  vendor: baseURL + `/api/vendor`,
  jobs: baseURL + `/api/job`,
  customer: baseURL + `/api/customer`,
  advertisement: baseURL + `/api/advertisement`,
  other: baseURL + `/api/other`,
  mobileVerification: baseURL + `/api/mobile-otp-send`,
  otpVerification: baseURL + `/api/mobile-otp-verified`,
  countryData: baseURL + `/api/countrylist`,
};
