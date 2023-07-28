import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { usePosts } from "../../contexts/PostContext";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import { ReactComponent as Gallery } from "../../assets/icons/gallery.svg";
import { ReactComponent as Camera } from "../../assets/icons/camera.svg";


export const CreateOption = () => {
  const navigate = useNavigate();
  const { setMedia, setMediaType, thumbNail, setThumbNail } = usePosts();

  const handleMedia = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setMedia(reader.result);
      var match = reader.result.match(/^data:([^/]+)\/([^;]+);/) || [];
      setMediaType(match[1]);
      navigate("/edit");
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <Container>
      <Header>
        <Back onClick={() => navigate("/")} />
      </Header>
      <OptionContainer>
        <label htmlFor="upload">
          <OptonItem>
            <Gallery />
            <Text>Pick from gallery</Text>{" "}
          </OptonItem>
          <Input
            type="file"
            name="fileinput"
            id="upload"
            accept="image/*, video/*"
            style={{ display: "none" }}
            onChange={handleMedia}
          />
        </label>

        <OptonItem>
          <Camera />
          <Text>Capture with camera</Text>
        </OptonItem>
      </OptionContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 30px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 50px;
`;

const OptonItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.span`
  font-size: 18px;
  margin-left: 20px;
`;

const Input = styled.input``;
