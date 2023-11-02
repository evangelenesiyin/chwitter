import sendRequest from "./send-request";

const BASE_URL = "/api/like";

export function addLikeAPI(postID) {
  return sendRequest(`${BASE_URL}/like`, "POST", postID);
}

export function deleteLikeAPI(postID) {
  return sendRequest(`${BASE_URL}/unlike`, "DELETE", postID);
}

export function getLikesAPI(postID) {
  return sendRequest(`${BASE_URL}/getOne`, "POST", postID);
}
