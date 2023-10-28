import { uploadToS3API, addProfileAPI } from "./profile-api";

export async function uploadImagesAndAddProfileService(
  headerImageFormData,
  profileImageFormData,
  profileData
) {
  const headerImageURL = await uploadToS3Service(headerImageFormData);
  const profileImageURL = await uploadToS3Service(profileImageFormData);

  profileData.headerPicture = headerImageURL;
  profileData.profilePicture = profileImageURL;

  const profileItem = await addProfileService(profileData);
  return profileItem.data.profile;
}

export async function uploadToS3Service(imgFormData) {
  const data = await uploadToS3API(imgFormData);
  const imgURL = data.imageURLs[0];
  return imgURL;
}

export async function addProfileService(profileData) {
  const profileItem = await addProfileAPI(profileData);
  return profileItem.data.profile;
}
