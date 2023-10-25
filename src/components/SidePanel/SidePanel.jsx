import { Collapse } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { logOutService } from "../../utilities/users-service";

const { Panel } = Collapse;

export default function SidePanel({ setUser }) {
    const navigate = useNavigate();
    
    const handleLogOut = (e) => {
        e.preventDefault();
        logOutService();
        setUser(null);
        navigate("/");
    }

    return (
        <div className="relative">
            <div className="grid grid-rows-2 gap-4 h-full ml-64 mt-6">
                <div className="bg-white w-5/6 rounded-lg">
                    <img src="./assets/placeholderimg.jpeg" alt="header-image" className="h-44 w-full object-cover rounded-t-lg" />
                    <img src="./assets/placeholder2.jpeg" alt="profile-image" className="w-1/3 rounded-full mx-auto -mt-12" />
                    <div className="text-center px-4 py-2">
                        <p className="font-bold text-xl">catlover123</p>
                        <p className="text-gray-400 mb-2">@user123</p>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor velit, maximus vitae consectetur eu, viverra eu ipsum.</p>
                        <p className="mt-4 font-bold text-base">View full profile</p>
                    </div>
                </div>
                <div className="w-5/6 h-12">
                    <Collapse accordion>
                        <Panel header="Account" key="1" className="border border-white bg-white rounded-lg text-base font-bold">
                        <Link to="/">Edit profile</Link>
                        <hr className="my-2" />
                        <Link to="/" onClick={handleLogOut}>
                        Logout
                        </Link>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}
