import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ReadingPage.module.scss";

import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";

import { getReadingProgress } from "../../redux/reading/readingOperations";
import { setCurrentReadingBook } from "../../redux/reading/readingSlice";
import { selectUserBooks } from "../../redux/books/booksSelectors";
import { selectCurrentReadingBook } from "../../redux/reading/readingSelectors";

export default function ReadingPage() {
  const dispatch = useDispatch();
  const { id: bookIdFromParams } = useParams();

  const userBooks = useSelector(selectUserBooks);
  const currentBook = useSelector(selectCurrentReadingBook);

  // Восстанавливаем книгу, если currentBook отсутствует
  useEffect(() => {
    if (!currentBook) {
      const saved = localStorage.getItem("readingBook");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch(setCurrentReadingBook(parsed));
      }
    }
  }, [currentBook, dispatch]);

  // Загружаем историю чтения и текущий прогресс
  useEffect(() => {
    if (currentBook?._id) {
      dispatch(getReadingProgress(currentBook._id));
    }
  }, [currentBook, dispatch]);

  return (
    <div className={styles.containerReading}>
      <Header />
      <div className={styles.contentReading}>
        <Dashboard page="reading" />
      </div>
    </div>
  );
}
