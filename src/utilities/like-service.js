import { addLikeAPI, deleteLikeAPI } from "./like-api";

export async function addLikeService(postData) {
  const postItem = await addLikeAPI(postData);
  return postItem.data.post;
}

export async function deleteLikeService(postID) {
  await deleteLikeAPI(postID);
}
