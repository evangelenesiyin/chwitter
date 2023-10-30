import sendRequest from "./send-request";

const BASE_URL = "/api/chweet";

export function uploadToS3API(imgFormData) {
  return sendRequest(`${BASE_URL}/new/upload`, "POST", imgFormData, true);
}

export function addPostAPI(postData) {
  return sendRequest(`${BASE_URL}/new`, "POST", postData);
}

export function getAllPostsAPI() {
  return sendRequest(BASE_URL);
}

export function deletePostAPI(postID) {
  return sendRequest(`${BASE_URL}/${postID}`, "DELETE");
}
