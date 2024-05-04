import { Routes, Route } from "react-router-dom";
import MainAuth from "./features/auth/MainAuth";
import LayoutAuth from "./features/auth/LayoutAuth";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";
import UploadProfileImage from "./features/auth/UploadProfileImage";
import CompleteInfo from "./features/auth/CompleteInfo";
import RequireRegister from "./protectedHooks/RequireRegister";
import RequireAuth from "./protectedHooks/RequireAuth";
import PersistLogin from "./protectedHooks/PersistLogin";
import Navbar from "./features/user/content/Navbar";
import ExpContent from "./features/user/content/ExpContent";
import ReUsername from "./features/user/UpdateUser.jsx/ReUsername";
import ReEmail from "./features/user/UpdateUser.jsx/ReEmail";
import RePassword from "./features/user/UpdateUser.jsx/RePassword";
import ReName from "./features/user/UpdateUser.jsx/ReName";
import Profile from "./features/user/content/Profile";
import Posts from "./features/user/content/Posts";
import Messenger from "./features/user/content/Messenger";

function App() {
  return (
    <Routes>
      {/* Start Routes for Auth */}
      <Route path="/" element={<LayoutAuth />}>
        {/* Basics Routes */}
        <Route index element={<MainAuth />} />
        <Route path="signup" element={<SignUp />} />

        {/* must have basic user info to add image  */}
        <Route element={<RequireRegister />}>
          <Route path="uploadprofileimage" element={<UploadProfileImage />} />
        </Route>

        {/* Must signup with google to Complete info for add user */}
        <Route element={<RequireRegister />}>
          <Route path="completeinfo" element={<CompleteInfo />} />
        </Route>

        <Route path="signin" element={<SignIn />} />
        {/* end  routes of register  */}
      </Route>
      {/* End Routes for Auth */}

      {/* Start Routes for Content User */}
      {/* Make PersistLogin for when reload page not redirect to def page*/}
      <Route element={<PersistLogin />}>
        {/* Must have accessToken  that mean user is exist in database*/}
        <Route element={<RequireAuth />}>
          {/* Parent of Content */}
          <Route path="content" element={<Navbar />}>
            {/* Content aside and published */}
            <Route index element={<ExpContent />} />
            {/* Edit User info */}
            <Route path="update-username" element={<ReUsername />} />
            <Route path="update-email" element={<ReEmail />} />
            <Route path="update-password" element={<RePassword />} />
            <Route path="update-name" element={<ReName />} />
            {/* Edit User info */}

            <Route path="profile" element={<Profile />}>
              <Route path=":id" element={<Profile />} />
            </Route>
            <Route path="posts" element={<Posts />}>
              <Route path=":id" element={<Posts />} />
            </Route>
            <Route path="messenger" element={<Messenger />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<h1 style={{ color: "#fff" }}>NO Content</h1>} />
    </Routes>
  );
}

export default App;
