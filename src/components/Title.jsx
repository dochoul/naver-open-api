import styled from "styled-components";
import { BROWSER_LARGE_SIZE, BROWSER_MEDIUM_SIZE } from "../constant";

const Heading1 = styled.h1`
  font-size: 2em;
  text-align: center;
  margin: 5% auto 2%;
  color: #03c75a;
  @media only screen and (min-width: ${BROWSER_MEDIUM_SIZE}) {
    font-size: 3em;
    margin: 3% auto 1.5%;
  }
  @media only screen and (min-width: ${BROWSER_LARGE_SIZE}) {
    font-size: 5em;
    font-weight: 900;
    margin: 2% auto 1%;
  }
`;

const Title = () => {
  return <Heading1>네이버 도서 검색</Heading1>;
};

export default Title;
