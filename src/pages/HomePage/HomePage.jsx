import { Link, useNavigate } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";

export default function HomePage({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogOut = (e) => {
        e.preventDefault();
        logOutService();
        setUser(null);
        navigate("/");
    }

    return (
        <>
        <h1>Home Page</h1>
        <Link to="/" onClick={handleLogOut} className="text-lg">
        Logout
        </Link>
        </>
    )
}