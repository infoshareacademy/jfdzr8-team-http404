import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../../UserDataContext/UserDataContext";
import { db } from "../../../Api/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddBookToUserButton = ({ book, buttonStyle }) => {
  const { userData } = useContext(userDataContext);
  const [isDisabled, setIsDisabled] = useState();
  const notify = () => toast.success("Dodano do Biblioteki");

  useEffect(() => {
    setIsDisabled(book.status === "niedostępna" ? true : false);
  }, [book.status]);

  const assignUserBook = async () => {
    const docRef = doc(db, "books", book.id);
    await updateDoc(docRef, {
      userId: `${userData.id}`,
      status: "niedostępna",
    });
  };

  const handleClick = () => {
    assignUserBook();
    notify();
    setIsDisabled(true);
  };

  return (
    <>
      <button
        disabled={isDisabled}
        className={buttonStyle}
        onClick={handleClick}
      >
        {isDisabled === false
          ? "Wypożycz książkę"
          : "Książka chwilowo niedostępna"}
      </button>
    </>
  );
};