import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout.jsx";
import { update } from "../modules/employees/services";

function Employee() {
  const currentEmployee = useSelector((state) => state.currentEmployee.value);

  const { mutate } = useMutation(update);

  useEffect(() => {
    if (currentEmployee.state === false) {
      mutate({ id: currentEmployee.id, body: { state: true } });
    }
  }, [currentEmployee.id, currentEmployee.state, mutate]);

  return <MainLayout></MainLayout>;
}

export default Employee;
