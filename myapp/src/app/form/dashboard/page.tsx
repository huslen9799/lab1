// src/app/form/dashboard/page.tsx
"use client"; // Энэ файл нь клиент талд (Client Component) ажиллахыг заана.

import { useEffect, useState } from "react"; // React-н state болон side effects-ийг удирдах хукуудыг импортлоно.
import { useRouter } from "next/navigation"; // Next.js-н маршрутчлалын (navigation) хукыг импортлоно.

interface User {
  // Dashboard-д харуулах хэрэглэгчийн үндсэн мэдээллийн төрлийг тодорхойлох интерфейс.
  user_id: number; // Хэрэглэгчийн ID.
  email: string; // Хэрэглэгчийн имэйл.
  first_name: string; // Хэрэглэгчийн нэр.
  last_name: string; // Хэрэглэгчийн овог.
}

export default function DashboardPage() {
  // Dashboard хуудасны үндсэн React функц (component).
  const router = useRouter(); // Маршрутчлалыг удирдахын тулд useRouter хукыг ашиглана.
  const [user, setUser] = useState<User | null>(null); // Нэвтэрсэн хэрэглэгчийн мэдээллийг хадгалах state (анхлан null).
  const [loading, setLoading] = useState(true); // Мэдээлэл ачаалж байгаа эсэхийг илэрхийлэх state (анхлан true).

  useEffect(() => {
    // Component анх render хийгдэхэд нэг удаа ажиллах side effect.
    // localStorage-ээс хэрэглэгчийн мэдээллийг унших
    const userStr = localStorage.getItem("login"); // localStorage-аас "login" түлхүүрээр хадгалагдсан JSON string-ийг авна.

    if (userStr) {
      // Хэрвээ "login" string олдвол:
      try {
        // JSON парслах оролдлого (алдаа гарах магадлалтай тул try-catch ашиглана).
        const parsedUser: User = JSON.parse(userStr); // JSON string-ийг User объект руу хөрвүүлнэ.
        setUser(parsedUser); // Хөрвүүлсэн объектыг user state-д хадгална.
      } catch (err) {
        // JSON парслах үед алдаа гарвал:
        console.error("User parsing алдаа:", err); // Алдааг консолд хэвлэнэ.
        localStorage.removeItem("login"); // Буруу форматтай байсан тул localStorage-аас устгана.
        router.push("/form/login1"); // Хэрэглэгчийг нэвтрэх хуудас руу шилжүүлнэ.
      }
    } else {
      // Хэрвээ localStorage-д "login" string байхгүй бол:
      // Хэрвээ localStorage-д хэрэглэгч байхгүй бол login руу
      router.push("/form/login1"); // Хэрэглэгчийг нэвтрэх хуудас руу шилжүүлнэ.
    }

    setLoading(false); // Ачаалал дууссан тул loading state-ийг false болгоно.
  }, [router]); // router-ийг dependency-д оруулна

  if (loading) {
    // Хэрвээ мэдээлэл ачаалж байгаа бол:
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Түр хүлээнэ үү...</p>{" "}
        {/* // "Түр хүлээнэ үү..." гэсэн текстийг дэлгэцийн голд харуулна. */}
      </div>
    );
  }

  if (!user) {
    // Хэрвээ loading дууссан бөгөөд user state-д мэдээлэл байхгүй бол:
    return null; // Redirect хийх учраас UI харуулах шаардлагагүй // Юу ч render хийхгүй (нэвтрэх хуудас руу шилжсэн байна).
  }

  return (
    // Хэрэглэгч нэвтэрсэн бол dashboard-н UI-г render хийнэ.
    <div className="p-8 max-w-xl mx-auto bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>{" "}
      {/* // Dashboard-н гарчиг. */}
      <p className="mb-2">
        <strong>Нэр:</strong> {user.first_name} {user.last_name}{" "}
        {/* // Хэрэглэгчийн нэр, овог. */}
      </p>
      <p className="mb-2">
        <strong>Имэйл:</strong> {user.email} {/* // Хэрэглэгчийн имэйл. */}
      </p>
      <p className="mb-2">
        <strong>User ID:</strong> {user.user_id} {/* // Хэрэглэгчийн ID. */}
      </p>
      <button // Logout хийх товч.
        onClick={() => {
          // Товчийг дарахад гүйцэтгэх функц.
          localStorage.removeItem("login"); // localStorage-аас нэвтрэх мэдээллийг устгана.
          router.push("/form/login1"); // Хэрэглэгчийг нэвтрэх хуудас руу шилжүүлнэ.
        }}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" // Товчны загвар.
      >
        Logout {/* // Товчны текст. */}
      </button>
    </div>
  );
}
