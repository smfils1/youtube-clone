import React from "react";
//import { clearAuthMessage } from "../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const user = useSelector(({ user }) => user);
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  return (
    <div className="min-vh-100  bg-dark text-white">
      <div>
        <p
          className="py-4 text-center"
          style={{
            fontSize: "2em",
          }}
        >
          Welcome {user.name}
        </p>
      </div>
    </div>
  );
};
export default HomePage;
