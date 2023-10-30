import debug from "debug";
import { useState } from "react";
import { addProfileService, uploadToS3Service } from "../../utilities/profile-service";
import { PiCameraThin } from "react-icons/pi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const log = debug("chwitter:src:pages:HomePageHero");

export default function HomePageHero({ profileInfo, setProfileInfo }) {
    const initialProfileData = {
        displayName: "",
        username: "",
        bio: "",
        location: "",
        website: "",
    }
    const [profileData, setProfileData] = useState(initialProfileData);
    const [profileImageFiles, setProfileImageFiles] = useState({
        profilePicture: [],
        profilePreview: [],
        profileFileName: [],
    })
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };


const handleImgFileInput = (e) => {
  const imgFiles = Array.from(e.target.files);
  const updatedPreview = [];
  const updatedFilenames = [];

  imgFiles.forEach((img) => {
    const imgUrl = URL.createObjectURL(img);
    updatedPreview.push(imgUrl);
    updatedFilenames.push(img.name);
  });
  log("imges", imgFiles);
  setProfileImageFiles({
    profilePicture: imgFiles,
    profilePreview: updatedPreview,
    profileFileName: updatedFilenames,
  });
  log("Profile image uploaded");
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  try {
    let imgURL = null;

    if (profileImageFiles.profilePicture.length > 0) {
      const imgFormData = new FormData();
      profileImageFiles.profilePicture.forEach((img) => {
        imgFormData.append("images", img);
      });

      imgURL = await uploadToS3Service(imgFormData);
    }

    const newProfile = await addProfileService({
      ...profileData,
      profilePicture: imgURL,
    });

    toast.success("Posted Chweet successfully.");
    setProfileInfo([...profileInfo, newProfile]);
  } catch (err) {
    if (err.message === "Unexpected end of JSON input") {
      toast.error("Please try again later.");
    } else {
      toast.error("Try Again.");
    }
    setStatus("error");
  } finally {
    setStatus("success");
  }
};

  return (
    <>
    <ToastContainer />
    <main className="min-h-screen min-w-screen bg-beige p-0 mx-auto grid">
      <div className="flex items-center justify-center mx-56 mb-28">
        <div className="bg-white w-3/5 rounded-sm">
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                encType="multipart/form-data">
          <div className="relative h-4">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            </div>
            </div>
            <div className="flex relative">
            <div className="relative">
                <label htmlFor="profile-image" className="image-upload-button cursor-pointer">
                <img src={profileImageFiles.profilePreview[0] || './assets/grey.png'} className="w-24 h-24 bg-gray-200 rounded-full mx-4 border-4 border-white cursor-pointer" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-left">
                <PiCameraThin className="w-8 h-8 mx-auto rounded-full text-gray-400 cursor-pointer" />
                </div>
                <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImgFileInput}
                style={{ display: 'none' }}
                />
                </label>
            </div>
            <span className="text-xs font-light text-gray-400 ml-2 my-auto">Upload a profile picture <span className="text-red-500"><span className="subscript">*</span>required</span></span>
            </div>
          <div className="mx-4 px-2 py-2">
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="displayName" className="text-gray-400">Display Name <span className="text-red-500 text-xs"><span className="subscript">*</span>required</span></label>
                <input
                type="text"
                id="displayName"
                name="displayName"
                value={profileData.displayName}
                className="w-full px-1"
                onChange={handleChange}
                 />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="username" className="text-gray-400">Username <span className="text-red-500 text-xs"><span className="subscript">*</span>required</span></label>
                <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                className="w-full"
                onChange={handleChange} />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="bio" className="text-gray-400">Bio</label>
                <input
                type="text"
                id="bio"
                name="bio"
                value={profileData.bio}
                className="w-full"
                onChange={handleChange} />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="location" className="text-gray-400">Location</label>
                <input
                type="text"
                id="location"
                name="location"
                value={profileData.location}
                className="w-full"
                onChange={handleChange} />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="website" className="text-gray-400">Website</label>
                <input
                type="text"
                id="website"
                name="website"
                value={profileData.website}
                className="w-full" onChange={handleChange} />
            </div>
            <div className="relative flex justify-center mb-2">
            <button className="border border-coral bg-coral text-white py-1 px-3">
                Let's go!
            </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </main>
    </>
  );
}
