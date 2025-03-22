import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./LibraryPage.module.scss";

import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";
import MyLibraryBooks from "../../components/Reading/MyLibraryBooks";

export default function RecommendedPage() {
  return (
    <>
      <div className={styles.containerRecommended}>
        <Header />
        <div className={styles.contentRecommended}>
          <Dashboard />
          <RecommendedBooks />
          <MyLibraryBooks />
          <Suspense fallback={<div>Загрузка...</div>}></Suspense>
        </div>
      </div>
    </>
  );
}
