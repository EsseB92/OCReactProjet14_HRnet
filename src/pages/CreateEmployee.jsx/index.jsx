import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "@esseb92/react-modal";

import XMark from "../../assets/xmark.svg";
import EmployeeForm from "../../components/Employee/Form";
import Button from "../../components/Shared/Button";
import { addEmployee } from "../../features/employees/employeesSlice";
import styles from "./index.module.css";
import {
  calculateNextEmployeeId,
  prepareEmployeeData,
} from "../../utils/employeeUtils";

const CreateEmployee = () => {
  const [openModal, setOpenModal] = useState(false);
  const formDataRef = useRef(null);
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);

  const modalConfigurations = {
    closeModal: setOpenModal,
    maxWidth: "500px",
    closingBtn: XMark,
    borderRadius: "8px",
    fontFamily: '"Lato", "Helvetica Neue", arial, sans-serif',
    modalHeader: "Are you sure you want to create this employee?",
    paddingHeader: "0 30px",
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    formDataRef.current = data;
    setOpenModal(true);
  };

  const onAcceptSubmitting = async () => {
    const data = formDataRef.current;
    const id = calculateNextEmployeeId(employees);
    const employeeData = prepareEmployeeData(data, id);

    try {
      dispatch(addEmployee(employeeData));
      handleSuccessToast(data);
      resetForm();
    } catch (error) {
      handleFailureToast(data, error);
    }
  };

  const resetForm = () => {
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
  };

  const handleSuccessToast = (data) => {
    toast.success(
      <p>
        L'employé{" "}
        <b>
          {data.firstName} {data.lastName}
        </b>{" "}
        a bien été créé!
      </p>
    );
  };

  const handleFailureToast = (data, error) => {
    toast.error(
      <p>
        L'employé{" "}
        <b>
          {data.firstName} {data.lastName}
        </b>{" "}
        n'a pas pu être créé! Erreur : {error.message}
      </p>
    );
  };

  useEffect(() => {
    document.title = "Create employee - HRnet";
  }, []);

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
        onSubmit={onSubmit}
      />
      {openModal && <Modal {...modalConfigurations} />}
    </div>
  );
};

export default CreateEmployee;
