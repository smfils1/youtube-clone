import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FormHelperText,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core/";

import { Formik } from "formik";
import * as Yup from "yup";

import { capitalize, isString, isPlainObject } from "lodash";

const visibility = ["public", "unlisted", "private"];

const UploadForm = ({ type, onSubmit, submitBtnText, formRef }) => {
  const form = (type) => {
    let validation = {};
    let initialValues = {};
    if (["details"].includes(type)) {
      initialValues = {
        title: "",
        description: "",
      };
      validation = {
        title: Yup.string().required("Title is required"),
        description: Yup.string()
          .max(100, "Max characters is 100")
          .required("Description is required"),
      };
    }
    if (["visibility"].includes(type)) {
      initialValues.visibility = 0;
      validation.visibility = Yup.number().required("Visibility is required");
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
        console.log(values);
        onSubmit(values);
      }}
      validateOnMount
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        validateForm,
      }) => (
        <>
          {["details"].includes(type) && (
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
                onBlur={handleBlur}
              />
            </>
          )}
          {["visibility"].includes(type) && (
            <>
              <Select
                id="visibility"
                label="visibility"
                name="visibility"
                value={values.visibility}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={0}>{visibility[0]}</MenuItem>
                <MenuItem value={1}>{visibility[1]}</MenuItem>
                <MenuItem value={2}>{visibility[2]}</MenuItem>
              </Select>
              {errors.visibility && touched.color && (
                <FormHelperText>{errors.visibility}</FormHelperText>
              )}
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default UploadForm;
