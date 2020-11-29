import styled from "styled-components";
import logo from "../logo.svg";

function Loading() {
  return (
    <div>
      <LoadingIMG src={logo} alt="logo" />
    </div>
  );
}

const LoadingIMG = styled.img`
  @media (prefers-reduced-motion: no-preference) {
    height: 50vmin;
    pointer-events: none;
    animation: App-logo-spin infinite 20s linear;
  }
`;

export default Loading;
