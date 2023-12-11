import Register from "./pages/registerPage/Register";
import Login from "./pages/loginPage/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Enhancement from "./pages/enhancement/Enhancement";
import Restoration from "./pages/restoration/Restoration";

import Homepage from "./pages/homePage/Homepage";
import Profile from "./pages/profilePage/Profile";
// import CreateBlog from "./pages/createBlogPage/CreateBlog";
import Users from "./pages/registerd/registeredUsers";
// import MyBlogs from "./pages/ownBlogs/OwnBlogs";
// import EditBlog from "./pages/editBlog/EditBlog";
// import FullBlog from "./pages/viewFullBlog/FullBlog";
 //import AuthorProfile from "./pages/singleAuthorProfile/AuthorProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enhance" element={<Enhancement />} />
        <Route path="/restore" element={<Restoration />} />
        {/* <Route path="/dashboard/:pagenumber" element={<Dashboard />} /> */}
        <Route path="/" element={<Homepage/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registeredusers" element={<Users/>} />
        {/* <Route path="/blogs/create" element={<CreateBlog />} /> */}
        {/* <Route path="/users/:username" element={<AuthorProfile />} /> */}
        {/* <Route path="/blogs/users/:username" element={<MyBlogs />} />
        <Route path="/blogs/:blogId/edit" element={<EditBlog />} />
        <Route path="/blogs/:blogId" element={<FullBlog />} /> */}
      </Routes>
    </>
  );
}

export default App;