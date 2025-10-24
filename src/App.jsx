import styles from "./App.module.css";
import Header from "./components/Header";
import Book from "./components/Book";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import NewBookDialog from "./components/NewBookDialog";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [books, setBooks] = useState([]);

  const addBook = (newBook) => {
    const bookWithId = { id: nanoid(), ...newBook };
    setBooks((current) => [...current, bookWithId]);
  };

  const selectBook = (id) => {
    setBooks((current) =>
      current.map((book) => ({ ...book, selected: book.id === id ? !book.selected : false }))
    );
  };

  const deleteSelected = () => {
    setBooks((current) => current.filter((book) => !book.selected));
  };

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <div className={styles.actions}>
          <Modal>
            <NewBookDialog onAddBook={addBook} />
          </Modal>
          <button className={styles.updateBtn}>Update</button>
          <button className={styles.deleteBtn} onClick={deleteSelected}>
            Delete
          </button>
        </div>
        <div className={styles.bookList}>
          {books.map((bookData) => (
            <Book
              key={bookData.id}
              imgSrc={bookData.imgSrc}
              imgAlt={bookData.bookTitle}
              bookLink={bookData.bookLink}
              bookTitle={bookData.bookTitle}
              bookPrice={bookData.bookPrice}
              bookAuthor={bookData.bookAuthor}
              selected={bookData.selected}
              onSelect={() => selectBook(bookData.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
