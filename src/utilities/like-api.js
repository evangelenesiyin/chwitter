import sendRequest from "./send-request";

const BASE_URL = "/api/like";

export function addLikeAPI(postID) {
  return sendRequest(`${BASE_URL}/like`, "POST", postID);
}

export function deleteLikeAPI() {
  return sendRequest(`${BASE_URL}/unlike`, "DELETE");
}
