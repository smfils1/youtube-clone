import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/auth";
import AuthForm from "./AuthForm";
import Container from "react-bootstrap/Container";
const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(registerUser(values));
  };

  return (
    <Container className="p-md-5">
      <h2 className="my-5">Register</h2>{" "}
      <AuthForm type="register" onSubmit={handleSubmit} />
    </Container>
  );
};

export default RegisterPage;
