import debug from "debug";
import { deletePostService } from "../../utilities/chweet-service";
import { PiDotsThreeBold } from "react-icons/pi";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { Dropdown, Space } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const log = debug("chwitter:src:components:ChweetRow");

export default function ChweetRow({ post, profileInfo, fetchPostData }) {

  const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Edit Text
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a
      target="_blank"
      rel="noopener noreferrer"
      href="/"
      onClick={(e) => {
        e.preventDefault();
        handleDelete(post._id);
      }}
      >
        Delete
      </a>
    ),
    key: '1',
  },
];

const handleDelete = async (postID) => {
    log("Deleting post with ID:", postID);
      try {
        await deletePostService(postID);
        await fetchPostData();
         toast.success("Deleted Chweet successfully.");
      } catch (err) {
          log("Error deleting post:", err);
         toast.error("Unable to delete Chweet.");
      }
  };

    return (
        <>
        <ToastContainer />
        <div className="relative">
            <div
            className="grid grid-cols-2 grid-rows-3 gap-0 border border-gray-100 bg-white h-auto w-3/4 rounded-sm"
            style={{
            gridTemplateColumns: '15% 85%',
            gridTemplateRows: '30px 90% 30px',
            }} >
                <div className="bg-white col-span-1 row-span-3 h-auto">
                    <img
                    src={profileInfo.profilePicture}
                    className="rounded-full h-16 mx-auto mt-2"
                    />
                </div>
                <div className="flex bg-white col-span-1 row-span-1 w-full my-2">
                    <span className="font-bold">{profileInfo.displayName}</span>&nbsp;
                    <span className="text-gray-400">{"@"}{profileInfo.username}</span>&nbsp;
                    <span className="text-gray-400">·</span>&nbsp;
                    <span className="text-gray-400">1h</span>
                    <span className="ml-auto pr-4 text-gray-500 cursor-pointer">
                    <Dropdown
                    menu={{
                    items,
                    }}
                    >
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <PiDotsThreeBold />
                    </Space>
                    </a>
                    </Dropdown>
                    </span>
                </div>
                <div className="bg-white col-span-1 row-span-1 w-full pb-1 mt-1">
                    <div className="my-2 font-light text-sm">
                    <div><span className="font-medium">Type:</span>{' '}{post.type}</div>
                    <div><span className="font-semibold">Breed:</span>{' '}{post.breed}</div>
                    <div><span className="font-semibold">Gender:</span>{' '}{post.gender}</div>
                    <div><span className="font-semibold">Sterilised:</span>{' '}{post.sterilised}</div>
                    <div><span className="font-semibold">Contact:</span>{' '}{post.contactDetails}</div>
                    <div><span className="font-semibold">Remarks:</span>{' '}{post.remarks}</div>
                    </div>
                    <div className="mb-2">
                    <img src={post.imageURL} className="h-full w-3/5" />
                    </div>
                </div>
                <div className="flex bg-white col-span-1 row-span-1 h-auto w-full items-center">
                    <span className="w-6 h-6 text-gray-400 cursor-pointer">
                        <AiOutlineHeart />
                    </span>
                    <span className="w-6 h-6 text-gray-400 ml-8 cursor-pointer">
                        <AiOutlineRetweet />
                    </span>
                </div>
            </div>
        </div>
    </>
    )
}