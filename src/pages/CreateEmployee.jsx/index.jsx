import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputForm } from "../../components/Form/InputForm";
import IdCard from "../../assets/id-card.svg";
import LocationDot from "../../assets/location-dot.svg";
import Briefcase from "../../assets/briefcase.svg";
import { departments } from "../../data/departments";
import { states } from "../../data/states";
import { addEmployee } from "../../features/employees/employeesSlice";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const id =
      employees.reduce(
        (max, employee) => (employee.id > max ? employee.id : max),
        employees[0].id
      ) + 1;
    const employeeData = {
      id: id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      birthDate: new Intl.DateTimeFormat("en-US").format(employee.birthDate),
      street: employee.street,
      city: employee.city,
      state: employee.state.value,
      zipCode: employee.zipCode,
      startDate: new Intl.DateTimeFormat("en-US").format(employee.startDate),
      department: employee.department.value,
    };
    dispatch(addEmployee(employeeData));
    setEmployee({
      id: 0,
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

      <form onSubmit={handleSubmit}>
        <div className={styles.title_part_container}>
          <img className={styles.image} src={IdCard} alt="" />
          <h3 className={styles.part_title}>Identity</h3>
        </div>

        <InputForm
          label="First name"
          value={employee.firstName}
          onChange={(e) =>
            setEmployee({ ...employee, firstName: e.target.value })
          }
          autocomplete="given-name"
        />
        <InputForm
          label="Last name"
          value={employee.lastName}
          onChange={(e) =>
            setEmployee({ ...employee, lastName: e.target.value })
          }
          autocomplete="family-name"
        />
        <InputForm
          label="Date of Birth"
          type="date"
          value={employee.birthDate || ""}
          onChange={(date) => setEmployee({ ...employee, birthDate: date })}
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
          onChange={(e) => setEmployee({ ...employee, street: e.target.value })}
          autocomplete="street-address"
        />
        <InputForm
          label="City"
          value={employee.city}
          onChange={(e) => setEmployee({ ...employee, city: e.target.value })}
          autocomplete="address-level2"
        />
        <InputForm
          label="State"
          type="select"
          options={optionsStates}
          value={employee.state}
          onChange={(selectedOption) =>
            setEmployee({ ...employee, state: selectedOption })
          }
          autocomplete="address-level1"
        />
        <InputForm
          label="Zip Code"
          value={employee.zipCode}
          onChange={(e) =>
            setEmployee({ ...employee, zipCode: e.target.value })
          }
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
          onChange={(date) => setEmployee({ ...employee, startDate: date })}
          type="date"
        />
        <InputForm
          label="Department"
          type="select"
          selected={employee.department}
          onChange={(selectedOption) =>
            setEmployee({ ...employee, department: selectedOption })
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
