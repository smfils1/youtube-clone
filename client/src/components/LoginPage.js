import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/auth";
import Container from "react-bootstrap/Container";
import AuthForm from "./AuthForm";
const LoginPage = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    await dispatch(loginUser(values, props.history));
  };

  return (
    <Container className="p-md-5">
      <h2 className="my-5">Login</h2>{" "}
      <AuthForm type="login" onSubmit={handleSubmit} />
    </Container>
  );
};

export default withRouter(LoginPage);
