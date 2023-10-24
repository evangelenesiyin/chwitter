export default function LoginForm() {
    return (
        <div className="col-span-1 mt-28 -ml-16">
            <form className="bg-darkred shadow-md rounded px-8 py-8 mx-8">
                <div className="pt-6">
                    <label htmlFor="username" className="text-white text-lg mx-8">Username</label>
                </div>
                    <input type="text" className="border border-white w-3/4 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="password" className="text-white text-lg mx-8">Password</label>
                </div>
                    <input type="text" className="border border-white w-3/4 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="mt-2">
                    <button className="border border-coral bg-coral text-white text-lg rounded w-2/3 py-2 mx-16 my-8">Login</button>
                </div>
            </form>
        </div>
    )
}