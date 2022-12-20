import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { editValidator } from "../modules/employees/validators";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { update, getOne } from "../modules/employees/services";

function ModalEditEmployee({ isOpen, changeIsOpen }) {
  const idEmployee = useSelector((state) => state.employeeId.value.id);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(update);
  const query = useQuery(["oneEmployee"], () => getOne(idEmployee), {
    enabled: idEmployee !== "" ? true : false,
  });

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
          initialValues={
            !query.isLoading && query.data
              ? {
                  name: query.data.name,
                  lastname: query.data.lastname,
                  email: query.data.email,
                  state: query.data.state,
                }
              : {
                  name: "",
                  lastname: "",
                  email: "",
                  state: false,
                }
          }
          validationSchema={editValidator}
          onSubmit={(values) => {
            mutate(
              { id: idEmployee, body: values },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries("employees");
                  changeIsOpen();
                },
              }
            );
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
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
                    <Typography variant="h5">Editar empleado</Typography>
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
                        value={values.name}
                        label="Name"
                        variant="outlined"
                        error={errors.name ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        type={"text"}
                        name="lastname"
                        value={values.lastname}
                        label="Lastname"
                        variant="outlined"
                        error={errors.lastname ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        type={"email"}
                        name="email"
                        value={values.email}
                        label="Email"
                        variant="outlined"
                        disabled
                        error={errors.email ? true : false}
                      />
                      <FormControlLabel
                        label="Employee State"
                        name="state"
                        control={
                          <Checkbox
                            name="state"
                            checked={values.state}
                          />
                        }
                        onChange={handleChange}
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
      </Box>
    </Modal>
  );
}

export default ModalEditEmployee;
