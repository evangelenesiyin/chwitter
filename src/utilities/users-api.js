import sendRequest from "./send-request";

const BASE_URL = "/api/users";

export function signUpAPI(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function loginAPI(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function deactivateAPI(userID) {
  return sendRequest(`${BASE_URL}/${userID}/deactivate`, "PATCH");
}
