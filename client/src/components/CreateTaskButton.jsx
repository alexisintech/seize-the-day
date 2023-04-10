import { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { AppContext } from "../AppContext";
import { createTodo } from "../utils";

const CreateTaskButton = () => {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (values) => {
    handleClose();
    createTodo(values).then((res) => {
      dispatch({ type: "CREATE_TODO", payload: res });
    });
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: "500px" },
    bgcolor: `${colors.primary[400]}`,
    border:
      theme.palette.mode === "dark"
        ? "2px solid rgba(255,255,255,0.1)"
        : "2px solid rgba(219, 217, 217, 0.5)",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Button
        sx={{
          position: { xs: "fixed", md: "static" },
          bottom: "2.5%",
          right: "5%",
          color: "white",
          backgroundColor: colors.purpleAccent[500],
          padding: "0.5rem 1rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: colors.purpleAccent[400],
          },
        }}
        onClick={handleOpen}
        type="button"
      >
        Create New Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Create new task
          </Typography>
          {/* <CreateTaskForm /> */}

          {/* CREATE TASK FORM */}
          <Box>
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
                    <FieldArray
                      name="subTasks"
                      render={(arrayHelpers) => (
                        <div style={{ gridColumn: "span 4" }}>
                          {values.subTasks.map((subTask, index) => (
                            <div key={index}>
                              <Field
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                name={`subTasks[${index}].title`}
                                label={`Subtask ${index + 1}`}
                                sx={{ width: "100%", gridColumn: "span 4" }}
                              />
                              <Box
                                display="flex"
                                justifyContent="end"
                                my="0.5em"
                              >
                                <Button
                                  type="button"
                                  variant="contained"
                                  sx={{
                                    padding: "0.35em 0.8em",
                                    minWidth: "32px",
                                    fontSize: "0.8em",
                                    backgroundColor: colors.purpleAccent[600],
                                    "&:hover": {
                                      backgroundColor: colors.purpleAccent[400],
                                    },
                                  }}
                                  onClick={() => arrayHelpers.remove(index)} // remove a subTask from the list
                                >
                                  Delete
                                </Button>
                              </Box>
                            </div>
                          ))}
                          <Button
                            type="button"
                            color="secondary"
                            variant="contained"
                            onClick={() =>
                              arrayHelpers.push({ title: "", completed: false })
                            }
                          >
                            {/* show this when user has removed all subTasks from the list */}
                            Add a subTask
                          </Button>
                        </div>
                      )}
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
        </Box>
      </Modal>
    </Box>
  );
};

// defines validation logic for each field we use
const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  // subTasks: yup.array().of(yup.string()),
  tags: yup.array().of(yup.string()),
});

const initialValues = {
  title: "",
  subTasks: [{ title: "", completed: false }], // array of strings
  tags: [], // array of strings
};

export default CreateTaskButton;
