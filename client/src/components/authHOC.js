import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/actions/user";

export default (OriginalComponent, isPrivate = true) => {
  const ComposedComponent = (props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(({ user }) => user.isAuth);
    const checkAuth = async () => {
      await dispatch(auth());
      if (!isAuth && isPrivate) {
        props.history.push("/login");
      }
      console.log(props);
      if (
        isAuth &&
        (props.location.pathname === "/login" ||
          props.location.pathname === "/register")
      ) {
        props.history.push("/");
      }
    };

    useEffect(() => {
      checkAuth();
    }, []);

    return <OriginalComponent {...props} />;
  };

  return ComposedComponent;
};
