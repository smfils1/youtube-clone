const toggleDrawer = () => {
  return {
    type: "TOGGLE_DRAWER",
  };
};

const setDrawer = (isDrawerOpen) => {
  return {
    type: "SET_DRAWER",
    payload: { isDrawerOpen },
  };
};

export { setDrawer, toggleDrawer };
