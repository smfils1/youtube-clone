import React from "react";
import {
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
} from "@material-ui/core/";

import { Formik } from "formik";
import * as Yup from "yup";

import { capitalize } from "lodash";

const visibility = ["public", "unlisted", "private"];
const categories = [
  "music",
  "sports",
  "gaming",
  "movies & shows",
  "news",
  "live",
];

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: theme.spacing(2),
  },
}));

const UploadForm = ({ type, onSubmit, formRef }) => {
  const classes = useStyles();
  const form = (type) => {
    let validation = {};
    let initialValues = {};
    if (["details"].includes(type)) {
      initialValues = {
        title: "",
        description: "",
        category: 0,
      };
      validation = {
        title: Yup.string().required("Title is required"),
        description: Yup.string()
          .max(100, "Max characters is 100")
          .required("Description is required"),
        category: Yup.number().required("Category is required"),
      };
    }
    if (["visibility"].includes(type)) {
      initialValues.visibility = "0";
      validation.visibility = Yup.string().required("Visibility is required");
    }
    return { validationSchema: Yup.object().shape(validation), initialValues };
  };
  const validationSchema = form(type).validationSchema;
  const initialValues = form(type).initialValues;

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validateOnMount
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <>
          {type === "details" && (
            <>
              <TextField
                error={touched.title && errors.title}
                id="details-title"
                label="title"
                name="title"
                value={values.title}
                helperText={errors.title}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                className={classes.spacing}
              />
              <TextField
                error={touched.description && errors.description}
                id="details-description"
                label="description"
                name="description"
                value={values.description}
                helperText={errors.description}
                variant="outlined"
                onChange={handleChange}
                className={classes.spacing}
                onBlur={handleBlur}
              />

              <Select
                id="category"
                label="category"
                name="category"
                value={values.category}
                className={classes.spacing}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {categories.map((value, index) => (
                  <MenuItem key={index} value={index}>
                    {capitalize(value)}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && touched.color && (
                <FormHelperText>{errors.category}</FormHelperText>
              )}
            </>
          )}
          {type === "visibility" && (
            <>
              <FormControl
                component="fieldset"
                error={errors.visibility}
                className={classes.formControl}
              >
                <FormLabel component="legend">
                  Pick the visibility of this video:
                </FormLabel>
                <RadioGroup
                  aria-label="visibility"
                  name="visibility"
                  value={values.visibility}
                  onChange={handleChange}
                >
                  {visibility.map((value, index) => (
                    <FormControlLabel
                      key={index}
                      value={index + ""}
                      control={<Radio />}
                      label={capitalize(value)}
                    />
                  ))}
                </RadioGroup>
                {errors.visibility && touched.color && (
                  <FormHelperText>{errors.visibility}</FormHelperText>
                )}{" "}
              </FormControl>
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default UploadForm;
