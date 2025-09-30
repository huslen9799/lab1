import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">My Website</h1>
          <nav className="space-x-6">
            <Link href="/" className="hover:font-18px">
              Нүүр
            </Link>
            <Link href="/about" className="hover:underline">
              Бидний тухай
            </Link>
            <Link href="/blog" className="hover:underline">
              Блог
            </Link>
            <Link href="/contact" className="hover:underline">
              Холбоо барих
            </Link>
            <Link href="/gallery" className="hover:underline">
              Зургийн цомог
            </Link>
              <Link href="/counter" className="hover:underline">
              counter
            </Link>
              <Link href="/todo" className="hover:underline ">
             todo
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-4 text-gray-600">
        © {new Date().getFullYear()} My Website — Бүх эрх хуулиар хамгаалагдсан.
      </footer>
    </div>
  );
}
