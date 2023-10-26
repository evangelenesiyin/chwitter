import { useState } from "react";
import SidePanel from "../../components/SidePanel/SidePanel";
import ChweetForm from "../../components/ChweetForm/ChweetForm";
import ChweetRow from "../../components/ChweetRow/ChweetRow";

export default function HomePage({ user, setUser }) {
    const [post, setPost] = useState([]);

    return (
        <main className="min-h-screen min-w-screen bg-beige p-0 m-0 grid" style={{ gridTemplateColumns: "40% 60%" }}>
        <SidePanel setUser={setUser}/>
        <div>
        <ChweetForm post={post} setPost={setPost} />
        {post.map((post) => (<ChweetRow key={post._id} post={post} />))}
        </div>
        </main>
    )
}