import debug from "debug";
import { useState } from "react";
import { PiCameraThin } from "react-icons/pi";

const log = debug("chwitter:src:pages:HomePageHero");

export default function HomePageHero({ setProfileInfo }) {
    const initialProfileData = {
        type: "",
        breed: "",
        gender: "",
        sterilised: "",
        contactDetails: "",
        remarks: "",
    }
    const [profileData, setProfileData] = useState(initialProfileData);
    const [headerImageFiles, setHeaderImageFiles] = useState({
        headerPicture: [],
        headerPreview: [],
        headerFileName: [],
    })
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

    const handleHeaderImgFileInput = (e) => {
  const headerImgFiles = Array.from(e.target.files);
  const updatedHeaderPreview = [];
  const updatedHeaderFileNames = [];

  headerImgFiles.forEach((img) => {
    const headerImgUrl = URL.createObjectURL(img);
    updatedHeaderPreview.push(headerImgUrl);
    updatedHeaderFileNames.push(img.name);
  });

  setHeaderImageFiles({
    headerPicture: [...headerImageFiles.headerPicture, ...headerImgFiles],
    headerPreview: [...headerImageFiles.headerPreview, ...updatedHeaderPreview],
    headerFileName: [...headerImageFiles.headerFileName, ...updatedHeaderFileNames],
  });

  log("Header image uploaded");
};

const handleProfileImgFileInput = (e) => {
  const profileImgFiles = Array.from(e.target.files);
  const updatedProfilePreview = [];
  const updatedProfileFileNames = [];

  profileImgFiles.forEach((img) => {
    const profileImgUrl = URL.createObjectURL(img);
    updatedProfilePreview.push(profileImgUrl);
    updatedProfileFileNames.push(img.name);
  });

  setProfileImageFiles({
    profilePicture: [...profileImageFiles.profilePicture, ...profileImgFiles],
    profilePreview: [...profileImageFiles.profilePreview, ...updatedProfilePreview],
    profileFileName: [...profileImageFiles.profileFileName, ...updatedProfileFileNames],
  });

  log("Profile image uploaded");
};

    const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  try {
    let imgURL = null;

    if (imageFiles.images.length > 0) {
      const imgFormData = new FormData();
      imageFiles.images.forEach((img) => {
        imgFormData.append("images", img);
      });

      imgURL = await uploadToS3Service(imgFormData);
    }

    const newPost = await addPostService({
      ...postData,
      images: imgURL,
    });

    toast.success("Posted Chweet successfully.");
    setPost([...post, newPost]);
    resetPostForm();
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
    <main className="min-h-screen min-w-screen bg-beige p-0 mx-auto grid">
      <div className="flex items-center justify-center mx-56 mb-28">
        <div className="bg-white w-3/5 rounded-sm">
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                encType="multipart/form-data">
          <div className="relative">
            <label htmlFor="header-image" className="image-upload-button">
                <img
                src={headerImageFiles.headerPreview[0] || './assets/grey.png'}
                className="h-56 bg-gray-200 w-full object-cover rounded-t-sm cursor-pointer"
                />
                </label>
                <input
                type="file"
                id="header-image"
                accept="image/*"
                onChange={handleHeaderImgFileInput}
                style={{ display: 'none' }}
                />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <PiCameraThin className="w-8 h-8 text-black cursor-pointer" />
            </div>
            </div>
            <div className="flex relative">
            <div className="relative">
                <label htmlFor="profile-image" className="image-upload-button">
                <img src={profileImageFiles.profilePreview[0] || './assets/grey.png'} className="w-24 h-24 bg-gray-200 rounded-full mx-4 -mt-10 border-4 border-white cursor-pointer" />
                </label>
                <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleProfileImgFileInput}
                style={{ display: 'none' }}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-left">
                <PiCameraThin className="w-8 h-8 mx-auto mb-10 rounded-full text-black cursor-pointer" />
                </div>
            </div>
            <span className="text-xs font-light mt-2 text-gray-400 ml-2">Upload a header and profile picture <span className="text-red-500"><span className="subscript">*</span>required</span></span>
            </div>
          <div className="mx-4 px-2 py-2">
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="displayName" className="text-gray-400">Display Name <span className="text-red-500 text-xs"><span className="subscript">*</span>required</span></label>
                <input type="text" className="w-full" onChange={handleChange} />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="username" className="text-gray-400">Username <span className="text-red-500 text-xs"><span className="subscript">*</span>required</span></label>
                <input type="text" className="w-full" onChange={handleChange} />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="bio" className="text-gray-400">Bio</label>
                <input type="text" className="w-full" onChange={handleChange} />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="location" className="text-gray-400">Location</label>
                <input type="text" className="w-full" onChange={handleChange} />
            </div>
            <div className="border border-gray-300 py-2 pb-2 px-2 mb-3 text-sm font-light">
                <label htmlFor="website" className="text-gray-400">Website</label>
                <input type="text" className="w-full" onChange={handleChange} />
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
  );
}
