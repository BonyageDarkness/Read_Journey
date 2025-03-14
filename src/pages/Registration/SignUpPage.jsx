import SignUpForm from "../../components/Auth/SignUpForm";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
}
