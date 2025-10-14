import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <style>
      
      </style>
      <Link href="/"className="hover:font-size:18px">Home</Link> | 
      <Link href="/about">About</Link> | 
      <Link href="/blog/    ">Blog</Link> |
      <Link href="/contact/">Contact</Link>
      <Link href="/gallery/">Gallery</Link>
      <Link href="/counter/">Counter</Link>
      <Link href="/todo/">Todo</Link>
      <Link href="/localstorage/">storage</Link>
      <Link href="/form/register/">Register</Link>
      <Link href="/form/login/">Login</Link>
    </nav>
  );
}
