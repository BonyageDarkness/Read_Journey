import { useSelector, useDispatch } from "react-redux";
import styles from "./Diary.module.scss";
import { selectReadingDiary } from "../../redux/reading/readingSelectors";
import { deleteReadingEntry } from "../../redux/reading/readingOperations";
import { toast } from "react-toastify";

export default function Diary({ bookId }) {
  const diary = useSelector(selectReadingDiary);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteReadingEntry({ bookId, entryId: id })).unwrap();
      toast.success("Entry deleted");
    } catch (err) {
      toast.error("Failed to delete entry");
    }
  };

  if (!diary || diary.length === 0) {
    return <p className={styles.empty}>No reading activity yet.</p>;
  }

  return (
    <ul className={styles.diaryList}>
      {diary.map((entry) => (
        <li key={entry._id} className={styles.diaryItem}>
          <div>
            <p className={styles.date}>
              {new Date(entry.date).toLocaleDateString("en-GB")}
            </p>
            <p className={styles.info}>
              Read <span className={styles.pages}>{entry.pagesRead} pages</span>{" "}
              in{" "}
              <span className={styles.duration}>
                {entry.timeSpent || "?"} min
              </span>
            </p>
            <p className={styles.percent}>
              Progress:{" "}
              {entry.progressPercent
                ? `${entry.progressPercent.toFixed(1)}%`
                : "?"}
            </p>
          </div>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(entry._id)}
          >
            <svg className={styles.icon}>
              <use href="/sprite.svg#icon-trash-2" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
