import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../theme";

const CreateTaskForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box container>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                disabled
                variant="filled"
                type="text"
                label="Sub Tasks (Coming soon)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subTasks}
                name="subTasks"
                error={!!touched.subTasks && !!errors.subTasks}
                helperText={touched.subTasks && errors.subTasks}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                disabled
                variant="filled"
                type="text"
                label="Tags (Coming soon)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Tags}
                name="Tags"
                error={!!touched.Tags && !!errors.Tags}
                helperText={touched.Tags && errors.Tags}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Task
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// defines validation logic for each field we use
const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  subTasks: yup.array().of(yup.string()),
  tags: yup.array().of(yup.string()),
});

const initialValues = {
  title: "",
  subTasks: [], // array of strings
  tags: [], // array of strings
};

export default CreateTaskForm;
