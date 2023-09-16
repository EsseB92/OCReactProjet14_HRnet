import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Search from "../../assets/search.svg";
import Trash from "../../assets/trash.svg";
import { tableColumns } from "../../data/tableColumns";
import Table from "../../components/Shared/Table";
import { deleteEmployees } from "../../features/employees/employeesSlice";

import styles from "./index.module.css";

const EmployeeList = () => {
  useEffect(() => {
    document.title = "Current employees";
  }, []);
  const employees = useSelector((state) => state.employees);
  const data = employees.employees;
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFilter = (event) => {
    event.preventDefault();

    const searchText = event.target.value.trim().toLowerCase();

    const newData = data.filter((row) => {
      const employeeDataString = Object.values(row).join(" ").toLowerCase();
      return employeeDataString.includes(searchText);
    });

    setFilteredData(newData);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteEmployees(selectedRows.map((employee) => employee.id)));
    setSelectedRows([]);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Current Employees</h1>
      <div className={styles.table}>
        <div className={styles.search}>
          <img className={styles.icon_search} src={Search} alt="Search icon" />
          <input
            className={styles.input}
            type="text"
            onChange={handleFilter}
            placeholder="Filter"
          />
        </div>

        <Table
          columns={tableColumns}
          data={filteredData}
          setSelectedRows={setSelectedRows}
        ></Table>
        {filteredData.length > 0 && selectedRows.length > 0 && (
          <img
            className={styles.icon_trash}
            src={Trash}
            alt="trash icon"
            onClick={handleDelete}
          />
        )}
      </div>
      <Link to="/" className={styles.link}>
        Create an employee
      </Link>
    </div>
  );
};

export default EmployeeList;
