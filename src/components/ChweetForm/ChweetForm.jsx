import React, { useState, useEffect } from 'react';
import debug from "debug";
import { addPostService, uploadToS3Service } from "../../utilities/chweet-service";
import { CiImageOn } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { Input, Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const log = debug("chwitter:src:components:ChweetForm");

export default function ChweetForm({ allPosts, setAllPosts, profileInfo, fetchAllPosts }) {
  const initialPostData = {
    type: "",
    breed: "",
    gender: "",
    sterilised: "",
    contactDetails: "",
    remarks: "",
  };
  
  const [postData, setPostData] = useState(initialPostData);
  const [imageFiles, setImageFiles] = useState({
    images: [],
    preview: [],
    filenames: [],
  });
  const [status, setStatus] = useState(null);

  const resetPostForm = () => {
    setPostData(initialPostData);
    setImageFiles({ images: [], preview: [], filenames: [] });
    setStatus(null);
  }

  const handleSelect = (name, value) => {
  setPostData({
    ...postData,
    [name]: value,
  });
  };

  const handleInput = (e) => {
  setPostData({
    ...postData,
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
    setImageFiles({
      images: [...imageFiles.images, ...imgFiles],
      preview: [...imageFiles.preview, ...updatedPreview],
      filenames: [...imageFiles.filenames, ...updatedFilenames],
    });
    log("Image uploaded");
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

    setAllPosts([newPost, ...allPosts]);
    toast.success("Posted Chweet successfully.");
    resetPostForm();
    fetchAllPosts();
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

  const handleRemoveImage = () => {
    setImageFiles({
      images: [],
      preview: [],
      filenames: [],
    });
  };

  return (
    <>
    <ToastContainer />
    <div className="relative">
      <div
        className="grid grid-cols-2 grid-rows-2 gap-0 bg-white h-auto w-3/4 rounded-sm"
        style={{
          gridTemplateColumns: '15% 85%',
          gridTemplateRows: '65% 35%',
        }}
      >
        <div className="bg-white col-span-1 row-span-2 h-auto">
          <img
            src={profileInfo.profilePicture}
            className="rounded-full w-16 h-16 mx-auto mt-6 object-cover"
          />
        </div>
        <form
        onSubmit={handleSubmit}
        autoComplete="off"
        encType="multipart/form-data">
          <p className="my-4 mr-4 font-light text-sm">To start a post, <span className='font-semibold'>fill in the following fields</span> and <span className='font-semibold'>upload a picture</span> of the pet you wish to put up for adoption.</p>
            <div className="bg-white col-span-1 row-span-1 w-11/12 mt-4">
              <div className="grid grid-cols-4 grid-rows-3 gap-y-2 mb-4"
                  style={{
                  gridTemplateColumns: '13% 38% 13% 38%',
                }}
                >
                <div className="col-span-1 row-span-1">
              <label htmlFor="type" className="font-light align-middle text-sm">Type<span className="subscript text-red-500">*</span></label>
              </div>
              <div className="col-span-1 row-span-1">
                <Select
                id="type"
                name="type"
                value={postData.type}
                onChange={value => handleSelect("type", value)}
                required
                className='w-11/12'
                options={[
                  {
                    value: 'Cat',
                    label: 'Cat',
                  },
                  {
                    value: 'Dog',
                    label: 'Dog',
                  },
                  {
                    value: 'Rabbit',
                    label: 'Rabbit',
                  },
                  {
                    value: 'Bird',
                    label: 'Bird',
                  },
                  {
                    value: 'Hamster',
                    label: 'Hamster',
                  },
                  {
                    value: 'Others',
                    label: 'Others',
                  },
                ]}
              />
              </div>
              <div className="col-span-1 row-span-1">
              <label htmlFor="breed" className="font-light align-middle text-sm">Breed<span className="subscript text-red-500">*</span></label>
              </div>
              <div className="col-span-1 row-span-1">
              <Input
              type="text"
              id="breed"
              name="breed"
              value={postData.breed}
              onChange={handleInput}
              required
              className="w-11/12 mx-2"
              />
              </div>
              <div className="col-span-1 row-span-1">
              <label htmlFor="gender" className="font-light align-middle text-sm">Gender<span className="subscript text-red-500">*</span></label>
              </div>
              <div className="col-span-1 row-span-1">
              <Select
              id="gender"
              name="gender"
              value={postData.gender}
              onChange={value => handleSelect("gender", value)}
              required
                className='w-11/12'
                options={[
                  {
                    value: 'Male',
                    label: 'Male',
                  },
                  {
                    value: 'Female',
                    label: 'Female',
                  },
                  {
                    value: 'Not sure',
                    label: 'Not sure',
                  },
                ]}
              />
              </div>
              <div className="col-span-1 row-span-1">
              <label htmlFor="sterilised" className="font-light align-middle text-sm">Sterilised<span className="subscript text-red-500">*</span></label>
              </div>
              <div className="col-span-1 row-span-1">
              <Select
              id="sterilised"
              name="sterilised"
              value={postData.sterilised}
              onChange={value => handleSelect("sterilised", value)}
              required
                className='w-11/12 mx-2'
                options={[
                  {
                    value: 'Yes',
                    label: 'Yes',
                  },
                  {
                    value: 'No',
                    label: 'No',
                  },
                  {
                    value: 'Not sure',
                    label: 'Not sure',
                  },
                ]}
              />

              </div>
              <div className="col-span-1 row-span-1">
              <label htmlFor="contactDetails" className="font-light align-middle text-sm">Contact<span className="subscript text-red-500">*</span></label>
              </div>
              <div className="col-span-1 row-span-1">
              <Input
              id="contactDetails"
              name="contactDetails"
              value={postData.contactDetails}
              onChange={handleInput}
              required
              className="w-11/12"
              />
              </div>
              <div className="col-span-1 row-span-1">
                <label htmlFor="remarks" className="font-light align-middle text-sm">Remarks</label>
              </div>
              <div className="col-span-1 row-span-1">
              <Input
                type="text"
                id="remarks"
                name="remarks"
                value={postData.remarks}
                onChange={handleInput}
                className="w-11/12 mx-2"
              />
              </div>
              </div>
              <div style={{ position: 'relative' }}>
                {imageFiles.preview.length !== 0 ? (
                imageFiles.preview.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Preview image"
                    className="w-3/5 h-full"
                  />
                ))
              ) : null}
                    {imageFiles.images.length !== 0 ? (
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <button onClick={handleRemoveImage}>
                    <RxCross2 className="bg-gray-200 rounded-full py-1 px-1 w-8 h-8" />
                    </button>
                  </div> ) : null }
              </div>

            </div>
            <div className="bg-white col-span-1 row-span-1 flex w-9/10">
              <span className="flex items-center w-full justify-end">
                <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImgFileInput}
                style={{ display: 'none' }}
              />
              <label htmlFor="image">
                <CiImageOn className="text-coral w-6 h-6 mb-4 cursor-pointer" />
              </label>        
                <button className="border border-coral bg-coral text-white py-1 px-4 ml-4 mr-4 mb-4 rounded-sm">
                  Post
                </button>
              </span>
            </div>
        </form>
      </div>
    </div>
    </>
  );
}