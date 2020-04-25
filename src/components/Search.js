import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

function Search() {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(39, "Must be less than 40 characters")
      .required("Must be at least 1 character"),
  });

  return (
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
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Enter Github Username"
          />
          <button type="submit" onClick={handleSubmit}>
            Search
          </button>
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
        </form>
      )}
    </Formik>
  );
}

export default Search;
