import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./AddReading.module.scss";
import {
  startReading,
  stopReading,
} from "../../redux/reading/readingOperations";
import {
  selectReadingStatus,
  selectCurrentProgress,
  selectCurrentReadingBook,
} from "../../redux/reading/readingSelectors";

export default function AddReading({ bookId }) {
  const [page, setPage] = useState("");
  const dispatch = useDispatch();

  const readingStatus = useSelector(selectReadingStatus);
  const isReading = readingStatus === "active";
  const currentBook = useSelector(selectCurrentReadingBook);
  const currentProgress = useSelector(selectCurrentProgress);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentBook) {
      toast.error("No current book");
      return;
    }

    const pageNum = parseInt(page);

    if (!page || isNaN(pageNum) || pageNum <= 0) {
      toast.error("Enter a valid page number");
      return;
    }

    if (pageNum > currentBook.totalPages) {
      toast.error("Page number exceeds total pages");
      return;
    }

    try {
      if (!isReading) {
        await dispatch(startReading({ bookId, page: pageNum })).unwrap();
        toast.success("Started reading");
      } else {
        if (pageNum <= currentProgress?.startPage) {
          toast.error("The finish page can't be less than the start page");
          return;
        }

        const result = await dispatch(
          stopReading({ bookId, page: pageNum })
        ).unwrap();

        toast.success("Stopped reading");

        if (
          result.status === "finished" ||
          pageNum === currentBook.totalPages
        ) {
          toast.info("You've finished the book!");
        }
      }

      setPage("");
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.label}>{isReading ? "Stop page:" : "Start page:"}</p>
      <div className={styles.readingInputWrapper}>
        <span className={styles.readingLabel}>Page number:</span>
        <input
          type="text"
          value={page}
          onChange={handleChange}
          className={styles.readingInput}
          placeholder="0"
        />
      </div>

      <button type="submit" className={styles.button}>
        {isReading ? "To stop" : "To start"}
      </button>
    </form>
  );
}
