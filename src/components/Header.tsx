"use client"

import Image from "next/image"
import styles from "./Header.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <Image
        src="/alma-logo.png"
        alt="Alma"
        className={styles.logo}
        width={68}
        height={24}
        objectFit="cover"
        objectPosition="center"
      />
      
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Assessment</Link>
        <Link href="/login" className={styles.loginButton}>Login</Link>
      </nav>
    </header>
  )
}