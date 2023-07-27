import React, { useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "../../assets/images/avatar.jpg";

export const Post = ({ data }) => {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(true);

  const handleVideo = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };

  return (
    <PostCard>
      <ProfileContainer>
        <UserDataContainer>
          <ProfileIcon src={Avatar} alt="profile" />
          <ProfileTextContainer>
            <Text>{data?.name}</Text>
            <Text>Mangalore, 20min ago</Text>
          </ProfileTextContainer>
        </UserDataContainer>
        <More>...</More>
      </ProfileContainer>
      {data?.mediaType === "video" ? (
        <VideoTag
          src={data?.media}
          aspect={data?.mediaAspectRatio}
          ref={videoRef}
          autoPlay
          loop
          onClick={handleVideo}
        />
      ) : (
        <PostMedia src={data?.media} alt="media" />
      )}

      <PostDataContainer>
        <ProfilesIndicator zIndex={0}>
          <ProfileIcon src={Avatar} alt="profile" />
        </ProfilesIndicator>
        <ProfilesIndicator zIndex={1}>
          <ProfileIcon src={Avatar} alt="profile" />
        </ProfilesIndicator>
        <ProfilesIndicator zIndex={2}>
          <ProfileIcon src={Avatar} alt="profile" />
        </ProfilesIndicator>
        <Text>{data?.name} and {data?.likes} others emoted</Text>
      </PostDataContainer>
      <DiscriptionContainer>
        <Text>{data?.description}</Text>
      </DiscriptionContainer>
    </PostCard>
  );
};

const PostCard = styled.div`
  height: 354px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 15px;
  border: 1px solid black;
`;
const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
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

const PostMedia = styled.img`
  width: 100%;
  height: 202px;
  object-fit: cover;
`;

const VideoTag = styled.video`
  width: auto;
  height: 202px;
  object-fit: cover;
  aspect-ratio: ${(props) => props.aspect};
  border-radius: 13px;
`;

const Text = styled.span`
font-size:${(props) => props.fontSize || "10px"};
color:${(props) => props.fontColor || "#000"}};
`;

const More = styled.span`
  font-size: 16px;
`;

const PostDataContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  padding-left: 30px;
`;

const ProfilesIndicator = styled.div`
  display: flex;
  margin: 0px 0px 0px -27px;
  z-index: 4 - ${(props) => props.zIndex};
`;

const DiscriptionContainer = styled.div`
  padding: 0px 10px 10px;
  line-height: 0.8;
`;
