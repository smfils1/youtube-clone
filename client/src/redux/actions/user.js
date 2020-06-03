const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export { setUser };
