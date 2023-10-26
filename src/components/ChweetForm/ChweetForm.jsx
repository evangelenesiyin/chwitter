import React, { useState, useRef } from 'react';
import debug from "debug";
import { addPostService, uploadToS3Service } from "../../utilities/chweet-service";
import { CiImageOn } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const log = debug("chwitter:src:components:ChweetForm");

export default function ChweetForm({ post, setPost }) {
  const textareaRef = useRef(null);
  const initialPostData = {
    postText: "",
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

  const handleChange = (e) => {
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
    if (imageFiles.images.length === 0) return;
    setStatus("loading");

    const imgFormData = new FormData();
    imageFiles.images.forEach((img) => {
      imgFormData.append("images", img);
    });
    log("images appended to form", imgFormData);
    try {
      const imgURL = await uploadToS3Service(imgFormData);
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

  const handleRemoveImage = () => {
    setImageFiles({
      images: [],
      preview: [],
      filenames: [],
    });
  };

  const autoAdjustTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="relative">
      <div
        className="grid grid-cols-2 grid-rows-2 gap-0 bg-white h-auto w-3/4 rounded-sm mt-6"
        style={{
          gridTemplateColumns: '15% 85%',
          gridTemplateRows: '65% 35%',
        }}
      >
        <div className="bg-white col-span-1 row-span-2 h-auto">
          <img
            src="./assets/placeholder2.jpeg"
            className="rounded-full h-16 mx-auto mt-2"
          />
        </div>
        <form
        onSubmit={handleSubmit}
        autoComplete="off"
        encType="multipart/form-data">
            <div className="bg-white col-span-1 row-span-1 w-full">
              <textarea
                type="text"
                id="postText"
                name="postText"
                value={postData.postText}
                onChange={handleChange}
                placeholder="What is happening?"
                ref={textareaRef}
                onInput={autoAdjustTextarea}
                className="focus:outline-none focus:border-transparent my-6 mb-2 w-11/12 placeholder-top"
              />
              <div style={{ position: 'relative' }}>
                {imageFiles.preview.length !== 0 ? (
                imageFiles.preview.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Preview image"
                    className="w-4/5 h-1/2"
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
                style={{ display: 'none' }} // Hide the input element
              />
              <label htmlFor="image">
                <CiImageOn className="text-coral w-6 h-6 mb-4 cursor-pointer" />
              </label>        
                <button className="border border-coral bg-coral text-white py-1 px-4 ml-4 mr-4 mb-4">
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