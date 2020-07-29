import React, { useState } from "react";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Button, Tooltip } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    color: grey[700],
    backgroundColor: grey[200],
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: grey[200],
    },
    "&:focus": {
      outline: "none",
    },
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderLeftColor: grey[300],

    borderRadius: 0,
  },
  border: {
    borderColor: grey[300],
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: 0,
  },
  searchForm: {
    backgroundColor: "white",
    width: "100%",
  },
  input: {
    padding: theme.spacing(0, 1),
  },
}));

const MiddleNav = ({ history }) => {
  const [searchValue, setSearch] = useState("");
  const classes = useStyles();

  const handleSearch = () => {
    if (searchValue) {
      history.push(`/results?search_query=${searchValue}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={classes.searchForm}>
      <InputBase
        fullWidth
        value={searchValue}
        onChange={handleSearchChange}
        className={classes.border}
        classes={{
          input: classes.input,
        }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        endAdornment={
          <Tooltip title="Search">
            <Button
              disableRipple
              size="small"
              type="submit"
              className={classes.searchButton}
              onClick={handleSearch}
              aria-label="search"
            >
              <SearchIcon fontSize="small" />
            </Button>
          </Tooltip>
        }
      />
    </div>
  );
};

export default withRouter(MiddleNav);
