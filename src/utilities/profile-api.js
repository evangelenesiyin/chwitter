import sendRequest from "./send-request";

const BASE_URL = "/api/profile";

export function uploadToS3API(imgFormData) {
  return sendRequest(`${BASE_URL}/new/upload`, "POST", imgFormData, true);
}

export function addProfileAPI(profileData) {
  return sendRequest(`${BASE_URL}/new`, "POST", profileData);
}

export function getProfileInfoAPI() {
  return sendRequest(BASE_URL);
}
