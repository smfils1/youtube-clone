import React from "react";
import { useDispatch } from "react-redux";

import { resetPassword } from "../redux/actions/auth";
import AuthForm from "./AuthForm";
import Container from "react-bootstrap/Container";
import { withRouter } from "react-router-dom";

const ResetPage = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(
      resetPassword(
        {
          newPassword: values.password,
        },
        props.match.params.id
      )
    );
  };
  return (
    <Container className="p-md-5">
      <h2 className="my-5">Reset Password</h2>{" "}
      <AuthForm
        type="reset"
        submitBtnText="Change Password"
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default withRouter(ResetPage);
