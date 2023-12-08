import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;
const Spinner = styled.div`
  position: absolute;
  left: calc(50% - 24px);
  top: calc(50% - 24px);
  width: 48px;
  height: 48px;
  border-width: 5px;
  border-style: solid;
  border-top-color: rgb(0, 0, 0);
  border-left-color: rgb(0, 0, 0);
  border-right-color: rgb(0, 0, 0);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;
const Loading = ({ color, size, borderWidth, dimmed = true }) => {
  const dimmedStyle = {
    position: dimmed ? "fixed" : "absolute",
    backgroundColor: dimmed ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)",
    zIndex: dimmed ? "2000" : "900",
  };

  const spinnerStyle = {
    borderTopColor: color,
    borderRightColor: color,
    borderLeftColor: color,
    borderWidth: `${borderWidth}px`,
    width: `${size}px`,
    height: `${size}px`,
    left: `calc(50% - ${Number(size) / 2}px)`,
    top: `calc(50% - ${Number(size) / 2}px)`,
    color: dimmed ? "block" : "none",
  };

  return (
    <div style={dimmedStyle}>
      <Spinner className="loader" style={spinnerStyle}></Spinner>
    </div>
  );
};

export default Loading;
