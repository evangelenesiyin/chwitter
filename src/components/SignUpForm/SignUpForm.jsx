import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpService } from "../../utilities/users-service";
import { GoInfo } from "react-icons/go";
import { Tooltip } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpForm({ setUser, status, setStatus }) {
    const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    repeat: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'username') {
    const isUsernameValid = /^[a-z0-9]+$/.test(value);
    setUserData({
      ...userData,
      [name]: value,
      valid: isUsernameValid && isFormValid(),
    });
  } else if (name === 'email') {
    const isEmailValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value);
    setUserData({
      ...userData,
      [name]: value,
      valid: isEmailValid && isFormValid(),
    });
  } else {
    setUserData({
      ...userData,
      [name]: value,
      valid: isFormValid(),
    });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await signUpService(userData);
        if (user !== null && user !== undefined) {
            setUser(user);
            navigate("/start");
        }
    } catch (err) {
        setStatus("error");
        toast.error("Unable to create an account. Please reload the page and try again.")
    } finally {
        setStatus(null);
    }
  }

  const isFormValid = () => {
  return (
    userData.username &&
    /^[a-z0-9]+$/.test(userData.username) &&
    userData.email &&
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userData.email) &&
    userData.password &&
    userData.repeat &&
    userData.password === userData.repeat &&
    status !== 'error'
  );
};

    return(
        <div className="col-span-1 -ml-16">
            <form className="bg-darkred shadow-xl rounded-b-lg rounded-tr-lg px-8 py-8 mx-8" onSubmit={handleSubmit} autoComplete="off">
                <div className="pt-6">
                    <div className="flex items-center">
                    <label htmlFor="username" className="text-white text-lg ml-8">Username</label>
                    <span className="ml-1 text-white">
                        <Tooltip title="Please fill this field carefully. Your login username will also be used as your profile username.">
                        <GoInfo />
                        </Tooltip>
                        </span>
                    </div>
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
                        (userData.username !== "" && userData.username.length < 3) || userData.username.length > 20
                        ? "2px solid red"
                        : "",
                    }}
                    ></input>
                    {userData.username !== "" && (userData.username.length < 3 || userData.username.length > 20) && (
                    <div className="text-red-300 text-sm mx-8 -mb-2">Username must be between 3 to 20 characters. Letters and numbers only.</div>
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
                    {(userData.email !== "" && !userData.email.includes("@")) && (<div className="text-red-300 text-sm mx-8 -mb-2">example@yourdomain.com</div>)}
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