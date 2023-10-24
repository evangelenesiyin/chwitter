import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
    const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await loginService(credentials);
        if (user !== null && user !== undefined) {
            alert(`Welcome back ${user.username}!`);
            setUser(user);
            navigate("/home");
        }
    } catch (err) {
        if (err.message === "Unexpected end of JSON input") {
            alert("Please try again later.")
        } else {
            alert("Try again.");
            setCredentials({
                username: "",
                password: "",
            })
        }
    }
  }

    return (
        <div className="col-span-1 -ml-16">
            <form className="bg-darkred shadow-xl rounded-b-lg rounded-tr-lg px-8 py-8 mx-8" onSubmit={handleSubmit}>
                <div className="pt-6">
                    <label htmlFor="username" className="text-white text-lg mx-8">Username</label>
                </div>
                    <input
                    type="username"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="password" className="text-white text-lg mx-8">Password</label>
                </div>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    autoComplete="off"
                    onChange={handleChange}
                    required
                    className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="mt-2">
                    <button
                    type="submit"
                    className="border border-coral bg-coral text-white text-lg font-bold shadow-md rounded w-2/3 py-2 mx-16 my-8">Login</button>
                </div>
            </form>
        </div>
    )
}