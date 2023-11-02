import debug from "debug";
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from '../HomePage/HomePage';
import ErrorPage from '../ErrorPage/ErrorPage';
import HomePageHero from "../HomePage/HomePageHero";
import { getUser } from "../../utilities/users-service";
import { getAllPostsService } from "../../utilities/chweet-service";
import { getProfileInfoService } from "../../utilities/profile-service";
import './App.css';

const log = debug("chwitter:src:App");
localStorage.debug = "chwitter:*";

log("Start React");

function App() {
  const [user, setUser] = useState(getUser());
  const [profileInfo, setProfileInfo] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchAllPosts = async () => {
    const all = await getAllPostsService();
      setAllPosts(all);
  }

  const fetchProfileData = async () => {
    try {
      const profileInfo = await getProfileInfoService();
      setProfileInfo(profileInfo);
    } catch (err) {
      log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllPosts();
      fetchProfileData();
      if (location.pathname === "/") {
      navigate("/home");
    }
  }
}, [user, navigate, location]);

  return (
  <>
    {user ? (
      <>
    <NavBar />
        <Routes>
          <Route path="/home" element={<HomePage user={user} setUser={setUser} allPosts={allPosts} setAllPosts={setAllPosts} profileInfo={profileInfo} setProfileInfo={setProfileInfo} fetchAllPosts={fetchAllPosts} />} />
          <Route path="/start" element={<HomePageHero user={user} setUser={setUser} profileInfo={profileInfo} setProfileInfo={setProfileInfo} />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        </>
    ) : (
      <>
      <NavBar />
      <div className="bg-beige p-0 m-0 grid grid-cols-3">
        <div className="col-span-1 items-center justify-center h-screen flex">
          <div className="text-title text-white text-right font-fredoka break-words leading-tight mb-28 -mr-12">
            <div>FINDING</div> <div>HOMES FOR</div> <div>YOUR PETS</div> <div className="text-coral">@CHWITTER</div>
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
      </div>
      </>
    )}
  </>
);

}

export default App;
