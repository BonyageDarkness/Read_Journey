import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./SignForm.module.css";
import sprite from "../../../public/sprite.svg";
import { registerUser } from "../../api/authAPI";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required(),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registration successful!");
      navigate("/recommended");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.signContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <svg className={styles.icon}>
          <use href="/sprite.svg#icon-Frame-8" />
        </svg>

        <h2 className={styles.title}>
          Expand your mind, reading{" "}
          <span className={styles.highlight}>a book</span>
        </h2>
        <div className={styles.labelContainer}>
          <div className={styles.wrapperLabel}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={styles.inputName}
              placeholder=""
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.wrapperLabel}>
            <label className={styles.label} htmlFor="email">
              Mail:
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={styles.inputEmail}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.wrapperLabel}>
            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={styles.inputPassword}
              />
              <span
                className={styles.togglePassword}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                👁
              </span>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Registration"}
        </button>

        <p className={styles.switch}>
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </form>
    </div>
  );
}
