import React, { createContext, useContext, useState } from "react";
import { getPosts } from "../services/services";

const PostContext = createContext({});

const PostContextProvider = ({ children }) => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("1/1");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("deekshith");
  const [thumbNail, setThumbNail] = useState("");
  const [singlePost, setSinglePost] = useState();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getPosts();
      setPosts(data);
      setIsLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    posts?.map((post) => {
      if (post?._id === singlePost?._id) {
        setSinglePost(post);
      }
      return null;
    });
  }, [posts]);

  const handleAddPost = () => {
    setShowAddPost(!showAddPost);
  };
  return (
    <PostContext.Provider
      value={{
        handleAddPost,
        showAddPost,
        setShowAddPost,
        media,
        setMedia,
        aspectRatio,
        setAspectRatio,
        description,
        setDescription,
        mediaType,
        setMediaType,
        posts,
        setPosts,
        userName,
        setUserName,
        thumbNail,
        setThumbNail,
        singlePost,
        setSinglePost,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePosts = () => useContext(PostContext);

export { PostContextProvider, usePosts };
