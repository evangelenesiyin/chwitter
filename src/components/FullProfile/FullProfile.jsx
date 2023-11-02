import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { getAllPostsService } from "../../utilities/chweet-service";
import { useEffect } from "react";

export default function FullProfile() {
    const { username } = useParams();
    const [user, setUser] = useState(getUser());
    const [allPosts, setAllPosts] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);
    const [findProfile, setFindProfile] = useState(null);

const fetchAllPosts = async () => {
    const all = await getAllPostsService();
    setAllPosts(all);
}

useEffect(() => {
    fetchAllPosts();
}, user);

useEffect(() => {
    const profiles = allPosts.user.profile;
    setUserProfiles(profiles);

    const userProfile = profiles.find(profile => profile.username === username);

    if (userProfile) {
        setFindProfile(userProfile.user.profile);
    } else {
        setFindProfile(null);
    }
}, [allPosts, username]);

console.log(allPosts);

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-rows-2 h-auto w-1/2 mt-4">
                <div className="bg-white rounded-sm mx-8">
                            <div className="h-20 bg-coral"></div>
                            <img src={findProfile.profilePicture} alt="profile-image" className="w-28 h-28 rounded-full mx-auto -mt-12 object-cover" />
                            {/* <div className="text-center px-4 py-2">
                                <p className="font-bold text-xl">{allPosts.user.profile.displayName}</p>
                                <p className="text-gray-400 mb-2">{"@"}{allPosts.user.profile.username}</p>
                                <p className="text-gray-400">{allPosts.user.profile.bio}</p>
                            </div> */}
                </div>
            </div>
        </div>
    );
}