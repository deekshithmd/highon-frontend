import React from "react";
import styled from "styled-components";
import { Post } from "../Post";
import { usePosts } from "../../contexts/PostContext";

export const Posts = () => {
  const { singlePost, posts } = usePosts();
  return (
    <PostsContainer>
      <Post data={singlePost} />
      {posts?.map((post) => {
        return post?._id !== singlePost?._id && <Post data={post} />;
      })}
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
