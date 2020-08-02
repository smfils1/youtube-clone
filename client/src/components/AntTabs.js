import React from "react";
import { grey } from "@material-ui/core/colors";
import { withStyles, Tab, Tabs } from "@material-ui/core";

const AntTabs = withStyles({
  indicator: {
    backgroundColor: "black",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    color: grey[600],
    textTransform: "uppercase",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "black",
      opacity: 1,
    },
    "&$selected": {
      color: "black",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "black",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export { AntTab, AntTabs };
