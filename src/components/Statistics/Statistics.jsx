import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectReadingDiary,
  selectCurrentReadingBook,
} from "../../redux/reading/readingSelectors";
import styles from "./Statistics.module.scss";

export default function Statistics() {
  const diary = useSelector(selectReadingDiary);
  const book = useSelector(selectCurrentReadingBook);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  if (!diary || diary.length === 0 || !book) return null;

  const totalPages = book.totalPages || 1;

  const totalReadPages = diary.reduce((sum, entry) => {
    return sum + (entry.finishPage - entry.startPage);
  }, 0);

  const progressPercent = Math.min(
    (totalReadPages / totalPages) * 100,
    100
  ).toFixed(2);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercent(progressPercent);
    }, 10);

    return () => clearTimeout(timeout);
  }, [progressPercent]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.progressWrapper}>
        <div className={styles.circleWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="116"
            height="116"
            viewBox="0 0 116 116"
            fill="none"
          >
            <path
              d="M116 59C116 91.0325 90.0325 117 58 117C25.9675 117 0 91.0325 0 59C0 26.9675 25.9675 1 58 1C90.0325 1 116 26.9675 116 59ZM10.44 59C10.44 85.2667 31.7333 106.56 58 106.56C84.2667 106.56 105.56 85.2667 105.56 59C105.56 32.7333 84.2667 11.44 58 11.44C31.7333 11.44 10.44 32.7333 10.44 59Z"
              fill="#1F1F1F"
            />
            <circle
              cx="58"
              cy="59"
              r="48"
              stroke="#30B94D"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="301.59"
              strokeDashoffset={301.59 * (1 - animatedPercent / 100)}
              transform="rotate(-90 58 59)"
              style={{ transition: "stroke-dashoffset 0.4s ease-in-out" }}
            />
          </svg>{" "}
          <div className={styles.percentageText}>
            {`${Math.floor(animatedPercent)}%`}
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <div className={styles.box} />
        <span className={styles.percent}>{progressPercent}%</span>
        <span className={styles.pages}>{totalReadPages} pages read</span>
      </div>
    </div>
  );
}
