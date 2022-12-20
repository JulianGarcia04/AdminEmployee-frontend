import React from "react";
import NavBar from "../components/NavBar";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrent } from "../modules/employees/services";
import {setEmployee} from '../redux/states/currentEmployee'

function MainLayout({ children }) {
  //hook disparador de redux
  const dispatch = useDispatch();
  //hook de navegacion de react router
  const navigate = useNavigate();

  //proteccion de ruta y fetching de datos
  const { data, isLoading } = useQuery("currentEmployee", getCurrent, {
    onSuccess:(data)=>{
      dispatch(setEmployee(data))
      if (!data.role) {
        navigate('/');
        return
      }
      if(data.role === 'employee'){
        navigate('/employee')
      }
    }
  });

  return (
    <>
      {!isLoading && (
        <NavBar name={data.name} lastname={data.lastname} role={data.role} />
      )}
      <div>
        {children}
      </div>
    </>
  );
}

export default MainLayout;
