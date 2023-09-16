import Styles from "./index.module.css";

const Button = ({ className, onClick, children }) => {
  return (
    <button className={`${Styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
