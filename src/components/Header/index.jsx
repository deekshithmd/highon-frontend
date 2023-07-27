import React from "react";
import styled from "styled-components";
import Logo from "../../assets/logo/highon.png";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Post } from "../../assets/icons/post.svg";
import { ReactComponent as Story } from "../../assets/icons/story.svg";
import { ReactComponent as Add } from "../../assets/icons/addPost.svg";
import { usePosts } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { handleAddPost, showAddPost, setShowAddPost } = usePosts();
  const navigate = useNavigate();

  const openAddPost = () => {
    setShowAddPost(false);
    navigate("/create");
  };

  const openHome = () => {
    setShowAddPost(false);
    navigate("/");
  };

  return (
    <>
      <HeaderContainer>
        <img
          src={Logo}
          alt="logo"
          height="40px"
          width="84px"
          onClick={openHome}
          style={{ cursor: "pointer" }}
        />
        <ActionContainer>
          <Add onClick={handleAddPost} style={{ cusrsor: "pointer" }} />
        </ActionContainer>
      </HeaderContainer>
      {showAddPost && (
        <ModalContainer>
          <CreatePostModal>
            <CloseModal>
              <Close onClick={handleAddPost} style={{ cursor: "pointer" }} />
            </CloseModal>
            <CreateItem onClick={openAddPost}>
              <Post /> <Text>Create Post</Text>
            </CreateItem>
            <CreateItem>
              <Story />
              <Text>Create Story</Text>
            </CreateItem>
          </CreatePostModal>
        </ModalContainer>
      )}
    </>
  );
};

const HeaderContainer = styled.div`
  max-width: 100vw;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  position:fixed:
  top:0px;
  right:0px;
  
`;

const ActionContainer = styled.div``;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  opacity: 1;
  z-index: 1;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CreatePostModal = styled.div`
  width: 250px;
  padding: 10px;
  background: #d0d0d0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 25px;
  z-index: 3;
`;

const CloseModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  alig-items: center;
`;

const CreateItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px 10px;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 18px;
  margin-left: 20px;
`;
