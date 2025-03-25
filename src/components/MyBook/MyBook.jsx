import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./MyBook.module.scss";

import AddReading from "../AddReading/AddReading";
import Diary from "../Diary/Diary";
import Statistics from "../Statistics/Statistics";

import { selectCurrentReadingBook } from "../../redux/reading/readingSelectors";

export default function MyBook() {
  const [activeTab, setActiveTab] = useState("diary");
  const book = useSelector(selectCurrentReadingBook);

  if (!book) {
    return (
      <div className={styles.emptyState}>
        <p>Select a book from your library to start reading</p>
      </div>
    );
  }

  return (
    <div className={styles.myBookWrapper}>
      <h2 className={styles.title}>Reading: {book.title}</h2>

      <AddReading bookId={book._id} />

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "diary" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("diary")}
        >
          Diary
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "statistics" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("statistics")}
        >
          Statistics
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "diary" ? (
          <Diary bookId={book._id} />
        ) : (
          <Statistics bookId={book._id} />
        )}
      </div>
    </div>
  );
}
