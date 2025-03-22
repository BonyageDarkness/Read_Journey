import { useEffect } from "react";
import styles from "./BookModal.module.scss";
import { useDispatch } from "react-redux";
import { addBookToLibrary } from "../../redux/books/booksOperations";
import { toast } from "react-toastify";

export default function BookModal({ book, onClose }) {
  const dispatch = useDispatch();

  const handleAddToLibrary = async () => {
    try {
      console.log("📘 book object:", book);
      const payload = {
        title: book.title,
        author: book.author,
        totalPages: book.totalPages || book.pages || 1,
      };
      console.log("Payload to send:", payload);
      await dispatch(addBookToLibrary(payload)).unwrap();
      toast.success("Book added to library!");
      onClose();
    } catch (error) {
      toast.error(error || "Failed to add book");
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg className={styles.icon}>
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>

        <img src={book.imageUrl} alt={book.title} className={styles.image} />
        <h2 className={styles.title}>{book.title}</h2>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.pages}>{book.totalPages} pages</p>

        <button className={styles.addBtn} onClick={handleAddToLibrary}>
          Add to library
        </button>
      </div>
    </div>
  );
}
