import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthMessage } from "../redux/actions/auth";
import { capitalize, isString, isPlainObject } from "lodash";

const alertMessage = ({ error, success }) => {
  if (success) {
    return <Alert variant="success">{success}</Alert>;
  } else if (error && isString(error)) {
    return <Alert variant="danger">{error}</Alert>;
  } else if (error && isPlainObject(error)) {
    const errors = Object.values(error);

    return errors.map((err, index) => {
      return (
        <Alert key={index} variant="danger">
          {err}
        </Alert>
      );
    });
  }
};

const AuthForm = ({ type, onSubmit, submitBtnText }) => {
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthMessage());
  }, []);

  const form = (type) => {
    const validation = {};
    const initialValues = {};
    if (["login", "forgot", "register"].includes(type)) {
      initialValues.email = "";
      validation.email = Yup.string()
        .email("Email is invalid")
        .required("Email is required");
    }
    if (["login"].includes(type)) {
      initialValues.password = "";
      validation.password = Yup.string().required("Password is required");
    }
    if (["register"].includes(type)) {
      initialValues.name = "";
      validation.name = Yup.string().required("Name is required");
    }
    if (["reset", "register"].includes(type)) {
      initialValues.password = "";
      validation.password = Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required");
    }
    return { validationSchema: Yup.object().shape(validation), initialValues };
  };
  const validationSchema = form(type).validationSchema;
  const initialValues = form(type).initialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
        <Form onSubmit={handleSubmit}>
          {["register"].includes(type) && (
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && errors.name}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {["login", "forgot", "register"].includes(type) && (
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {["login", "reset", "register"].includes(type) && (
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {["login"].includes(type) && (
            <NavLink to="/forgot" className="text-dark">
              <p>Forgot Password?</p>
            </NavLink>
          )}
          {alertMessage(auth.message)}
          <Button type="submit" disabled={isSubmitting}>
            {submitBtnText || capitalize(type)}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
