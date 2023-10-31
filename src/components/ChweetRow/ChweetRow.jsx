import debug from "debug";
import { useState } from "react";
import { deletePostService } from "../../utilities/chweet-service";
import EditChweet from "../EditChweet/EditChweet";
import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns';
import { PiDotsThreeBold } from "react-icons/pi";
import { Dropdown, Space, Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

const log = debug("chwitter:src:components:ChweetRow");

export default function ChweetRow({ post, setPost, fetchAllPosts }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalWidth = "40%";

  const showModal = () => {
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const items = [
  {
    label: (
      <a
      target="_blank"
      rel="noopener noreferrer"
      href="/"
      >
        Save Post
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
        showModal();
      }}
      >
        Edit Text
      </a>
    ),
    key: '1',
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
    key: '2',
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
            gridTemplateRows: '30px 90% 30px',
            }} >
                <div className="bg-white col-span-1 row-span-3 h-auto">
                    <img
                    src={post?.user?.profile?.profilePicture}
                    className="rounded-full h-16 mx-auto mt-2"
                    />
                </div>
                <div className="flex bg-white col-span-1 row-span-1 w-full my-2">
                    <span className="font-bold">{post?.user?.profile?.displayName}</span>&nbsp;
                    <span className="text-gray-400">{"@"}{post?.user?.profile?.username}</span>&nbsp;
                    <span className="text-gray-400">·</span>&nbsp;
                    <span className="text-gray-400">{formatDistanceToNow(parseISO(post?.createdAt))} ago</span>
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
                    <div><span className="font-medium">Type:</span>{' '}{post?.type}</div>
                    <div><span className="font-semibold">Breed:</span>{' '}{post?.breed}</div>
                    <div><span className="font-semibold">Gender:</span>{' '}{post?.gender}</div>
                    <div><span className="font-semibold">Sterilised:</span>{' '}{post?.sterilised}</div>
                    <div><span className="font-semibold">Contact:</span>{' '}{post?.contactDetails}</div>
                    <div><span className="font-semibold">Remarks:</span>{' '}{post?.remarks}</div>
                    </div>
                    <div className="mb-2">
                    <img src={post?.imageURL} className="h-full w-3/5" />
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    </>
    )
}