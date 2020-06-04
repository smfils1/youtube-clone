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

const setMobileSearch = (isMobileSearchClick) => {
  return {
    type: "ACTIVATE_MOBILE_SEARCH",
    payload: { isMobileSearchClick },
  };
};

export { setDrawer, toggleDrawer, setMobileSearch };
