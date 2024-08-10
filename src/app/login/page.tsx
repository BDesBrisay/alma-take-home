import styles from "./login.module.css"

import Header from "@/components/Header"

export default function Login() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.grid}>
        <h1>Login</h1>
        <form>
          <label>
            Email
            <input type="email" />
          </label>
          <label>
            Password
            <input type="password" />
          </label>
          <button type="submit">Login</button>
          <span className={styles.error}></span>
        </form>
      </div>
    </main>
  );
}