import SidePanel from "../../components/SidePanel/SidePanel";
import ChweetForm from "../../components/ChweetForm/ChweetForm";
import ChweetRow from "../../components/ChweetRow/ChweetRow";
import HomePageHero from "./HomePageHero";

export default function HomePage({ setUser, allPosts, setAllPosts, profileInfo, setProfileInfo, fetchAllPosts }) {

    return (
        <>
        {!profileInfo ? (<HomePageHero setUser={setUser} profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
        ) : (<div className="min-h-screen min-w-screen bg-beige p-0 m-0 grid" style={{ gridTemplateColumns: "40% 60%" }}>
        <SidePanel setUser={setUser} profileInfo={profileInfo} />
        <div>
        <ChweetForm allPosts={allPosts} setAllPosts={setAllPosts} profileInfo={profileInfo} fetchAllPosts={fetchAllPosts} />
        {allPosts.map((post) => (<ChweetRow key={post._id} post={post} fetchAllPosts={fetchAllPosts} />))}
        </div>
        </div>)
    }
        </>
    )
}