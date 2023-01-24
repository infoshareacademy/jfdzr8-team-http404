import { useEffect, useState } from "react";
import { db } from "../../../Api/firebase";
import {
  collection,
  getDocs,
  query,
  startAt,
  limit,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import BookCard from "./BookCard/BookCard";
import styles from "./ListBooks.module.css";
import Pagination from "../../../components/Pagination/Pagination";

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const getBooks = () => {
    const startIndex = currentPage * pageSize;
    const booksCollection = collection(db, "books");

    getCountFromServer(booksCollection).then((querySnapshot) => {
      const booksCount = querySnapshot.data().count;
      console.log(`Books count: ${booksCount}`);
      setTotalPages(Math.ceil(booksCount / pageSize));

      const queryBookPage = query(
        booksCollection,
        orderBy("id"),
        startAt(startIndex + 1),
        limit(pageSize)
      );
      getDocs(queryBookPage).then((querySnapshot) => {
        const booksOnPage = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(booksOnPage);
        setBooks(booksOnPage);
      });
    });
  };

  useEffect(() => {
    getBooks();
  });

  const handlePageChange = (data) => {
    console.log(`page selected ${data.selected}`);
    setCurrentPage(data.selected);
  };

  return (
    <div className={styles.listBookWrapper}>
      <span className={styles.ListBooks}>Choose Your Story:</span>
      <div className={styles.cards}>
        {books.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>

      <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default ListBooks;
