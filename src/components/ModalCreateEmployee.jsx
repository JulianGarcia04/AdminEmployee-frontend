import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { createValidator } from "../modules/employees/validators";
import { useMutation, useQueryClient } from "react-query";
import { create } from "../modules/employees/services";
import ErrorModal from "./ErrorModal";
import useModal from "../hooks/useModal";

function ModalCreateEmployee({ isOpen, changeIsOpen }) {
  const errorModal = useModal();

  const { mutate, isLoading, isError, error } = useMutation(create);
  const queryClient = useQueryClient();

  return (
    <Modal open={isOpen} onClose={changeIsOpen}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            lastname: "",
            email: "",
            password: "",
          }}
          validationSchema={createValidator}
          onSubmit={(values) => {
            mutate(values, {
              onError: () => {
                errorModal.handleChange();
              },
              onSuccess: () => {
                queryClient.invalidateQueries("employees");
                changeIsOpen();
              },
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, errors }) => (
            <Stack
              spacing={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "5px",
                width: "30%",
                padding: "30px 0px",
              }}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <Box
                    id="modal-modal-title"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <Typography variant="h5">Crear empleado</Typography>
                    <Close color="#1571FF" onClick={changeIsOpen} />
                  </Box>
                  <Form
                    onSubmit={handleSubmit}
                    id="modal-modal-form"
                    style={{ width: "90%" }}
                  >
                    <Stack spacing={3}>
                      <TextField
                        type={"text"}
                        name="name"
                        label="Name"
                        variant="outlined"
                        error={errors.name ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        type={"text"}
                        name="lastname"
                        label="Lastname"
                        variant="outlined"
                        error={errors.lastname ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        type={"email"}
                        name="email"
                        label="Email"
                        variant="outlined"
                        error={errors.email ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        type={"password"}
                        name="password"
                        label="Password"
                        variant="outlined"
                        error={errors.email ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          color: "#fff",
                          backgroundColor: "#1571FF",
                          height: "50px",
                        }}
                        disabled={
                          errors.email ||
                          errors.name ||
                          errors.lastname ||
                          errors.password
                            ? true
                            : false
                        }
                      >
                        Continuar
                      </Button>
                    </Stack>
                  </Form>
                </>
              )}
            </Stack>
          )}
        </Formik>
        {isError && (
          <ErrorModal
            isOpen={errorModal.isOpen}
            handleClose={errorModal.handleChange}
            stack={error.data.stack}
          />
        )}
      </Box>
    </Modal>
  );
}

export default ModalCreateEmployee;
