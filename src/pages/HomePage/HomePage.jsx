import SidePanel from "../../components/SidePanel/SidePanel";
import ChweetForm from "../../components/ChweetForm/ChweetForm";
import ChweetRow from "../../components/ChweetRow/ChweetRow";

export default function HomePage({ user, setUser, allPosts, setAllPosts, profileInfo, fetchAllPosts }) {

    return (
        <>
        <div className="min-h-screen min-w-screen bg-beige p-0 m-0 grid" style={{ gridTemplateColumns: "40% 60%" }}>
            <SidePanel setUser={setUser} profileInfo={profileInfo} />
            <div style={{ overflowY: "scroll", maxHeight: "100vh" }}>
                <div style={{ overflow: "hidden" }}>
                <ChweetForm allPosts={allPosts} setAllPosts={setAllPosts} profileInfo={profileInfo} fetchAllPosts={fetchAllPosts} />
                {allPosts.map((post) => (<ChweetRow key={post._id} user={user} post={post} fetchAllPosts={fetchAllPosts} />))}
                </div>
            </div>
        </div>
        </>
    )
}