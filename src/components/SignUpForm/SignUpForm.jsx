import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpService } from "../../utilities/users-service";

export default function SignUpForm({ setUser, status, setStatus }) {
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
    try {
        const user = await signUpService(userData);
        if (user !== null & user !== undefined) {
            setUser(user);
            navigate("/home");
        }
    } catch (err) {
        setStatus("error");
    } finally {
        setStatus(null);
    }
  }

  const isFormValid = () => {
    return userData.username && userData.email && userData.password && userData.repeat && userData.password === userData.repeat && status !== "error";
  };

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
                    autoComplete="off"
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"
                    style={{
                    border:
                        (userData.username !== "" && userData.username.length < 2) || userData.username.length > 15
                        ? "2px solid red"
                        : "",
                    }}
                    ></input>
                    {userData.username !== "" && (userData.username.length < 2 || userData.username.length > 15) && (
                    <div className="text-red-300 text-sm mx-8 -mb-2">Username must be between 2 to 15 characters</div>
                    )}
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
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"
                    style={{
                        border:
                        userData.email !== "" && !userData.email.includes("@") ? "2px solid red" : ""
                    }}
                    ></input>
                    {(userData.email !== "" && !userData.email.includes("@")) && (<div className="text-red-300 text-sm mx-8 -mb-2">Email address must contain '@'</div>)}
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
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"
                    style={{
                        border: userData.password !== "" && userData.password.length < 6 ? "2px solid red" : ""
                    }}
                    ></input>
                    {(userData.password !== "" && userData.password.length < 6) && (
                    <div className="text-red-300 text-sm mx-8 -mb-2">Password must be at least 6 characters</div>
                    )}
                <div className="pt-6">
                    <label htmlFor="confirm-password" className="text-white text-lg mx-8">Repeat Password</label>
                </div>
                    <input
                    type="password"
                    id="repeat-password"
                    name="repeat"
                    value={userData.repeat}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"
                    style={{
                        border: userData.password.length >= 6 && userData.repeat !== "" && userData.password !== userData.repeat ? "2px solid red" : ""
                    }}
                    ></input>
                    {(userData.password.length >= 6 && userData.repeat !== "" && userData.password !== userData.repeat) && (<div className="text-red-300 text-sm mx-8 -mb-2">Both passwords are not the same</div>
                    )}
                <div className="mt-2">
                    <button
                    type="submit"
                    className="border border-coral bg-coral text-white text-lg font-bold shadow-md rounded w-2/3 py-2 mx-16 my-8"
                    style={{
                    background: isFormValid() ? '' : 'darkgrey',
                    border: isFormValid() ? 'none' : '2px solid darkgrey',
                    cursor: isFormValid() ? '' : "not-allowed",
                    }}
                    >Sign Up</button>
                    {status === "error" && (
                    <div className="text-red-300 text-sm mx-8">An error occurred. Please try again later.</div>
                    )}
                </div>
            </form>
        </div>
    );
}