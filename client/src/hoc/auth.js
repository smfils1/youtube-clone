import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../redux/actions/auth";

export default (OriginalComponent, isPrivate = true) => {
  class ComposedComponent extends Component {
    checkAuth = async () => {
      await this.props.authUser();
      if (!this.props.auth.isAuth && isPrivate) {
        this.props.history.push("/login");
      }
      if (
        this.props.auth.isAuth &&
        (this.props.location.pathname === "/login" ||
          this.props.location.pathname === "/register" ||
          this.props.location.pathname ===
            `/reset/${this.props.match.params.id}` ||
          this.props.location.pathname === "/forgot")
      ) {
        this.props.history.push("/");
      }
    };

    componentDidMount() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      authUser: () => dispatch(auth()),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
};
