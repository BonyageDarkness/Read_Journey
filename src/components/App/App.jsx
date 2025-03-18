import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";

import styles from "./App.module.scss";
import { logout } from "../../redux/auth/authSlice";

const LoginPage = lazy(() => import("../../pages/Login/LoginPage"));
const SignupPage = lazy(() => import("../../pages/Registration/SignUpPage"));
const RecommendedPage = lazy(() =>
  import("../../pages/Recommended/RecommendedPage")
);
function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutTime = localStorage.getItem("logoutTime");
    if (logoutTime && Date.now() > Number(logoutTime)) {
      dispatch(logout());
    }
  }, [dispatch]);

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
            <Route path="/recommended" element={<RecommendedPage />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
