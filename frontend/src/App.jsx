import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function HomeLayout() {
  const [selectedTab, setSelectedTab] = useState("posts");

  return (
    <>
      <div className="d-flex">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <div className="flex-grow-1 mt-0 p-0">
          {selectedTab === "create" ? <CreatePost /> : <PostList />}
        </div>
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomeLayout />} />
      </Routes>
    </>
  );
}

export default App;
