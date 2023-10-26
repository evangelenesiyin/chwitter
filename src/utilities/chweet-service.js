import {
  uploadToS3API,
  addPostAPI,
  getAllPostsAPI,
} from "./chweet-api";

export async function uploadToS3Service(imgFormData) {
  const data = await uploadToS3API(imgFormData);
  // data returns object with imageURLs as an array
  // data.imageURLs[0] for now only one image
  const imgURL = data.imageURLs[0];
  return imgURL;
}

export async function addPostService(apparelData) {
  const postItem = await addPostAPI(apparelData);
  return postItem.data.post;
}

export async function getAllPostsService() {
  const allPosts = await getAllPostsAPI();
  return allPosts.data.post;
}
