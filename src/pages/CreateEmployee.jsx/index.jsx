import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputForm } from "../../components/Form/InputForm";
import Button from "../../components/Button";
import IdCard from "../../assets/id-card.svg";
import LocationDot from "../../assets/location-dot.svg";
import Briefcase from "../../assets/briefcase.svg";
import XMark from "../../assets/xmark.svg";
import { departments } from "../../data/departments";
import { states } from "../../data/states";
import { addEmployee } from "../../features/employees/employeesSlice";
import { useForm, Controller } from "react-hook-form";
import Modal from "@esseb92/react-modal";
import { toast } from "react-toastify";

import styles from "./index.module.css";
import { Link } from "react-router-dom";

const optionsStates = states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));

const optionsDepartments = departments.map((department) => ({
  value: department,
  label: department,
}));

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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title_part_container}>
          <img className={styles.image} src={IdCard} alt="" />
          <h3 className={styles.part_title}>Identity</h3>
        </div>

        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputForm
              label="First name"
              value={field.value}
              onChange={field.onChange}
              autocomplete="given-name"
              placeholder="Ex. John"
            />
          )}
          rules={{
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters long",
            },
            maxLength: {
              value: 255,
              message: "First name cannot exceed 255 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9\s\-']+$/,
              message: "Invalid character(s) in first name",
            },
          }}
        />
        {errors.firstName && (
          <span className={styles.span_error}>{errors.firstName.message}</span>
        )}

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <InputForm
              label="Last name"
              value={field.value}
              onChange={field.onChange}
              autocomplete="family-name"
              placeholder="Ex. Doe"
            />
          )}
          rules={{
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters long",
            },
            maxLength: {
              value: 255,
              message: "Last name cannot exceed 255 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9\s\-']+$/,
              message: "Invalid character(s) in last name",
            },
          }}
        />
        {errors.lastName && (
          <span className={styles.span_error}>{errors.lastName.message}</span>
        )}

        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <InputForm
              label="Date of Birth"
              type="date"
              value={field.value}
              onChange={field.onChange}
              autocomplete="bday"
              placeholder="Ex. 10/25/1985 (MM/dd/yyyy)"
            />
          )}
          rules={{
            required: "Date of Birth is required",
            pattern: {
              value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/,
              message: "Invalid date format (MM/dd/yyyy)",
            },
            validate: (value) => {
              const birthDate = new Date(value);
              const today = new Date();
              const minAgeDate = new Date(
                today.getFullYear() - 16,
                today.getMonth(),
                today.getDate()
              );
              return (
                birthDate < minAgeDate || "You must be at least 16 years old"
              );
            },
          }}
        />
        {errors.birthDate && (
          <span className={styles.span_error}>{errors.birthDate.message}</span>
        )}

        <hr className={styles.hr}></hr>

        <div className={styles.title_part_container}>
          <img className={styles.image} src={LocationDot} alt="" />
          <h3 className={styles.part_title}>Address</h3>
        </div>

        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <InputForm
              label="Street"
              value={field.value}
              onChange={field.onChange}
              autocomplete="street-address"
              placeholder="Ex. 576 Wayside Lane"
            />
          )}
          rules={{
            required: "Street is required",
            minLength: {
              value: 2,
              message: "Street must be at least 2 characters long",
            },
            maxLength: {
              value: 255,
              message: "Street cannot exceed 255 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9\s\-',.;"]+$/,
              message: "Invalid character(s) in street address",
            },
          }}
        />
        {errors.street && (
          <span className={styles.span_error}>{errors.street.message}</span>
        )}

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <InputForm
              label="City"
              value={field.value}
              onChange={field.onChange}
              autocomplete="address-level2"
              placeholder="Ex. San Francisco"
            />
          )}
          rules={{
            required: "City is required",
            minLength: {
              value: 2,
              message: "City must be at least 2 characters long",
            },
            maxLength: {
              value: 255,
              message: "City cannot exceed 255 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9\s\-',.;"]+$/,
              message: "Invalid character(s) in city name",
            },
          }}
        />
        {errors.city && (
          <span className={styles.span_error}>{errors.city.message}</span>
        )}

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <InputForm
              label="State"
              type="select"
              options={optionsStates}
              value={field.value}
              onChange={field.onChange}
              autocomplete="address-level1"
            />
          )}
          rules={{ required: "State is required" }}
        />
        {errors.state && (
          <span className={styles.span_error}>{errors.state.message}</span>
        )}

        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <InputForm
              label="Zip Code"
              value={field.value}
              onChange={field.onChange}
              autocomplete="postal-code"
              placeholder="Ex. 94108"
            />
          )}
          rules={{
            required: "Zip Code is required",
            pattern: {
              value: /^\d{5}$/,
              message: "Invalid zip code format (e.g., 12345)",
            },
          }}
        />
        {errors.zipCode && (
          <span className={styles.span_error}>{errors.zipCode.message}</span>
        )}

        <hr className={styles.hr}></hr>

        <div className={styles.title_part_container}>
          <img className={styles.image} src={Briefcase} alt="" />
          <h3 className={styles.part_title}>Employement</h3>
        </div>

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <InputForm
              label="Start Date"
              value={field.value}
              onChange={field.onChange}
              type="date"
              placeholder="Ex.09/13/2023 (MM/dd/yyyy)"
            />
          )}
          rules={{
            required: "Start Date is required",
            pattern: {
              value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/,
              message: "Invalid date format (MM/dd/yyyy)",
            },
            validate: (value) => {
              const startDate = new Date(value);
              const today = new Date();
              return startDate >= today || "Start date must be in the future";
            },
          }}
        />
        {errors.startDate && (
          <span className={styles.span_error}>{errors.startDate.message}</span>
        )}

        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <InputForm
              label="Department"
              type="select"
              value={field.value}
              onChange={field.onChange}
              options={optionsDepartments}
            />
          )}
          rules={{ required: "Department is required" }}
        />
        {errors.department && (
          <span className={styles.span_error}>{errors.department.message}</span>
        )}

        <Button className={styles.submit}>Save</Button>
      </form>
      {openModal && <Modal {...modalConfigurations} />}
    </div>
  );
};

export default CreateEmployee;
