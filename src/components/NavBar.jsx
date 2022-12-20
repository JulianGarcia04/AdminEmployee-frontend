import React from "react";
import logo from "../static/icon.svg";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {logout} from '../modules/employees/services'
import "../styles/NavBar.scss";

function NavBar({ name, lastname, role }) {

  const {mutate} = useMutation(logout);

  const navigate = useNavigate();

  const logoutHandle = ()=>{
    mutate(null, {
      onSuccess:()=>{
        navigate('/login');
      }
    })
  }

  return (
    <nav className="navBar">
      <div className="containerInfo">
        <img src={logo} alt="logo" />
        <h1>Gestor de empleados</h1>
      </div>

      <div className="containerButton">
        <div className="infoUser">
          <h4>{`${name} ${lastname}`}</h4>
          <p>{role}</p>
        </div>
        <Button
          variant="contained"
          sx={{
            color: "#1571FF",
            border: "#1571FF solid 1px",
            backgroundColor: "transparent",
            borderRadius: "5px",
          }}
          onClick={logoutHandle}
        >
          Cerrar sesion
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
