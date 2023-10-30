import {
  uploadToS3API,
  addPostAPI,
  getAllPostsAPI,
  deletePostAPI,
  updatePostAPI,
} from "./chweet-api";

export async function uploadToS3Service(imgFormData) {
  const data = await uploadToS3API(imgFormData);
  // data returns object with imageURLs as an array
  // data.imageURLs[0] for now only one image
  const imgURL = data.imageURLs[0];
  return imgURL;
}

export async function addPostService(postData) {
  const postItem = await addPostAPI(postData);
  return postItem.data.post;
}

export async function getAllPostsService() {
  const allPosts = await getAllPostsAPI();
  const sortedPosts = allPosts.data.post.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return sortedPosts;
}

export async function deletePostService(postID) {
  await deletePostAPI(postID);
}

export async function updatePostService(postID, postData) {
  const result = await updatePostAPI(postID, postData);
  return result.data.post;
}
