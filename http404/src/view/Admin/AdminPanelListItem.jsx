import { useState } from "react";
import { db } from "../../../src/Api/firebase";
import {
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import styles from "./Admin.module.css";

export const AdminPanelListItem = ({book, getData}) => {
  const [title, setNewTitle] = useState(book.title);
  const [author, setNewAuthor] = useState(book.author);
  const [description, setNewDescription] = useState(book.description);
  const [status, setNewStatus] = useState(book.status);
  const [image, setNewImage] = useState();
  const [genre, setNewGenre] = useState(book.genre);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  
  const handleDelete = () => {
    const docRef = doc(db, "books", book.id);

    deleteDoc(docRef)
      .then(() => {
        toast.success("Ksiązka usunięta!");
        getData()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const docRef = doc(db, "books", book.id);
    
    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const updates = {
          title: title || doc.data().title,
          author: author || doc.data().author,
          description: description || doc.data().description,
          status: status || doc.data().status,
          image: image || doc.data().image,
          genres: genre || doc.data().genre,
        };
        updateDoc(docRef, updates, book.id)
          .then(() => {
            handleClose()
            toast.success("Dane zostały zmienione poprawnie");
            getData()
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
          <>
            <li className={styles.listBooksWrapper}>
            <img src={book.image} alt="okładka ksiązki" style={{width:"10vw"}}></img>
            <p className={styles.bookTitle} >{book.title}</p>
            <p className={styles.bookAuthor} >{book.author}</p>
            <p className={styles.bookStatus} >{book.status} </p>
            <button className={styles.btnDelete} id={styles.buttonAppearance} onClick={handleDelete}>Usuń</button>
            <button className={styles.btnEdit} id={styles.buttonAppearance}  onClick={handleOpen}>Edytuj</button>
            </li>
            <Modal
              open={open}
              onClose={handleClose}
              contentLabel="Example Modal"
            >
              <div className={styles.modalWrapper}>
              <label htmlFor="Tytuł">Tytuł:</label>
              <input
                className={styles.input}
                type="text"
                name="title"
                value={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <label htmlFor="author">Autor:</label>
              <input
                className={styles.input}
                key={book.author}
                type="text"
                name="author"
                value={author}
                onChange={(e) => setNewAuthor(e.target.value)}
              />

              <label htmlFor="description">Opis:</label>
              <input
                className={styles.input}
                key={book.description}
                type="text"
                name="description"
                value={description}
                onChange={(e) => setNewDescription(e.target.value)}
              />

              <label htmlFor="status">Niedostępna</label>
              <input
                className={styles.input}
                key={book.status}
                type="radio"
                name="status"
                value="niedostępna"
                checked={status === "niedostępna"}
                onChange={(e) => setNewStatus(e.target.value)}
              />

              <label htmlFor="status">Dostępna</label>
              <input
                className={styles.input}
                type="radio"
                name="status"
                key={book.statuss}
                value="dostępna"
                checked={status === "dostępna"}
                onChange={(e) => setNewStatus(e.target.value)}
              />

              <label htmlFor="imageurl">Zdjęcie ksiązki:</label>
              <input
                className={styles.input}
                key={book.imageURL}
                type="text"
                placeholder={book.imageURL}
                name="imageURL"
                value={image}
                onChange={(e) => setNewImage(e.target.value)}
              />
                <label htmlFor="gatunek">Gatunek:</label>
              <select
                className={styles.input}
                id="genres"
                name="genres"
                key={book.genres}
                value={genre}
                onChange={(e) => setNewGenre(e.target.value)}
              >
                <option value="kryminał">Kryminał</option>
                <option value="lektura szkolna">Lektura szkolna</option>
                <option value="poradnik">Poradnik</option>
                <option value="książki dla dzieci">Książka dla dzieci</option>
                <option value="biografia">Biografia</option>
                <option value="literatura obyczajowa">
                  Literatura obyczajowa
                </option>
                <option value="thriller">Thriller</option>
                <option value="literatura piękna">Literatura piękna</option>
              </select>
              { console.log(book.id)}
              <button id={styles.buttonAppearance}  onClick={() => { handleUpdate(book.id)}}>Wyślij zmiany</button>
              <button id={styles.buttonAppearance}  onClick={handleClose}>Zamknij</button>
              </div>
            </Modal>
            </>
        )}


