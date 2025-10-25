import styles from "./App.module.css";
import Header from "./components/Header";
import Book from "./components/Book";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import NewBookDialog from "./components/NewBookDialog";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import initialBooks from "../data/books.json";

export default function App() {
  const modalRef = useRef();

  const [dialogKey, setDialogKey] = useState(0);

  const [books, setBooks] = useState(() => {
    // first tries to load saved books from localStorage.
    try {
      const raw = localStorage.getItem("books");
      if (raw) {
        const saved = JSON.parse(raw);
        // ensure each saved book has selected flag
        return saved.map((b) => ({ ...b, selected: !!b.selected }));
      }
    } catch (e) {
      console.error("failed to load books from localStorage", e);
    }

    return initialBooks.map((b) => ({
      id: nanoid(),
      imgSrc: b.image,
      imgAlt: b.title,
      bookLink: b.url,
      bookTitle: b.title,
      bookPrice: b.price,
      bookAuthor: b.subtitle || "",
      selected: false,
    }));
  });

  // update books to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("books", JSON.stringify(books));
    } catch (e) {
      console.error("failed to save books to localStorage", e);
    }
  }, [books]);

  const addBook = (newBook) => {
    const bookWithId = { id: nanoid(), selected: false, ...newBook };
    setBooks((current) => [...current, bookWithId]);
  };

  const [editingBook, setEditingBook] = useState(null);

  const editBook = (updatedBook) => {
    setBooks(
      (current) => current.map((b) => (b.id === updatedBook.id ? { ...b, ...updatedBook } : b)) // Use spread operator to merge old and new data; same keys are updated
    );
    setEditingBook(null); // Clear editing state after edit
  };

  const selectBook = (id) => {
    setBooks(
      (current) =>
        current.map((book) => ({ ...book, selected: book.id === id ? !book.selected : false })) // change selected property of book object
    );
  };

  const deleteSelected = () => {
    setBooks((current) => current.filter((book) => !book.selected));
  };

  const handleEditClick = () => {
    const selected = books.filter((b) => b.selected); // keep only selected=true books
    if (selected.length === 0) {
      alert("Please select a book to edit.");
      return;
    }
    if (selected.length > 1) {
      alert("Please select only one book to edit.");
      return;
    }

    setEditingBook(selected[0]);
    if (modalRef.current) modalRef.current.show(); // imperative call to show modal
  };

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <div className={styles.actions}>
          <Modal ref={modalRef}>
            {/* dialog used for both add and edit */}
            <NewBookDialog
              key={editingBook?.id ?? dialogKey}
              onAddBook={addBook}
              onEditBook={editBook}
              initialBook={editingBook}
              onClose={() => {
                setEditingBook(null);
                if (modalRef.current) modalRef.current.close();
                // bump key to force remount and clear uncontrolled form values
                setDialogKey((k) => k + 1);
              }}
            />
          </Modal>
          <button className={styles.editBtn} onClick={handleEditClick}>
            Edit
          </button>
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
