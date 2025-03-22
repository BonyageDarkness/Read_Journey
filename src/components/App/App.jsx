import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import { logout } from "../../redux/auth/authSlice";
import { selectToken } from "../../redux/auth/authSelectors";
import { setAuthToken } from "../../api/axiosInstance";

import styles from "./App.module.scss";

const LoginPage = lazy(() => import("../../pages/Login/LoginPage"));
const SignupPage = lazy(() => import("../../pages/Registration/SignUpPage"));
const RecommendedPage = lazy(() =>
  import("../../pages/Recommended/RecommendedPage")
);
const LibraryPage = lazy(() => import("../../pages/MyLibrary/LibraryPage"));
function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    const logoutTime = localStorage.getItem("logoutTime");
    if (logoutTime && Date.now() > Number(logoutTime)) {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

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
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
