import styles from "./Form.module.css";
import picture from "./illustration_atena_signup.png";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";

export const FormRegister = ({
  submitText,
  onSubmit,
  open,
  handleClose,
  handleOpen,
}) => (
  <div className={styles.formWrapper}>
    <img className={styles.picture} src={picture} alt="books"></img>
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
      handleOpen()
      }}>

      <div className={styles.labelWrapper}>
        <label htmlFor="email">E-mail:</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="name">Imię:</label>
        <input type="text" name="name" id="name" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="surname">Nazwisko:</label>
        <input type="text" name="surname" id="surname" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="password">Hasło:</label>
        <input type="password" name="password" id="password" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="description">Napisz coś o sobie:</label>
        <input type="text" name="description" id="description" />
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.btnForm}>{submitText}</button>
      </div>
      <Modal open={open} onClose={handleClose} contentLabel="Example Modal">
        <div className={styles.modalWrapper}>
          <h2>Gratulacje! Pomyślnie zarejestrowałeś się w naszym serwisie.</h2>
          <p>
            Teraz możesz korzystać z wszystkich naszych usług. Jeśli
            potrzebujesz pomocy lub masz jakiekolwiek pytania, nie wahaj się
            skontaktować z naszym zespołem wsparcia. Dziękujemy za wybór naszej
            witryny i mamy nadzieję, że będzie Ci miło korzystać z naszych
            usług.
          </p>
          <Link to="/auth/login">
            <button className={styles.btnModal}>Zaloguj się!</button>
          </Link>
        </div>
      </Modal>
    </form>
  </div>
);
