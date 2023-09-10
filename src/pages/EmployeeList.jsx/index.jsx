import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import styles from "./index.module.css";
import Search from "../../assets/search.svg";
import Trash from "../../assets/trash.svg";
import { deleteEmployees } from "../../features/employees/employeesSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "Date of Birth",
    selector: (row) => row.birthDate,
    sortable: true,
  },
  {
    name: "Street",
    selector: (row) => row.street,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "State",
    selector: (row) => row.state,
    sortable: true,
  },
  {
    name: "Zip Code",
    selector: (row) => row.zipCode,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
];

const EmployeeList = () => {
  useEffect(() => {
    document.title = "Current employees";
  }, []);
  const employees = useSelector((state) => state.employees);
  const data = employees.employees;
  const dispatch = useDispatch();

  const [records, setRecords] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFilter = (event) => {
    event.preventDefault();

    const searchText = event.target.value.trim().toLowerCase();

    const newData = data.filter((row) => {
      const employeeDataString = Object.values(row).join(" ").toLowerCase();
      return employeeDataString.includes(searchText);
    });

    setRecords(newData);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteEmployees(selectedRows.map((employee) => employee.id)));
  };

  useEffect(() => {
    setRecords(data);
  }, [data]);

  useEffect(() => {
    setRecords(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Current Employees</h1>
      <div style={{ position: "relative" }}>
        <div className={styles.search}>
          <img className={styles.icon_search} src={Search} alt="" />
          <input
            className={styles.input}
            type="text"
            onChange={handleFilter}
            placeholder="Filter"
          />
        </div>

        <Table
          columns={columns}
          data={records}
          setSelectedRows={setSelectedRows}
        ></Table>
        {records && selectedRows.length > 0 && (
          <img
            className={styles.icon_trash}
            src={Trash}
            alt="trash icon"
            onClick={handleDelete}
          />
        )}
      </div>
      <Link to="/" relative="path" className={styles.link}>
        Create an employee
      </Link>
    </div>
  );
};

export default EmployeeList;
