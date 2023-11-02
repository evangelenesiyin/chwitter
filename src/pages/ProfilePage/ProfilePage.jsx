import FullProfile from "../../components/FullProfile/FullProfile"

export default function ProfilePage({ allPosts, profileInfo }) {

    return (
        <div className="min-h-screen min-w-screen bg-beige p-0 m-0">
            <FullProfile allPosts={allPosts} profileInfo={profileInfo} />
        </div>
    )
}