import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputForm } from "../../components/Form/InputForm";
import IdCard from "../../assets/id-card.svg";
import LocationDot from "../../assets/location-dot.svg";
import Briefcase from "../../assets/briefcase.svg";
import { departments } from "../../data/departments";
import { states } from "../../data/states";
import { addEmployee } from "../../features/employees/employeesSlice";
import { useForm, Controller } from "react-hook-form";

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
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
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

    dispatch(addEmployee(employeeData));

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
            minLength: 2,
            maxLength: 255,
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
            minLength: 2,
            maxLength: 255,
            pattern: {
              value: /^[a-zA-Z0-9\s\-']+$/,
              message: "Invalid characters in last name",
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
            minLength: 2,
            maxLength: 255,
            pattern: {
              value: /^[a-zA-Z0-9\s\-',.;"]+$/,
              message: "Invalid characters in street address",
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
            minLength: 2,
            maxLength: 255,
            pattern: {
              value: /^[a-zA-Z0-9\s\-',.;"]+$/,
              message: "Invalid characters in city name",
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
              value:
                /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/,
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

        <button className={styles.submit} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
