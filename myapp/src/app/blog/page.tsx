import Link from "next/link";
import { blogs } from "@/app/data/blogs";

export default function BlogPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog List</h1>
      <ul className="space-y-3">
        {blogs.map((blog) => (
          <li key={blog.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{blog.blogname}</h2>
            <p className="text-gray-600">{blog.description}</p>
            <Link
              href={`/blog/${blog.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
