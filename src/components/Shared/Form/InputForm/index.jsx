import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import PropTypes from "prop-types";

import Calendar from "../../../../assets/calendar.svg";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./index.module.css";

const TextInput = ({ autocomplete, id, onChange, placeholder, value }) => (
  <input
    type="text"
    id={id}
    value={value}
    onChange={onChange}
    className={styles.input}
    autoComplete={autocomplete}
    placeholder={placeholder}
  />
);

const SelectInput = ({ id, onChange, options, placeholder, value }) => (
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

const DateInput = ({ id, value, onChange, placeholder }) => (
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

const InputForm = ({
  label,
  id,
  type,
  autocomplete,
  options,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {type === "text" && (
        <TextInput
          id={id}
          value={value}
          onChange={onChange}
          autocomplete={autocomplete}
          placeholder={placeholder}
        />
      )}
      {type === "select" && (
        <SelectInput
          id={id}
          value={value}
          options={options}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {type === "date" && (
        <DateInput
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "select", "date"]),
  autocomplete: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
};

InputForm.defaultProps = {
  type: "text",
  autocomplete: "off",
  options: [],
  placeholder: "",
};

export default InputForm;
