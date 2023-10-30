import SidePanel from "../../components/SidePanel/SidePanel";
import ChweetForm from "../../components/ChweetForm/ChweetForm";
import ChweetRow from "../../components/ChweetRow/ChweetRow";
import HomePageHero from "./HomePageHero";

export default function HomePage({ setUser, post, setPost, profileInfo, setProfileInfo, fetchPostData }) {

    return (
        <>
        {profileInfo.displayName === "" ? (<HomePageHero setUser={setUser} profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
        ) : (<div className="min-h-screen min-w-screen bg-beige p-0 m-0 grid" style={{ gridTemplateColumns: "40% 60%" }}>
        <SidePanel setUser={setUser} profileInfo={profileInfo} />
        <div>
        <ChweetForm post={post} setPost={setPost} profileInfo={profileInfo} />
        {post.map((post) => (<ChweetRow key={post._id} post={post} setPost={setPost} profileInfo={profileInfo} fetchPostData={fetchPostData} />))}
        </div>
        </div>)
    }
        </>
    )
}