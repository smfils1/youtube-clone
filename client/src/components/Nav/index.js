import React from "react";
import TopNav from "./TopNav";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import SideNav from "./SideNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
  },
}));
const NavBar = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopNav />
      <SideNav />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container
          className={classes.container}
          disableGutters
          maxWidth={false}
        >
          {children}
        </Container>
      </div>
    </div>
  );
};

export default NavBar;

// import React from "react";
// import TopNav from "../components/TopNav";
// import { makeStyles } from "@material-ui/core/styles";
// import { Container } from "@material-ui/core";

// import SideNav from "../components/SideNav";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   content: {
//     display: "flex",
//     minHeight: "100vh",
//   },
//   toolbar: {
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   },
//   container: {
//     height: "100%",
//     display: "flex",
//   },
//   fill: {
//     flex: "1 1 auto",
//   },
// }));
// const NavBar = ({ children }) => {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <TopNav />
//       <SideNav />
//       <div className={classes.content}>
//         <div className={classes.toolbar} />
//         <Container className={classes.fill} disableGutters maxWidth={false}>
//           {children}
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default NavBar;
