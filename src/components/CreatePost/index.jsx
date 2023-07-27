import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { usePosts } from "../../contexts/PostContext";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import { ReactComponent as Food } from "../../assets/icons/food.svg";
import { ReactComponent as Camera } from "../../assets/icons/photo.svg";
import { ReactComponent as Gaming } from "../../assets/icons/gaming.svg";
import { ReactComponent as GamingBlue } from "../../assets/icons/gaming-select.svg";
import { ReactComponent as CameraBlue } from "../../assets/icons/camera-select.svg";
import { ReactComponent as FoodBlue } from "../../assets/icons/food-select.svg";
import { createPost } from "../../services/services";

export const CreatePost = () => {
  const [tagList, setTagList] = useState([]);
  const [play, setPlay] = React.useState(true);
  const {
    media,
    aspectRatio,
    setAspectRatio,
    description,
    setDescription,
    mediaType,
    userName,
    setPosts,
  } = usePosts();
  const videoRef = useRef();
  const navigate = useNavigate();

  const tags = [
    { icon: <Camera />, selectedIcon: <CameraBlue />, name: "Photography" },
    { icon: <Food />, selectedIcon: <FoodBlue />, name: "Food Vlogs" },
    { icon: <Gaming />, selectedIcon: <GamingBlue />, name: "Gaming" },
  ];

  const addPost = async () => {
    const res = await createPost({
      name: userName,
      description,
      media,
      mediaAspectRatio: aspectRatio,
      tags: tagList,
      likes: 0,
      likedBy: [],
      mediaType,
    });
    setPosts(res);
    setDescription("");
    setAspectRatio("1/1");
    setTagList([]);
    navigate("/");
  };

  const checkPresence = (tag) => {
    let isPresent = false;
    for (let i = 0; i < tagList.length; i++) {
      if (tag.name === tagList[i]) {
        isPresent = true;
        break;
      }
    }
    return isPresent;
  };

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
    <Container>
      <Header>
        <Back />
        <Button onClick={() => addPost()}>Post</Button>
      </Header>
      <PostContentContainer>
        {mediaType === "video" ? (
          <VideoTag
            src={media}
            aspect={aspectRatio}
            ref={videoRef}
            autoPlay
            loop
            muted
            onClick={handleVideo}
          />
        ) : (
          <Image src={media} alt="post" aspect={aspectRatio} />
        )}

        <Text color="#00b2e9" margin="0px 0px 10px 0px">
          Description
        </Text>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Text color="#00b2e9" margin="0px 0px 10px 0px">
          Add your vibetags
        </Text>
        <TagsContainer>
          {tags.map((tag, index) => {
            return (
              <Tag
                key={index}
                onClick={() =>
                  checkPresence(tag)
                    ? null
                    : setTagList((prev) => [...prev, tag.name])
                }
                background={checkPresence(tag) ? "#02BDF6" : null}
                color={checkPresence(tag) ? "#F7F7F7" : null}
              >
                {checkPresence(tag) ? tag.selectedIcon : tag.icon}
                <Text
                  size="12px"
                  style={{ paddingLeft: "10px", lineHeight: "0" }}
                >
                  {" "}
                  {tag.name}
                </Text>
              </Tag>
            );
          })}
        </TagsContainer>
      </PostContentContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 30px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.div`
  width: 118px;
  height: 38px;
  border-radius: 33px;
  background: #414141;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Image = styled.img`
  max-width: 67px;
  max-height: 65px;
  object-fit: cover;
  aspect-ratio: ${(props) => props.aspect};
  border-radius: 13px;
`;

const VideoTag = styled.video`
  width: 280px;
  height: auto;
  object-fit: cover;
  aspect-ratio: ${(props) => props.aspect};
  border-radius: 13px;
`;

const Text = styled.p`
  font-size: ${(props) => props.size || "16px"};
  margin:  ${(props) => props.margin || "0px"}
  color: ${(props) => props.color || "#7B7B7B"};
`;

const TextArea = styled.textarea`
  border-radius: 9px;
  resize: none;
  padding: 10px;
  outline: 1px solid #00b2e9;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 10px;
  row-gap: 5px;
`;

const Tag = styled.span`
  width: fit-content;
  min-width: 103px;
  height: auto;
  padding: 5px;
  border-radius: 15px;
  border: 1px solid #02bdf5;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background || "#FFFFFF"};
  color: ${(props) => props.color || "#000"};
  cursor: pointer;
`;
