import React, { useState } from "react";
import { InputForm } from "../../components/Form/InputForm";
import IdCard from "../../assets/id-card.svg";
import LocationDot from "../../assets/location-dot.svg";
import Briefcase from "../../assets/briefcase.svg";
import { departments } from "../../data/departments";
import { states } from "../../data/states";

import styles from "./index.module.css";

const optionsStates = states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));

const optionsDepartments = departments.map((department) => ({
  value: department,
  label: department,
}));

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
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

  const updateEmployee = (employeeKey, value) => {
    setEmployee({
      ...employee,
      [employeeKey]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(employee);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HRnet</h1>
      <a href="currentEmployee" className={styles.link}>
        View current Employees
      </a>
      <h2 className={styles.subtitle}>Create Employee</h2>

      <hr className={styles.hr}></hr>

      <form onSubmit={handleSubmit}>
        <div className={styles.title_part_container}>
          <img className={styles.image} src={IdCard} alt="" />
          <h3 className={styles.part_title}>Identity</h3>
        </div>

        <InputForm
          label="First name"
          value={employee.firstName}
          onChange={(e) => updateEmployee("firstName", e.target.value)}
          autocomplete="given-name"
        />
        <InputForm
          label="Last name"
          value={employee.lastName}
          onChange={(e) => updateEmployee("lastName", e.target.value)}
          autocomplete="family-name"
        />
        <InputForm
          label="Date of Birth"
          type="date"
          value={employee.birthDate}
          onChange={(date) => updateEmployee("birthDate", date)}
          autocomplete="bday"
        />

        <hr className={styles.hr}></hr>

        <div className={styles.title_part_container}>
          <img className={styles.image} src={LocationDot} alt="" />
          <h3 className={styles.part_title}>Address</h3>
        </div>

        <InputForm
          label="Street"
          value={employee.street}
          onChange={(e) => updateEmployee("street", e.target.value)}
          autocomplete="street-address"
        />
        <InputForm
          label="City"
          value={employee.city}
          onChange={(e) => updateEmployee("city", e.target.value)}
          autocomplete="address-level2"
        />
        <InputForm
          label="State"
          type="select"
          options={optionsStates}
          value={employee.state}
          onChange={(selectedOption) => updateEmployee("state", selectedOption)}
          autocomplete="address-level1"
        />
        <InputForm
          label="Zip Code"
          value={employee.zipCode}
          onChange={(e) => updateEmployee("zipCode", e.target.value)}
          autocomplete="postal-code"
        />

        <hr className={styles.hr}></hr>

        <div className={styles.title_part_container}>
          <img className={styles.image} src={Briefcase} alt="" />
          <h3 className={styles.part_title}>Employement</h3>
        </div>

        <InputForm
          label="Start Date"
          value={employee.startDate}
          onChange={(date) => updateEmployee("startDate", date)}
          type="date"
        />
        <InputForm
          label="Department"
          type="select"
          selected={employee.department}
          onChange={(selectedOption) =>
            updateEmployee("department", selectedOption)
          }
          options={optionsDepartments}
        />
        <button className={styles.submit} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
