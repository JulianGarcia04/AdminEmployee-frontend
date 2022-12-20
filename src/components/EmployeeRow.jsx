import React, { useState, useEffect } from "react";
import { useDispatch} from 'react-redux';
import { setId } from "../redux/states/employeeIdSlice";
import { TableRow, Checkbox, TableCell } from "@mui/material";

function EmployeeRow({ idEmployee, name, lastname, email, state, dateCreate, isDisable }) {
  const [isCheck, setIsCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isCheck){
        dispatch(setId({id:idEmployee}))
        return 
    }
    dispatch(setId({id:''}))
  }, [isCheck, dispatch, idEmployee])

  const handleCheck = () => {
    setIsCheck(!isCheck);
  };
  return (
    <TableRow>
      <TableCell align="center">
        <Checkbox size="small" checked={isCheck} onChange={handleCheck} disabled={isDisable} />
      </TableCell>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{lastname}</TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">{state ? "Activo" : "Desactivo"}</TableCell>
      <TableCell align="center">{dateCreate}</TableCell>
    </TableRow>
  );
}

export default EmployeeRow;
