import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./AddReading.module.scss";
import {
  startReading,
  stopReading,
} from "../../redux/reading/readingOperations";

export default function AddReading({ bookId }) {
  const [page, setPage] = useState("");
  const [isReading, setIsReading] = useState(false); // Локальное состояние для кнопки
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPage(value); // Только цифры
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pageNum = parseInt(page);
    if (!page || isNaN(pageNum) || pageNum <= 0) {
      toast.error("Enter a valid page number");
      return;
    }

    try {
      if (!isReading) {
        await dispatch(startReading({ bookId, page: pageNum })).unwrap();
        toast.success("Started reading");
        setIsReading(true);
      } else {
        const result = await dispatch(
          stopReading({ bookId, page: pageNum })
        ).unwrap();
        toast.success("Stopped reading");
        setIsReading(false);

        if (result.finished) {
          // например: result.finished === true
          toast.info("You've finished the book!");
          // тут можно открыть модалку, если она будет
        }
      }

      setPage("");
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Page:
        <input
          type="text"
          value={page}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter page number"
        />
      </label>
      <button type="submit" className={styles.button}>
        {isReading ? "To stop" : "To start"}
      </button>
    </form>
  );
}
