import { useSelector, useDispatch } from "react-redux";
import styles from "./Diary.module.scss";
import {
  selectReadingDiary,
  selectCurrentReadingBook,
} from "../../redux/reading/readingSelectors";
import { deleteReadingEntry } from "../../redux/reading/readingOperations";
import { toast } from "react-toastify";

export default function Diary({ bookId }) {
  const diary = useSelector(selectReadingDiary);
  const book = useSelector(selectCurrentReadingBook);
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
      {diary.map((entry) => {
        const formattedDate = entry.finishReading
          ? new Date(entry.finishReading)
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".")
          : "-";

        const pagesRead = entry.finishPage - entry.startPage;
        const durationMinutes = Math.round(
          (new Date(entry.finishReading) - new Date(entry.startReading)) / 60000
        );

        const speed =
          entry.speed ||
          (durationMinutes > 0
            ? Math.round((pagesRead / durationMinutes) * 60)
            : 0);

        const percent = book?.totalPages
          ? ((pagesRead / book.totalPages) * 100).toFixed(1)
          : "0.0";

        return (
          <li key={entry._id} className={styles.diaryCard}>
            <div className={styles.dateRow}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.pages}>{pagesRead} pages</span>
            </div>

            <div className={styles.detailsRow}>
              <div className={styles.left}>
                <p className={styles.percent}>{percent}%</p>
                <p className={styles.time}>{durationMinutes} minutes</p>
              </div>

              <div className={styles.right}>
                <p className={styles.speed}>
                  {speed ? `${speed} pages per hour` : "-"}
                </p>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(entry._id)}
                >
                  <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-trash-2" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
