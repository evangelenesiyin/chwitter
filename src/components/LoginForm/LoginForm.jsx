export default function LoginForm() {
    return (
        <div className="col-span-1 p-4 mt-48 -ml-16">
            <form className="bg-darkred shadow-md rounded px-8 py-8 h-96 mx-8">
                <div className="pt-6">
                    <label htmlFor="username" className="text-white text-lg">Username</label>
                </div>
                    <input type="text" className="border border-white w-96 py-1 px-20 mt-1 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="password" className="text-white text-lg">Password</label>
                </div>
                    <input type="text" className="border border-white w-96 py-1 px-20 mt-1 rounded"></input>
                <div className="mt-2">
                    <button className="border border-coral bg-coral text-white text-lg rounded py-2 px-28 mx-14 my-16">Login</button>
                </div>
            </form>
        </div>
    )
}