import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/actions/channel";

export default (OriginalComponent, isPrivate = true) => {
  const ComposedComponent = (props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(({ channel }) => channel.isAuth);
    const checkAuth = async () => {
      await dispatch(auth());
      if (!isAuth && isPrivate) {
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
