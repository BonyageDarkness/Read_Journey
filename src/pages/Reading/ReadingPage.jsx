import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./ReadingPage.module.scss";

import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";

export default function ReadingPage() {
  return (
    <div className={styles.containerReading}>
      <Header />
      <div className={styles.contentReading}>
        <Dashboard page="reading" />
      </div>
    </div>
  );
}
