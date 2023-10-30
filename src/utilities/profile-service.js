import { uploadToS3API, addProfileAPI, getProfileInfoAPI } from "./profile-api";
import debug from "debug";

export async function uploadToS3Service(imgFormData) {
  const data = await uploadToS3API(imgFormData);
  const imgURL = data.imageURLs[0];
  return imgURL;
}

export async function addProfileService(profileData) {
  const profileItem = await addProfileAPI(profileData);
  return profileItem;
}

export async function getProfileInfoService() {
  const profileInfo = await getProfileInfoAPI();
  debug("getProfileInfoService", profileInfo.data.user.profile);
  return profileInfo.data.user.profile;
}
