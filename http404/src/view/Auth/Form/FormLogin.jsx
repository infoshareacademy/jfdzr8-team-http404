import styles from "./Form.module.css";
import picture from "./illustration_atena_login.png";
import { Link } from "react-router-dom";

export const FormLogin = ({
  submitText,
  isPasswordHidden = false,
  onSubmit,
}) => (
  <div className={styles.formWrapper}>
    <img className={styles.picture} src={picture} alt="books"></img>
    <form onSubmit={onSubmit}>
      <div className={styles.labelWrapper}>
        <label htmlFor="email">E-mail:</label>
        <input type="email" name="email" id="email" />
      </div>
      {!isPasswordHidden && (
        <div className={styles.labelWrapper}>
          <label htmlFor="password">Hasło:</label>
          <input type="password" name="password" id="password" />
        </div>
      )}
      <Link to="przypomnijhaslo">
        <div className={styles.linkToForgotPassword}>
          <p>zapomniałeś hasła? </p>
        </div>
      </Link>
      <Link to="/auth/register">
        <div className={styles.linkToForgotPassword}>
          <p>Nie masz jeszcze konta? Zarejestruj się! </p>
        </div>
      </Link>
      <div className={styles.btnWrapper}>
        <button className={styles.btnForm}>{submitText}</button>
      </div>
    </form>
  </div>
);
