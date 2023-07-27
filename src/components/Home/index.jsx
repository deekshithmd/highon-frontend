import React from "react";
import styled from "styled-components";
import Heart from "../../assets/icons/heart.svg";
import Liked from "../../assets/icons/liked.svg";
import { usePosts } from "../../contexts/PostContext";
import { updatePost } from "../../services/services";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { posts, setPosts, userName, setSinglePost } = usePosts();
  const navigate = useNavigate();

  const handleLike = async (post) => {
    let newData;
    if (post?.likedBy?.includes(userName)) {
      newData = {
        ...post,
        likes: post?.likes - 1,
        likedBy: post?.likedBy?.filter((user) => user !== userName),
      };
    } else {
      newData = {
        ...post,
        likes: post?.likes + 1,
        likedBy: post?.likedBy?.concat([userName]),
      };
    }
    try {
      const res = await updatePost({ id: post?._id, post: newData });
      setPosts(res);
    } catch (e) {
      console.log("error occured", e);
    }
  };

  return (
    <OuterGrid>
      {/* <Big>
        <Image src={Image1} alt="image" />
        <Like src={Heart} alt="like" />
      </Big>
      <Horizontal>
        <Image src={Image2} alt="image" />
        <Like src={Heart} alt="like" />
      </Horizontal>
      <Vertical>
        <Image src={Image3} alt="image" />
        <Like src={Heart} alt="like" />
      </Vertical>
      <Horizontal>
        <Image src={Image4} alt="image" />
        <Like src={Heart} alt="like" />
      </Horizontal>
      <Vertical>
        <Image src={Image3} alt="image" />
        <Like src={Heart} alt="like" />
      </Vertical>
      <Big>
        <Image src={Image1} alt="image" />
        <Like src={Heart} alt="like" />
      </Big>
      <Horizontal>
        <Image src={Image2} alt="image" />
        <Like src={Heart} alt="like" />
      </Horizontal>
      <Vertical>
        <Image src={Image3} alt="image" />
        <Like src={Heart} alt="like" />
      </Vertical>
      <Horizontal>
        <Image src={Image4} alt="image" />
        <Like src={Heart} alt="like" />
      </Horizontal>
      <Vertical>
        <Image src={Image3} alt="image" />
        <Like src={Heart} alt="like" />
      </Vertical> */}
      {posts?.map((post) => {
        const n = Math.floor(Math.random() * 3) + 1;
        return (
          <Container
            key={post?._id}
            className={n === 1 ? "big" : n === 2 ? "vertical" : "horizontal"}
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
              onClick={() => handleLike(post)}
              alt="like"
            />
          </Container>
        );
      })}
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
  border-radius: 13px;
`;

const Container = styled.div`
  background:#CECECE;
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

// const Vertical = styled.div`
//   grid-row: span 2;
//   position: relative;
// `;

// const Big = styled.div`
//   grid:column:span 2;
//   grid-row:span 2;
//   position:relative;
// `;

const Like = styled.img`
  position: absolute;
  right: 5px;
  bottom: 5px;
  cursor: pointer;
`;
