import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import GithubIcon from "../icons/GitHub";

const Header = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.bold};
  font-weight: 600;
  font-size: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 17rem;
  height: 2rem;
  border: 0.03rem solid rgba(191, 191, 191, 0.5);
  border-radius: 3%;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.buttonText};
  border: 0.03rem solid rgba(191, 191, 191, 0.5);
  height: 2rem;
  font-size: 0.9rem;
`;

const FormWarning = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.warning};
  padding-left: 5.5rem;
`;

const SiteName = styled.span`
  font-size: 1rem;
`;

function Search() {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(39, "Must be less than 40 characters")
      .required("Must be at least 1 character"),
  });

  return (
    <Container>
      <Header>
        <GithubIcon size="3rem" />
        <h1>GITSTALK</h1>
      </Header>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          history.push(`/${values.name}`);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <SiteName>github.com/ </SiteName>
            <StyledInput
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Enter Github Username"
            />
            <StyledButton type="submit" onClick={handleSubmit}>
              Search
            </StyledButton>
            {errors.name && touched.name ? (
              <FormWarning>{errors.name}</FormWarning>
            ) : null}
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default Search;
