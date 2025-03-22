import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectReadingStatus } from "../../redux/readingFilter/readingFilterSelectors";
import { setReadingStatus } from "../../redux/readingFilter/readingFilterSlice";
import { fetchUserBooks } from "../../redux/books/booksOperations";
import { selectUserBooks } from "../../redux/books/booksSelectors";
import styles from "./MyLibraryBooks.module.scss";
import BookModal from "../BookModal/BookModal";

const dummyBooks = [
  { _id: "1", title: "Book One", author: "Author A", status: "unread" },
  { _id: "2", title: "Book Two", author: "Author B", status: "reading" },
  { _id: "3", title: "Book Three", author: "Author C", status: "finished" },
];

export default function MyLibraryBooks() {
  const dispatch = useDispatch();
  const status = useSelector(selectReadingStatus);
  const books = useSelector(selectUserBooks);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const handleOpenModal = (book) => setSelectedBook(book);
  const handleCloseModal = () => setSelectedBook(null);

  const handleRemove = (id) => {
    console.log("Removing book with id:", id);
  };

  const goToReadingPage = () => {
    console.log("Go to reading");
  };

  const filteredBooks = books.filter((book) => {
    if (status === "all") return true;
    return book.status === status;
  });

  const handleChange = (e) => {
    dispatch(setReadingStatus(e.target.value));
  };

  return (
    <div className={styles.libraryWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Library</h2>
        <select
          className={styles.select}
          value={status}
          onChange={handleChange}
        >
          <option value="all">All books</option>
          <option value="unread">Unread</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      <ul className={styles.booksList}>
        {filteredBooks.map((book) => (
          <li key={book._id} className={styles.bookCard}>
            <img
              src={book.imageUrl || "/default-book.png"}
              alt={book.title}
              className={styles.bookImage}
              onClick={() => handleOpenModal(book)}
            />
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.bookAuthor}>{book.author}</p>
              <button
                className={styles.removeButton}
                onClick={() => handleRemove(book._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={handleCloseModal}>
          <button className={styles.readButton} onClick={goToReadingPage}>
            Start reading
          </button>
        </BookModal>
      )}
    </div>
  );
}
