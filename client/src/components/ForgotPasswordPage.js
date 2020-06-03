import React from "react";
import { useDispatch } from "react-redux";

import { sendResetLink } from "../redux/actions/auth";
import AuthForm from "./AuthForm";
import Container from "react-bootstrap/Container";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(sendResetLink(values));
  };

  return (
    <Container className="p-md-5">
      <h2 className="my-5">Forgot Password</h2>{" "}
      <AuthForm
        type="forgot"
        submitBtnText="Send Reset link"
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default ForgotPasswordPage;
