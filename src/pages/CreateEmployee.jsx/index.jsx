import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputForm } from "../../components/Form/InputForm";
import Button from "../../components/Button";
import XMark from "../../assets/xmark.svg";
import { addEmployee } from "../../features/employees/employeesSlice";
import EmployeeForm from "../../components/Form/";
import { useForm, Controller } from "react-hook-form";
import Modal from "@esseb92/react-modal";
import { toast } from "react-toastify";

import styles from "./index.module.css";
import { Link } from "react-router-dom";

const CreateEmployee = () => {
  useEffect(() => {
    document.title = "Create employee";
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const formDataRef = useRef(null);

  const modalConfigurations = {
    // Global Part
    closeModal: setOpenModal,
    maxWidth: "500px",
    closingBtn: XMark,
    borderRadius: "8px",
    // padding: "15px 30px",
    fontFamily: '"Lato", "Helvetica Neue", arial, sans-serif',
    // Header Part
    modalHeader: "Are you sure you want to create this employee?",
    paddingHeader: "0 30px",
    // Body Part
    modalBody: (
      <div className={styles.modal}>
        <Button
          className={`${styles.modal_button} ${styles.modal_button_yes}`}
          onClick={() => {
            onAcceptSubmitting();
            setOpenModal(false);
          }}
        >
          Yes
        </Button>
        <Button
          className={`${styles.modal_button} ${styles.modal_button_no}`}
          onClick={() => {
            setOpenModal(false);
          }}
        >
          No
        </Button>
      </div>
    ),
    colorBody: "#5e6c76",
    bgColorBody: "white",
    textAlignBody: "left",
    fontSizeBody: "18px",
    paddingBody: "0 0 20px 0",
  };

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onAcceptSubmitting = async () => {
    const data = formDataRef.current;
    const id =
      employees.reduce(
        (max, employee) => (employee.id > max ? employee.id : max),
        employees[0].id
      ) + 1;
    const employeeData = {
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Intl.DateTimeFormat("en-US").format(data.birthDate),
      street: data.street,
      city: data.city,
      state: data.state.value,
      zipCode: data.zipCode,
      startDate: new Intl.DateTimeFormat("en-US").format(data.startDate),
      department: data.department.value,
    };

    try {
      dispatch(addEmployee(employeeData));
      toast.success(
        <p>
          L'employé{" "}
          <b>
            {data.firstName} {data.lastName}
          </b>{" "}
          a bien été créé!
        </p>
      );
      reset({
        firstName: "",
        lastName: "",
        birthDate: null,
        street: "",
        city: "",
        state: "",
        zipCode: "",
        startDate: null,
        department: "",
      });
    } catch (error) {
      toast.error(
        <p>
          L'employé{" "}
          <b>
            {data.firstName} {data.lastName}
          </b>{" "}
          n'a pas pu être créé! Erreur : {error}
        </p>
      );
    }
  };

  const onSubmit = (data) => {
    formDataRef.current = data;
    setOpenModal(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HRnet</h1>
      <Link to="/currentEmployee" relative="path" className={styles.link}>
        View current Employees
      </Link>
      <h2 className={styles.subtitle}>Create Employee</h2>
      <hr className={styles.hr}></hr>
      <EmployeeForm
        control={control}
        Controller={Controller}
        errors={errors}
        handleSubmit={handleSubmit}
        InputForm={InputForm}
        onSubmit={onSubmit}
      />
      {openModal && <Modal {...modalConfigurations} />}
    </div>
  );
};

export default CreateEmployee;
