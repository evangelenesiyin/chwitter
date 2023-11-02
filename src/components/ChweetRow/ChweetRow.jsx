import debug from "debug";
import { useState } from "react";
import { Link } from "react-router-dom"
import { deletePostService } from "../../utilities/chweet-service";
import { deactivateService } from "../../utilities/users-service";
import EditChweet from "../EditChweet/EditChweet";
import formatDate from "../helpers/formatDate";
import { PiDotsThreeBold } from "react-icons/pi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Dropdown, Space, Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

const log = debug("chwitter:src:components:ChweetRow");

export default function ChweetRow({ user, post, fetchAllPosts }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const modalWidth = "40%";

  const showModal = () => {
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const adminItems = [
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
          handleDeactivate(post.user._id);
        }}
      >
        Deactivate User
      </a>
    ),
    key: '1',
  },
];

const userItems = [
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
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
        await fetchAllPosts();
         toast.success("Deleted Chweet successfully.");
      } catch (err) {
          log("Error deleting post:", err);
         toast.error("Unable to delete Chweet.");
      }
  };

const handleDeactivate = async () => {
  try {
    await deactivateService(post.user._id);
    toast.success("User successfully deactivated.")
  } catch (err) {
    log("Error deactivating user", err);
    toast.error("Unable to deactivate user.")
  }
}

const handleAddLike = async () => {
  try {
    if (!liked) {
    await addLikeService(post._id);
    setLikeCount(likeCount + 1);
    } else {
      await deleteLikeService(post._id);
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);
    toast.success(liked ? "Unliked Chweet" : "Liked Chweet");
  } catch (err) {
    log("Error toggling like:", err);
    toast.error("Unable to toggle like Chweet.")
  }
}


    return (
        <>
        <ToastContainer />
        <Modal title="Edit your Chweet" open={open} footer={null} confirmLoading={confirmLoading} onCancel={handleCancel} width={modalWidth}>
          <EditChweet post={post} setOpen={setOpen} setConfirmLoading={setConfirmLoading} fetchAllPosts={fetchAllPosts} />
        </Modal>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        >
        <div className="relative">
            <div
            className="grid grid-cols-2 grid-rows-3 gap-0 border border-gray-100 bg-white h-auto w-3/4 rounded-sm"
            style={{
            gridTemplateColumns: '15% 85%',
            gridTemplateRows: '30px auto 40px',
            }} >
                <div className="bg-white col-span-1 row-span-3 h-auto">
                    <Link to={`/${post.user.profile.username}`}><img
                    src={post?.user?.profile?.profilePicture}
                    className="rounded-full h-16 mx-auto mt-2"
                    /></Link>
                </div>
                <div className="flex bg-white col-span-1 row-span-1 w-full my-2">
                    <span className="font-bold"><Link to={`/${post.user.profile.username}`}>{post?.user?.profile?.displayName}</Link></span>&nbsp;
                    <span className="text-gray-400"><Link to={`/${post.user.profile.username}`}>{"@"}{post?.user?.profile?.username}</Link></span>&nbsp;
                    <span className="text-gray-400">·</span>&nbsp;
                    <span className="text-gray-400">{formatDate(post?.createdAt)}</span>
                    {user && (user.admin === true || post.user._id === user._id) ? (
                    <span className="ml-auto pr-4 text-gray-600 cursor-pointer">
                      <Dropdown menu={{ items: user.admin === true ? adminItems : userItems }}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <PiDotsThreeBold className="w-6 h-6"/>
                          </Space>
                        </a>
                      </Dropdown>
                    </span>
                  ) : null}
                </div>
                <div className="bg-white col-span-1 row-span-1 w-full">
                    <div className="my-2 font-light text-sm">
                    <div><span className="font-semibold">Type:</span>{' '}{post?.type}</div>
                    <div><span className="font-semibold">Breed:</span>{' '}{post?.breed}</div>
                    <div><span className="font-semibold">Gender:</span>{' '}{post?.gender}</div>
                    <div><span className="font-semibold">Sterilised:</span>{' '}{post?.sterilised}</div>
                    <div><span className="font-semibold">Contact:</span>{' '}{post?.contactDetails}</div>
                    <div><span className="font-semibold">Remarks:</span>{' '}{post?.remarks}</div>
                    </div>
                    <div className="">
                    <img src={post?.imageURL} className="h-full w-3/5" />
                    </div>
                </div>
                <div className="flex bg-white col-span-1 row-span-1 w-full items-center">
                    <span className=" text-gray-400 cursor-pointer" onClick={handleAddLike}>
                    {liked ? <AiFillHeart className="w-4 h-4" /> : <AiOutlineHeart className="w-4 h-4" />}
                  </span>
                    <span className=" text-gray-400 font-light text-xs ml-1 cursor-pointer">{likeCount}
                    </span>
                </div>
            </div>
        </div>
        </motion.div>
    </>
    )
}