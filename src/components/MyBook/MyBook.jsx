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
      <AddReading bookId={book._id} className={styles.myBookReading} />
      <div className={styles.myBookTabs}>
        <div className={styles.tabs}>
          <h3 className={styles.diaryTitle}>
            {activeTab === "diary" ? "Diary" : "Statistics"}
          </h3>

          <div className={styles.buttonIcons}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "diary" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("diary")}
            >
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-hourglass" />
              </svg>
            </button>

            <button
              className={`${styles.tabButton} ${
                activeTab === "statistics" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("statistics")}
            >
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-pie-chart" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "diary" ? (
            <Diary bookId={book._id} />
          ) : (
            <Statistics bookId={book._id} />
          )}
        </div>
      </div>
    </div>
  );
}
