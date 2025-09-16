import Header from "@/components/Header";
import styles from "./page.module.css";

export default function About() {
  return (
    <>
      <Header />
      <main className="p-6">
       <div>
       <h1 className={styles.title}>Миний тухай</h1>
       <p className={styles.description}>
        Энэ хуудсыг CSS Module ашиглаж загварчилсан.
      </p>
    </div>
      </main>
    </>
  );
}
