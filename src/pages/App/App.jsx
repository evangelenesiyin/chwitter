import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from '../HomePage/HomePage';
import ErrorPage from '../ErrorPage/ErrorPage';
import ProfilePage from '../ProfilePage/ProfilePage';

function App() {

  return (
    <>
      <NavBar />
    <main className="min-h-screen min-w-screen bg-beige p-0 m-0 grid grid-cols-3">
      <div className="col-span-1 items-center justify-center h-screen flex">
        <div className="text-title text-white text-right font-extrabold  break-words leading-tight mb-16">
        <span>EXPRESS</span> <span>YOURSELF</span> <span>WITH</span> <span className="text-black">CHWITTER</span>
        </div>
      </div>
        <div className="col-span-1 items-center justify-center h-screen flex">
        <img src="./assets/landingphoto.png" alt="Image" className="mx-auto mt-22 w-3/4" />
        </div>
      <Tabs>
        <TabList>
          <Tab>Sign Up</Tab>
          <Tab>Login</Tab>
        </TabList>
        <TabPanel>
        <SignUpForm />
        </TabPanel>
        <TabPanel>
        <LoginForm />
        </TabPanel>
      </Tabs>
    </main>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/username" element={<ProfilePage />} />
    </Routes>
    </>
  )
}

export default App;
