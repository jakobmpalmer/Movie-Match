import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "./Home/Home";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <HomePage />
      </main>
    </div>
  );
}
