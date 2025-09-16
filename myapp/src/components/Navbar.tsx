import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link> | 
      <Link href="/about">About</Link> | 
      <Link href="/blog/1">Blog</Link>
    </nav>
  );
}
