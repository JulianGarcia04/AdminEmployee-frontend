import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Popover,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Pagination,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useQueries, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { getAll, deleteOne } from "../modules/employees/services";
import ModalCreateEmployee from "../components/ModalCreateEmployee";
import EmployeeRow from "../components/EmployeeRow";
import MainLayout from "../layout/MainLayout";
import ModalEditEmployee from "../components/ModalEditEmployee";

function Admin() {
  const navigate = useNavigate();

  //estado del popover
  const [anchorEl, setAnchorEl] = useState(null);
  //estado del modal de crear
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  //estado del modal de editar
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  //estados referentes a la paginación
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);

  //traer el estado de redux
  const idSelected = useSelector((state) => state.employeeId.value.id);
  const currentEmployee = useSelector((state) => state.currentEmployee.value);

  //queries
  const results = useQueries([
    {
      queryKey: ["employees", 1],
      queryFn: () => getAll(currPage * 10, prevPage * 10),
    },
    { querykey: ["allEmployees", 2], queryFn: () => getAll() },
  ]);

  const { mutate } = useMutation(deleteOne);

  const employees = results[0];
  const refreshEmployees = employees.refetch;

  const allEmployees = results[1];

  const numberPage =
    !allEmployees.isLoading && Math.ceil(allEmployees.data.length / 10);

  const open = Boolean(anchorEl);

  useEffect(() => {
    refreshEmployees();
  }, [refreshEmployees, currPage, prevPage]);

  //Events

  //Eventos de la paginación, el cual se encarga de cambiar el estado de las paginas
  const handleChange = (event, value) => {
    setCurrPage(value);
    setPrevPage(value - 1);
  };

  //Eventos de la popover
  const handleClick = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Eventos de modal de crear y editar
  const handleModalCreate = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const handleModalEdit = () => {
    setIsOpenEdit(!isOpenEdit);
    handleClose();
  };

  //evento que se encarga de accionar para eliminar un empleado
  const deleteEmployee = () => {
    mutate(idSelected, {
      onSuccess: () => {
        refreshEmployees();
        handleClose();
      },
    });
  };

  return (
    <MainLayout>
      <div>
        {/*table*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Empleados</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "30%",
              }}
            >
              <Box>
                <Button
                  aria-describedby={open ? "simple-popover" : undefined}
                  variant="contained"
                  sx={{
                    height: "45px",
                    border: "1px solid #1571FF",
                    borderRadius: "5px",
                    color: "#1571FF",
                    backgroundColor: "transparent",
                  }}
                  onClick={handleClick}
                  disabled={idSelected === "" ? true : false}
                >
                  Acciones
                  {open ? (
                    <ExpandLess color="#1571FF" />
                  ) : (
                    <ExpandMore color="#1571FF" />
                  )}
                </Button>
                <Popover
                  id={open ? "simple-popover" : undefined}
                  open={open}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Typography
                    sx={{ p: 2, cursor: "pointer" }}
                    onClick={deleteEmployee}
                  >
                    Eliminar empleado
                  </Typography>
                  <Typography
                    sx={{ p: 2, cursor: "pointer" }}
                    onClick={handleModalEdit}
                  >
                    Editar empleado
                  </Typography>
                </Popover>
              </Box>
              {/*Modal de editar */}
              <ModalEditEmployee
                isOpen={isOpenEdit}
                changeIsOpen={handleModalEdit}
              />
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  backgroundColor: "#1571FF",
                  height: "45px",
                }}
                onClick={handleModalCreate}
              >
                Nuevo empleado
              </Button>
              {/*Modal de crear empleado*/}
              <ModalCreateEmployee
                isOpen={isOpenCreate}
                changeIsOpen={handleModalCreate}
              />
            </Box>
          </Box>
          {/*Table */}
          <TableContainer
            component={Paper}
            sx={{ width: "80%", margin: "24px 0px" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Selected</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Apellido</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Fecha de creación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!employees.isLoading &&
                  employees.data.map((e) => {
                    return (
                      e.id !== currentEmployee.id && (
                        <EmployeeRow
                          key={e.id}
                          name={e.name}
                          lastname={e.lastname}
                          email={e.email}
                          idEmployee={e.id}
                          state={e.state}
                          dateCreate={e.dateCreate}
                          isDisable={
                            idSelected !== e.id && idSelected !== ""
                              ? true
                              : false
                          }
                        />
                      )
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/*Pagination*/}
          <Stack spacing={2}>
            <Pagination
              count={Number(numberPage)}
              page={currPage}
              color="standard"
              size="small"
              onChange={handleChange}
            />
          </Stack>
        </Box>
      </div>
    </MainLayout>
  );
}

export default Admin;
