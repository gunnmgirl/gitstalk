import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledInput = styled.input`
  width: auto;
  height: 2rem;
  border: 0.03rem solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.primary};
  border-radius: 3%;
  font-size: 1rem;
  @media (min-width: 576px) {
    width: 17rem;
  }
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
  padding-left: 6.5rem;
`;

const SiteName = styled.span`
  display: none;
  color: ${(props) => props.theme.primary};
  @media (min-width: 576px) {
    display: block;
    font-size: 1.2rem;
    padding-right: 0.2rem;
  }
`;

const StyledForm = styled.div`
  display: flex;
  align-items: center;
`;

function SearchForm() {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(39, "Must be less than 40 characters")
      .required("Must be at least 1 character"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      history.push(`/${values.name}`);
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <StyledForm>
        <SiteName>github.com/</SiteName>
        <StyledInput
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Enter Github Username"
        />
        <StyledButton type="submit" onClick={formik.handleSubmit}>
          Search
        </StyledButton>
      </StyledForm>
      {formik.errors.name && formik.touched.name ? (
        <FormWarning>{formik.errors.name}</FormWarning>
      ) : null}
    </form>
  );
}

export default SearchForm;
