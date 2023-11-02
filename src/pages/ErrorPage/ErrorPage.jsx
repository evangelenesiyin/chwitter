import { TfiDirectionAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="min-h-screen min-w-screen bg-beige">
            <div className="flex justify-center items-center h-screen text-center text-5xl font-bold text-darkred">
                <div className="mb-40">
                <TfiDirectionAlt className="w-12 h-12 mx-auto"/><br />
                Uh oh... Page not found. <br />
                Are you lost?<br /><br />
                <div className="flex text-2xl justify-center items-center"><Link to="/home" className="border border-coral bg-coral py-2 px-4 w-auto text-white rounded-lg">Return to Home</Link></div>
                </div>
            </div>
            </div>
    )
}