import Image from "next/image"
import styles from "./page.module.css"
import Header from "@/components/Header"
import LeadForm from "@/components/LeadForm"

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.form}>
        <LeadForm />
      </div>
    </main>
  )
}
