import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpService } from "../../utilities/users-service";

export default function SignUpForm({ setUser }) {
    const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    repeat: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.repeat) {
        alert("Entered passwords do not match")
    }
    try {
        const user = await signUpService(userData);
        if (user !== null & user !== undefined) {
            alert("Sign up successful!")
            setUser(user);
            navigate("/home");
        }
    } catch (err) {
        if (err.message === "Unexpected end of JSON input") {
            alert("Please try again later.")
        } else {
            alert("Try again.")
        }
    }
  }

    return(
        <div className="col-span-1 -ml-16">
            <form className="bg-darkred shadow-xl rounded-b-lg rounded-tr-lg px-8 py-8 mx-8" onSubmit={handleSubmit} autoComplete="off">
                <div className="pt-6">
                    <label htmlFor="username" className="text-white text-lg mx-8">Username</label>
                </div>
                    <input
                    type="username"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Between 2 to 15 characters"
                    autoComplete="off"
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="email" className="text-white text-lg mx-8">Email Address</label>
                </div>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter a valid email address"
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="password" className="text-white text-lg mx-8">Password</label>
                </div>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Minimum 6 characters"
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="confirm-password" className="text-white text-lg mx-8">Confirm Password</label>
                </div>
                    <input
                    type="password"
                    id="repeat-password"
                    name="repeat"
                    value={userData.repeat}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Confirm your password"
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="mt-2">
                    <button type="submiit" className="border border-coral bg-coral text-white text-lg font-bold shadow-md rounded w-2/3 py-2 mx-16 my-8">Sign Up</button>
                </div>
            </form>
        </div>
    );
}