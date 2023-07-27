import React from "react";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Posts } from "./components/Posts";
import { CreateOption } from "./components/CreateOption";
import { EditImage } from "./components/EditImage";
import { CreatePost } from "./components/CreatePost";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create" element={<CreateOption />} />
        <Route path="/edit" element={<EditImage />} />
        <Route path="/createpost" element={<CreatePost/>}/>
      </Routes>
    </div>
  );
}

export default App;
