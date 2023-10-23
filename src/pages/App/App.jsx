import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

function App() {

  return (
    <main className="min-h-screen min-w-screen bg-beige p-0 m-0 grid grid-cols-3 gap-4">
      <div className="col-span-1 p-4">
        <div className="text-8xl text-white text-right font-extrabold mt-52 mb-4">EXPRESS<br /> YOURSELF<br /> WITH<br /><span className="text-black">CHWITTER</span></div>
      </div>
        <div className="col-span-1 mt-4">
        <img src="./assets/landingphoto.jpeg" alt="Image" className="-ml-8" />
        </div>
      <LoginForm />
      <SignUpForm />
    </main>
  )
}

export default App;
