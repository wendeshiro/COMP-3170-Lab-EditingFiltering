import styles from "./NewBookDialog.module.css";

export default function NewBookDialog({ onAddBook }) {
  const closeDialog = () => {
    const dialog = document.querySelector(".newBookDialog");
    if (dialog) {
      dialog.close();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const newBook = {
      imgSrc: data.get("imgSrc") || "",
      imgAlt: data.get("bookTitle") || "",
      bookLink: data.get("bookLink") || "",
      bookTitle: data.get("bookTitle") || "",
      bookPrice: data.get("bookPrice") || "",
      bookAuthor: data.get("bookAuthor") || "",
    };

    onAddBook(newBook);

    e.currentTarget.reset();
    closeDialog();
  };

  const handleCancel = () => {
    closeDialog();
  };

  // const handleBackdropClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     closeDialog();
  //   }
  // };

  return (
    <div className={styles.dialogContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.title}>Add Your New Book</p>

        <div className={styles.inputs}>
          <label htmlFor="bookTitle">Title</label>
          <input type="text" id="bookTitle" name="bookTitle" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="bookPrice">Price</label>
          <input type="text" id="bookPrice" name="bookPrice" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="bookAuthor">Author</label>
          <input type="text" id="bookAuthor" name="bookAuthor" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="publisher">Publisher</label>
          <input type="text" id="publisher" name="publisher" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="publication">Publication Year</label>
          <input type="number" min="1500" id="publication" name="publication" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="pages">Pages</label>
          <input type="number" min="0" id="pages" name="pages" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="language">Language</label>
          <input type="text" id="language" name="language" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="imgSrc">Book Cover URL</label>
          <input type="url" id="imgSrc" name="imgSrc" required />
        </div>

        <div className={styles.inputs}>
          <label htmlFor="bookLink">Book Link</label>
          <input type="url" id="bookLink" name="bookLink" required />
        </div>

        <div className={styles.actionButtons}>
          <button type="submit" className={styles.addButton}>
            Submit
          </button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
