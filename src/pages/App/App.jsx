import debug from "debug";
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from '../HomePage/HomePage';
import HomePageHero from "../HomePage/HomePageHero";
import ErrorPage from '../ErrorPage/ErrorPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import EditProfile from "../../components/EditProfile/EditProfile"
import { getUser } from "../../utilities/users-service";
import { getAllPostsService } from "../../utilities/chweet-service";

const log = debug("chwitter:src:App");
localStorage.debug = "chwitter:*";

log("Start React");

function App() {
  const [user, setUser] = useState(getUser());
  const [profileInfo, setProfileInfo] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPostData = async () => {
    try {
      const allPosts = await getAllPostsService();
      setPost(allPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPostData();
      if (location.pathname === "/") {
      navigate("/home");
    }
  }
}, [user, navigate, location]);

  return (
    <>
    <NavBar />
    { user ? (
        profileInfo.length === 0 ? (
          <Routes>
            <Route path="/home" element={<HomePageHero setUser={setUser} setProfileInfo={setProfileInfo} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/home" element={<HomePage setUser={setUser} post={post} setPost={setPost} />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        )
      ) : (
      <>
    <main className="min-h-screen min-w-screen bg-beige p-0 m-0 grid grid-cols-3">
      <div className="col-span-1 items-center justify-center h-screen flex">
        <div className="text-title text-white text-right font-extrabold  break-words leading-tight mb-28">
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
        <SignUpForm setUser={setUser} status={status} setStatus={setStatus} />
        </TabPanel>
        <TabPanel>
        <LoginForm setUser={setUser} status={status} setStatus={setStatus} />
        </TabPanel>
      </Tabs>
    </main>
    </>
    )}
    </>
  )
}

export default App;
