import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="bg-beige">
            <Link to="/"><img src="./assets/chwitterlogo.png" alt="Chwitter" className="h-10 pl-2 pt-2" /></Link>
        </div>
    )
}