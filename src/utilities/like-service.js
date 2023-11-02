import { addLikeAPI, deleteLikeAPI, getLikesAPI } from "./like-api";

export async function addLikeService(postData) {
  const postItem = await addLikeAPI(postData);
  return postItem.data.like;
}

export async function deleteLikeService(postID) {
  await deleteLikeAPI(postID);
}

export async function getLikesService(postID) {
  const likes = await getLikesAPI(postID);
  return likes;
}
