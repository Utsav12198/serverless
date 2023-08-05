import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #4287f5;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const MainContent = styled.div`
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
`;

const IframeContainer = styled.div`
  width: 800px;
  height: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

const H1 = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const H3 = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #4287f5;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #4287f5;
  }
`;

const GameDashboard = () => {
  const navigate = useNavigate();

  const handleGamesClick = () => {
    navigate("/home/admin/games");
  };

  const handleQuestionsClick = () => {
    navigate("/home/admin/questions");
  };

  return (
    <Container>
      <Sidebar>
        <H3>Navigate</H3>
        <Button onClick={handleGamesClick}>Games</Button>
        <Button onClick={handleQuestionsClick}>Questions</Button>
      </Sidebar>
      <MainContent>
        <H1>Game Dashboard</H1>
        <IframeContainer>
          <Iframe src="https://lookerstudio.google.com/embed/reporting/08bd694e-e835-42da-a6ff-65e7e2676d3c/page/p_7dxcdh7i8c"></Iframe>
        </IframeContainer>
      </MainContent>
    </Container>
  );
};

export default GameDashboard;
