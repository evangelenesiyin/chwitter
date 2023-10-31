import debug from "debug";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updatePostService } from "../../utilities/chweet-service";
import { Input, Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const log = debug("chwitter:src:components:EditChweet");

export default function EditChweet({ post, setOpen, setConfirmLoading, fetchAllPosts }) {
    const [postData, setPostData] = useState(post);

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

    const handleUpdate = async (e) => {
      e.preventDefault();
        try {
            const updatedPostData = await updatePostService(post._id, postData);
            toast.success("Post updated successfully");
            setOpen(false);
            fetchAllPosts();
        } catch (error) {
            toast.error("Error updating post:", error);
        }
    };

    return (
        <>
        <ToastContainer />
        <div className="relative">
      <div
        className="grid grid-cols-1 grid-rows-2 gap-0 bg-white h-auto w-full rounded-sm mt-6"
        style={{
          gridTemplateRows: '65% 35%',
        }}
      >
        <form
        method="PATCH"
        onSubmit={handleUpdate}
        autoComplete="off">
            <div className="bg-white col-span-1 row-span-1 w-full">
              <div className="grid grid-cols-4 grid-rows-3 gap-y-4 mb-4"
                  style={{
                  gridTemplateColumns: '13% 38% 13% 38%',
                }}
                >
                <div className="col-span-1 row-span-1">
              <label htmlFor="type" className="font-light align-middle text-sm">Type</label>
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
              <label htmlFor="breed" className="font-light align-middle text-sm">Breed</label>
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
              <label htmlFor="gender" className="font-light align-middle text-sm">Gender</label>
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
              <label htmlFor="sterilised" className="font-light align-middle text-sm">Sterilised</label>
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
              <label htmlFor="contactDetails" className="font-light align-middle text-sm">Contact</label>
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
            </div>
            <div className="bg-white col-span-1 row-span-1 flex w-full justify-end">
            <button type="submit" className="border border-coral bg-coral text-white py-1 px-4 my-2 rounded-sm">
                Update
            </button>
            </div>
        </form>
      </div>
    </div>
    </>
    )
}