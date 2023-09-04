import Select from "react-select";
import styles from "./index.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../assets/calendar.svg";

export const InputForm = ({
  label,
  id,
  type = "text",
  autocomplete = "off",
  options,
  onChange,
  value,
}) => {
  return (
    <>
      <div className={styles.container}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {type === "text" && (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className={styles.input}
            autoComplete={autocomplete}
          />
        )}
        {type === "select" && (
          <Select
            value={value}
            isSearchable="true"
            options={options}
            onChange={onChange}
          />
        )}
        {type === "date" && (
          <div className={styles.date_container}>
            <DatePicker
              wrapperClassName={styles.date_wrapper}
              className={styles.date}
              dateFormat="dd/MM/yyyy"
              selected={value}
              onChange={onChange}
            />
            <img className={styles.image} src={Calendar} alt="" />
          </div>
        )}
      </div>
    </>
  );
};
