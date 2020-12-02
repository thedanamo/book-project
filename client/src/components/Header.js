import logo from "../logo.svg";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const { user, setUserLoggingInfo } = useContext(AuthContext);

  const [loginInfo, setLoginInfo] = useState({});

  const attemptLogin = () => {
    setUserLoggingInfo({ ...loginInfo });
  };

  return (
    <StyledHeader>
      {!user ? (
        <LoginSection>
          <LoginContainer>
            Username:{" "}
            <input
              onChange={(e) => {
                setLoginInfo({ ...loginInfo, username: e.target.value });
              }}
              type="text"
              placeholder="Username"
            />
            Password:{" "}
            <input
              onChange={(e) => {
                setLoginInfo({ ...loginInfo, password: e.target.value });
              }}
              type="text"
              placeholder="Password"
            />
          </LoginContainer>
          <StyledButton
            variant="primary"
            onClick={() => {
              attemptLogin();
            }}
          >
            Login
          </StyledButton>
        </LoginSection>
      ) : (
        <h4>{user.username}</h4>
      )}
      <StyledLogo src={logo} className="App-logo" alt="logo" />
      <div></div>
    </StyledHeader>
  );
};

export default Header;

const StyledLogo = styled.img`
  position: absolute;
  left: 0px;
  right: 0px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledHeader = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: white;
  padding: 5px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginSection = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  max-height: 50px;
  max-width: 100px;
  margin: 5px;
`;
