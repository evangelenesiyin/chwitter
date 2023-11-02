import { Collapse } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { logOutService } from "../../utilities/users-service";

const { Panel } = Collapse;

export default function SidePanel({ setUser, profileInfo }) {
    const navigate = useNavigate();
    
    const handleLogOut = (e) => {
        e.preventDefault();
        logOutService();
        setUser(null);
        navigate("/");
    }

    const items = [
        {
            key: '1',
            header: "Account",
            content: (
                <>
                    <Link to="/edit-profile">Edit Profile</Link>
                    <hr className="my-2" />
                    <Link to="/" onClick={handleLogOut}>Logout</Link>
                </>
            ),
        },
    ];

    return (
        <div className="relative">
            <div className="grid grid-rows-2 gap-4 h-auto w-full">
                <div className="bg-white w-1/2 rounded-sm ml-64 sm:ml-64 md:ml-64 lg:ml-64 xl:ml-64 2xl:ml-80">
                    <div className="h-20 bg-coral"></div>
                    <img src={profileInfo?.profilePicture || "./assets/grey.png"} alt="profile-image" className="w-28 h-28 rounded-full mx-auto -mt-12 object-cover" />
                    <div className="text-center px-4 py-2">
                        <p className="font-bold text-xl">{profileInfo?.displayName}</p>
                        <p className="text-gray-400 mb-2">{"@"}{profileInfo?.username}</p>
                        <p className="text-gray-400">{profileInfo?.bio}</p>
                        <Link to={`/${profileInfo?.username}`}><p className="mt-6 mb-2 font-bold text-base text-coral">View full profile</p></Link>
                    </div>
                </div>
                <div className="w-1/2 h-12 ml-64 sm:ml-64 md:ml-64 lg:ml-64 xl:ml-64 2xl:ml-80">
                    <Collapse accordion>
                        {items.map((item) => (
                            <Panel key={item.key} header={item.header} className="bg-white rounded-sm text-base font-bold">
                                {item.content}
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        </div>
    );
}
