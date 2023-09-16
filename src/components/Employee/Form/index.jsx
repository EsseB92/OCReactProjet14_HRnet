import React from "react";

import Button from "../../Shared/Button";
import InputForm from "../../Shared/Form/InputForm";

import { departments } from "../../../data/departments";
import { states } from "../../../data/states";

import Briefcase from "../../../assets/briefcase.svg";
import IdCard from "../../../assets/id-card.svg";
import LocationDot from "../../../assets/location-dot.svg";

import styles from "./index.module.css";

const optionsStates = states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));

const optionsDepartments = departments.map((department) => ({
  value: department,
  label: department,
}));

const EmployeeForm = ({
  control,
  Controller,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title_container}>
        <img
          className={styles.image_title}
          src={IdCard}
          alt="Id Card image"
          width={20}
          height={20}
        />
        <h3 className={styles.title}>Identity</h3>
      </div>

      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <InputForm
            id="firstName"
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
            id="lastName"
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
            id="birthDate"
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

      <div className={styles.title_container}>
        <img
          className={styles.image_title}
          src={LocationDot}
          alt="Location Dot image"
          width={20}
          height={20}
        />
        <h3 className={styles.title}>Address</h3>
      </div>

      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <InputForm
            id="street"
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
            id="city"
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
            id="state"
            label="State"
            type="select"
            options={optionsStates}
            value={field.value}
            onChange={field.onChange}
            autocomplete="address-level1"
            placeholder="Select..."
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
            id="zipCode"
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

      <div className={styles.title_container}>
        <img
          className={styles.image_title}
          src={Briefcase}
          alt="briefcase image"
          width={20}
          height={20}
        />
        <h3 className={styles.title}>Employement</h3>
      </div>

      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <InputForm
            id="startDate"
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
            id="department"
            label="Department"
            type="select"
            value={field.value}
            onChange={field.onChange}
            options={optionsDepartments}
            placeholder="Select..."
          />
        )}
        rules={{ required: "Department is required" }}
      />
      {errors.department && (
        <span className={styles.span_error}>{errors.department.message}</span>
      )}

      <Button className={styles.submit}>Save</Button>
    </form>
  );
};

export default EmployeeForm;
