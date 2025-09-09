import styles from "./page.module.css";
export default function About() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">Миний тухай</h1>
      <p className="mt-4 text-gray-700">
        Би Next.js ашиглаж веб хөгжүүлэлт сурч байна.
      </p>
      <p className="mt-2">Миний хобби: унших, аялах, программчлал.</p>
    </div>
  )
}

