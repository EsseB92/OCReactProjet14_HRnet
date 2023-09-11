import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

import Calendar from "../../../../assets/calendar.svg";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./index.module.css";

export const InputForm = ({
  label,
  id,
  type = "text",
  autocomplete = "off",
  options,
  onChange,
  value,
  placeholder,
}) => {
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className={styles.input}
            autoComplete={autocomplete}
            placeholder={placeholder}
          />
        );
      case "select":
        return (
          <Select
            inputId={id}
            value={value}
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            isSearchable
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                cursor: "pointer",
              }),
            }}
          />
        );
      case "date":
        return (
          <div className={styles.date_container}>
            <DatePicker
              id={id}
              wrapperClassName={styles.date_wrapper}
              className={styles.date}
              dateFormat="MM/dd/yyyy"
              selected={value}
              onChange={onChange}
              placeholderText={placeholder}
            />
            <img
              className={styles.image}
              src={Calendar}
              alt="calendar image"
              width={20}
              height={20}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {renderInput()}
      </div>
    </>
  );
};
