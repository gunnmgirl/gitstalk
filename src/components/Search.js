import React from "react";
import styled from "styled-components";

import GithubIcon from "../icons/GitHub";
import SearchForm from "./SearchForm";

const Header = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.bold};
  font-weight: 600;
  font-size: 2rem;
  @media (min-width: 576px) {
    flex-direction: row;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Search() {
  return (
    <Container>
      <Header>
        <GithubIcon size="4rem" />
        <h1>GITSTALK</h1>
      </Header>
      <SearchForm />
    </Container>
  );
}

export default Search;
