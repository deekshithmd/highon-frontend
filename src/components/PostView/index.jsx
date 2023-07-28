import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Avatar from "../../assets/images/avatar.jpg";
import Share from "../../assets/icons/share.svg";
import Heart from "../../assets/icons/heart.svg";
import Liked from "../../assets/icons/liked.svg";
import Back from "../../assets/icons/back-white.svg";
import { usePosts } from "../../contexts/PostContext";
import { handleLike } from "../../services/helpers";

export const PostView = ({ post }) => {
  const navigate = useNavigate();
  const { setPosts, userName } = usePosts();

  const likePost = async (post) => {
    const result = await handleLike({ post, userName });
    setPosts(result);
  };

  return (
    <PostContainer>
      <InnerContainer>
        <Icon
          src={Back}
          bottom="93%"
          right="88%"
          onClick={() => {navigate("/")}}
        />
        {post?.mediaType === "video" ? (
          <VideoTag
            src={post?.media}
            aspect={post?.mediaAspectRatio}
            autoPlay
            loop
          />
        ) : (
          <Image src={post?.media} />
        )}

        <Icon
          src={post?.likedBy?.includes(userName) ? Liked : Heart}
          onClick={() => likePost(post)}
          bottom="200px"
        />
        <Icon src={Share} bottom="150px" />
        <ProfileContainer>
          <UserDataContainer>
            <ProfileIcon src={Avatar} alt="profile" />
            <ProfileTextContainer>
              <Text fontSize="12px">{post?.name}</Text>
              <Text>Mangalore, 20min ago</Text>
            </ProfileTextContainer>
          </UserDataContainer>
          <DiscriptionContainer>
            <Text fontSize="12px">
              {post?.description?.length > 95
                ? post?.description?.slice(0, 95) + "..."
                : post?.description}
            </Text>
          </DiscriptionContainer>
        </ProfileContainer>
      </InnerContainer>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  max-width: 100vw;
  height: 500px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    max-width: 100vw;
    height: 650px;
  }
`;

const InnerContainer = styled.div`
  width: max-content;
  height: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 300px;
  height: 100%;
  aspect-ratio: ${(props) => props.aspect || "4/5"};
  object-fit: cover;
  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

const VideoTag = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: ${(props) => props.aspect};
  border-radius: 13px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  bottom: 10px;
  right: 0px;
`;

const UserDataContainer = styled.div`
  display: flex;
`;

const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  overflow: hidden;
  margin-right: 10px;
`;

const ProfileTextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Text = styled.span`
font-size:${(props) => props.fontSize || "10px"};
color:${(props) => props.fontColor || "#fff"}};
`;

const DiscriptionContainer = styled.div`
  padding: 0px 10px 10px 0px;
  line-height: 0.8;
`;

const Icon = styled.img`
  position: absolute;
  right: ${(props) => props.right || "25px"};
  bottom: ${(props) => props.bottom || "5px"};
  cursor: pointer;
  z-index:5;
`;
