import { sendPasswordResetEmail } from "@firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../../Api/firebase";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import { FormForgotPassword } from "../Form/FormForgotPassword";

export const ForgotPassword = () => {
  const handlePasswordReset = (e) => {
    toast.success("Hasło zostało wysłane");
    e.preventDefault();
    sendPasswordResetEmail(auth, e.target.email.value).catch((e) => {
      console.dir(e);
      alert(firebaseErrors[e.code]);
    });
  };

  return (
    <FormForgotPassword
      submitText="Poproś o przypomnienie hasła"
      onSubmit={handlePasswordReset}
      isPasswordHidden
    />
  );
};
