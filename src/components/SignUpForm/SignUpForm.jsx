export default function SignUpForm() {
    return(
        <div className="col-span-1 -ml-16">
            <form className="bg-darkred shadow-xl rounded-b-lg rounded-tr-lg px-8 py-8 mx-8">
                <div className="pt-6">
                    <label htmlFor="username" className="text-white text-lg mx-8">Username</label>
                </div>
                    <input type="text" className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="email" className="text-white text-lg mx-8">Email Address</label>
                </div>
                    <input type="text" className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="password" className="text-white text-lg mx-8">Password</label>
                </div>
                    <input type="text" className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="pt-6">
                    <label htmlFor="confirm-password" className="text-white text-lg mx-8">Confirm Password</label>
                </div>
                    <input type="text" className="border border-white w-4/5 py-1 px-2 mt-1 mx-8 rounded"></input>
                <div className="mt-2">
                    <button className="border border-coral bg-coral text-white text-lg font-bold shadow-md rounded w-2/3 py-2 mx-16 my-8">Sign Up</button>
                </div>
            </form>
        </div>
    );
}