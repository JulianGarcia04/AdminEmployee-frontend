import React, {useId, useState} from "react";
import { Formik, Form } from "formik";
import { TextField, Box, Button, Stack } from "@mui/material";
import { loginValidor } from "../modules/employees/validators";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../modules/employees/services";
import ErrorModal from "../components/ErrorModal";

function Login() {

  const [isOpen, setIsOpen] = useState(false);

  const { mutate, error, isError } = useMutation(login);
  const navegation = useNavigate();
  const idForm = useId();

  const handleClick = ()=>{
    setIsOpen(!isOpen)
  }

  return (
    <Box>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidor}
        onSubmit={(values) => {
          mutate(values, {
            onError: (err)=>{
              handleClick()
            },
            onSuccess: ()=>{
              navegation("/admin");
            }
          });
        }}
      >
        {({ errors, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100vh",
              }}
            >
              <Box sx={{width:"25%"}}>
                <h6>INGRESAR</h6>
                <h1>Complete los siguientes campos para ingresar</h1>
              </Box>
              <Stack
                width={"25%"}
                height="30%"
                alignItems={"center"}
                justifyContent={"center"}
                spacing={3}
                borderRadius={10}
                boxShadow={"0px 4px 32px rgba(0, 0, 0, 0.1)"}
              >
                <TextField
                  error={errors.email ? true : false}
                  type={'email'}
                  id={`${idForm}-email`}
                  name="email"
                  label={"email"}
                  variant="standard"
                  sx={{ width: "80%" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  error={errors.password ? true : false}
                  type={'password'}
                  id={`${idForm}-password`}
                  name="password"
                  label={"password"}
                  variant="standard"
                  sx={{ width: "80%" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  type="submit"
                  disabled={errors.email || errors.password ? true : false}
                  variant="contained"
                  sx={{
                    width: "80%",
                    height: 45,
                    borderRadius: "5px",
                    color: "#ffff",
                    backgroundColor: "#1571FF",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
      {
        isError&&<ErrorModal  isOpen={isOpen} handleClose={handleClick} stack={error.data.stack} />
      }
      
    </Box>
  );
}

export default Login;
