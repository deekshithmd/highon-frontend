import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { usePosts } from "../../contexts/PostContext";
import { ReactComponent as Back } from "../../assets/icons/back.svg";



export const EditImage = () => {
  const { media, aspectRatio, setAspectRatio, mediaType } = usePosts();
  const [play, setPlay] = React.useState(true);
  const videoRef = React.useRef(null);
  const navigate = useNavigate();


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
        <Back onClick={()=>navigate('/create')}/>
        <Button onClick={() => navigate("/createpost")}>Next</Button>
      </Header>
      <ImageContainer>
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
          <ImageTag src={media} alt="image" aspect={aspectRatio} />
        )}
      </ImageContainer>
      <DimentionFiltersContainer>
        <Text>Aspect Ratio</Text>
        <BoxContainer>
          <BoxInnerWrapper>
            <Box
              onClick={() => setAspectRatio("1/1")}
              borderColor={aspectRatio === "1/1" ? "#00B2E9" : "#707070"}
            />
            <Text color={aspectRatio === "1/1" ? "#00B2E9" : "#707070"}>
              1:1
            </Text>
          </BoxInnerWrapper>
          <BoxInnerWrapper>
            <Box
              width="30px"
              height="37px"
              borderColor={aspectRatio === "4/5" ? "#00B2E9" : "#707070"}
              onClick={() => setAspectRatio("4/5")}
            />
            <Text color={aspectRatio === "4/5" ? "#00B2E9" : "#707070"}>
              4:5
            </Text>
          </BoxInnerWrapper>
          <BoxInnerWrapper>
            <Box
              width="50px"
              height="28px"
              borderColor={aspectRatio === "16/9" ? "#00B2E9" : "#707070"}
              onClick={() => setAspectRatio("16/9")}
            />
            <Text color={aspectRatio === "16/9" ? "#00B2E9" : "#707070"}>
              16:9
            </Text>
          </BoxInnerWrapper>
        </BoxContainer>
      </DimentionFiltersContainer>
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
  margin-bottom:50px;
`;

const Button = styled.div`
  width: 118px;
  height: 38px;
  border-radius: 33px;
  background: #00b2e8;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 348px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:#EFEFEF;
  padding: 30px 0px;
`;

const ImageTag = styled.img`
  max-width: 280px;
  max-height: 285px;
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

const DimentionFiltersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Text = styled.span`
  font-size: 18px;
  margin-bottom: 20px;
  color: ${(props) => props.color || "#7B7B7B"};
`;

const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 30px;
`;

const BoxInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.span`
  width: ${(props) => props.width || "45px"};
  height: ${(props) => props.height || "45px"};
  border: 2px solid ${(props) => props.borderColor || "#707070"};
  border-radius: 7px;
`;
