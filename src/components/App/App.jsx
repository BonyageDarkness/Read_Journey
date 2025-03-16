import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

import styles from "./App.module.scss";

const LoginPage = lazy(() => import("../../pages/Login/LoginPage"));
const SignupPage = lazy(() => import("../../pages/Registration/SignUpPage"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />{" "}
      <Suspense fallback={<div>Загрузка...</div>}>
        <div className={styles.container}>
          <Routes>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
