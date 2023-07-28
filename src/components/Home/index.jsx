import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Heart from "../../assets/icons/heart.svg";
import Liked from "../../assets/icons/liked.svg";
import { usePosts } from "../../contexts/PostContext";
import { handleLike } from "../../services/helpers";

export const Home = () => {
  const { posts, setPosts, userName, setSinglePost, isLoading } = usePosts();
  const navigate = useNavigate();

  const likePost = async (post) => {
    const result = await handleLike({ post, userName });
    setPosts(result);
  };

  return (
    <OuterGrid>
      {isLoading ? (
        <LoaderContainer>
          <h1>Loading Posts....</h1>
        </LoaderContainer>
      ) : (
        <>
          {posts?.map((post) => {
            const n = Math.floor(Math.random() * 3) + 1;
            return (
              <Container
                key={post?._id}
                className={
                  n === 1 ? "big" : n === 2 ? "vertical" : "horizontal"
                }
              >
                {post?.mediaType === "video" ? (
                  <VideoTag
                    src={post?.media}
                    aspect={post?.mediaAspectRatio}
                    autoPlay
                    loop
                    muted
                    onClick={() => {
                      setSinglePost(post);
                      navigate("/posts");
                    }}
                  />
                ) : (
                  <Image
                    src={post?.media}
                    alt="image"
                    aspect={post?.mediaAspectRatio}
                    onClick={() => {
                      setSinglePost(post);
                      navigate("/posts");
                    }}
                  />
                )}

                <Like
                  src={post?.likedBy?.includes(userName) ? Liked : Heart}
                  onClick={() => likePost(post)}
                  alt="like"
                />
              </Container>
            );
          })}
        </>
      )}
    </OuterGrid>
  );
};

const OuterGrid = styled.div`
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-rows: 150px;
  grid-gap: 5px;
  grid-auto-flow: dense;
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: ${(props) => props.aspect || "1/1"};
`;

const VideoTag = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: ${(props) => props.aspect};
`;

const Container = styled.div`
  &.horizontal{
    grid-column: span 2;
    position: relative;
  }

  &.vertical{
    grid-row: span 2;
    position: relative;
  }

  &.big{
    grid:column:span 2;
    grid-row:span 2;
    position:relative;
  }
`;

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Like = styled.img`
  position: absolute;
  right: 5px;
  bottom: 5px;
  cursor: pointer;
`;
