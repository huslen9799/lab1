// src/app/form/register1/page.tsx
"use client"; // Энэ файл нь клиент талд (Client Component) ажиллахыг заана (Next.js 13+).

import { useState, useEffect } from "react"; // React-н state болон side effects-ийг удирдах хукуудыг импортлоно.
import { useRouter } from "next/navigation"; // Next.js-н маршрутчлалын (navigation) хукыг импортлоно.
import { sendRequest } from "@/utils/api"; // Өмнө нь тайлбарласан API-н хүсэлт илгээх функцийг импортлоно.

interface RegisteredUser {
  // Амжилттай бүртгүүлсэн хэрэглэгчийн мэдээллийн төрлийг тодорхойлох интерфейс.
  user_id: number; // Хэрэглэгчийн ID.
  email: string; // Хэрэглэгчийн имэйл.
  first_name: string; // Хэрэглэгчийн нэр.
  last_name: string; // Хэрэглэгчийн овог.
}

export default function RegisterPage() {
  // Бүртгэлийн хуудасны үндсэн React функц (component).
  const router = useRouter(); // Маршрутчлалыг удирдахын тулд useRouter хукыг ашиглана.

  const [email, setEmail] = useState(""); // Имэйл талбарын state. Эхний утга нь хоосон string.
  const [password, setPassword] = useState(""); // Нууц үг талбарын state.
  const [firstName, setFirstName] = useState(""); // Нэр талбарын state.
  const [lastName, setLastName] = useState(""); // Овог талбарын state.

  const [loading, setLoading] = useState(false); // Хүсэлт илгээж байгаа эсэхийг илэрхийлэх state. Эхний утга нь false.
  const [error, setError] = useState(""); // Алдааны мессежийг хадгалах state. Эхний утга нь хоосон string.

  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Нэвтэрсэн эсэхийг шалгаж байгаа үеийг илэрхийлэх state. Эхний утга нь true.

  // Нэвтэрсэн хэрэглэгч байгаа эсэхийг шалгах
  useEffect(() => {
    // Component анх render хийгдэхэд нэг удаа ажиллах side effect.
    // Client side-д ажиллаж байгааг шалгах
    if (typeof window !== "undefined") {
      // Код browser-т ажиллаж байгаа эсэхийг шалгана (localStorage нь зөвхөн browser-т байдаг).
      const loggedInUser = localStorage.getItem("login"); // localStorage-аас "login" нэртэй түлхүүрийг татаж авна.
      if (loggedInUser) {
        // Хэрвээ "login" утгатай байвал (нэвтэрсэн гэсэн үг)
        // Хэрэглэгч нэвтэрсэн бол dashboard руу шилжүүлэх
        router.push("/form/dashboard"); // Хэрэглэгчийг dashboard хуудас руу шилжүүлнэ.
      }
    }
    setIsCheckingAuth(false); // Шалгалт дууссан тул state-ийг false болгоно.
  }, [router]); // router-ийг dependency-д оруулна // useEffect нь зөвхөн router-ийн утга өөрчлөгдөхөд (үүнийг Next.js баталгаажуулдаг) дахин ажиллана.

  // Хэрвээ нэвтэрсэн эсэхийг шалгаж байгаа бол ямар ч UI харуулалгүй
  if (isCheckingAuth) return null; // Хэрэглэгчийн нэвтэрсэн эсэхийг шалгаж байх үед component юу ч render хийхгүй (null буцаана).

  const handleRegister = async (e: React.FormEvent) => {
    // Бүртгүүлэх товчийг дарахад ажиллах асинхрон функц.
    e.preventDefault(); // Формын үндсэн submit үйлдлийг (хуудас reload хийх) зогсооно.
    setError(""); // Өмнөх алдааны мессежийг цэвэрлэнэ.
    setLoading(true); // Loading төлөвийг true болгоно.

    try {
      // API хүсэлт илгээх хэсэг: try-catch блок дотор алдааг барина.
      const response = await sendRequest<RegisteredUser[]>( // sendRequest функцийг дуудаж, хариуг RegisteredUser[] төрлөөр хүлээж авна.
        {
          // Хүсэлтээр илгээх өгөгдөл (RequestBody).
          action: "register", // Серверийн үйлдлийн нэр.
          email, // Имэйл утга.
          password, // Нууц үг утга.
          first_name: firstName, // Нэр.
          last_name: lastName, // Овог.
        },
        "/api/auth/register/" // Хүсэлт илгээх endpoint.
      );

      if (response.resultCode === 8010) {
        // Серверээс ирсэн resultCode нь амжилттай бүртгэгдсэнийг илэрхийлэх код байвал:
        // Амжилттай бүртгэгдсэн → Login руу
        router.push("/form/login1"); // Хэрэглэгчийг нэвтрэх хуудас руу шилжүүлнэ.
      } else {
        // Бусад тохиолдолд (бүртгэл амжилтгүй болсон эсвэл өөр код ирсэн бол):
        // API error message
        setError(response.resultMessage || "Бүртгэл амжилтгүй."); // API-н алдааны мессежийг харуулна, эсвэл ерөнхий мессеж харуулна.
      }
    } catch (err: unknown) {
      // sendRequest функцээс (HTTP, сүлжээний) алдаа ирсэн тохиолдолд:
      if (err instanceof Error) {
        // Хэрвээ алдаа нь Error object бол:
        setError(err.message); // Error-н мессежийг харуулна.
      } else {
        // Бусад төрлийн алдаа байвал:
        setError("Алдаа гарлаа."); // Ерөнхий алдааны мессеж харуулна.
      }
    }

    setLoading(false); // Хүсэлт дууссан тул loading төлөвийг false болгоно.
  };

  return (
    // Component-н UI-г render хийх хэсэг.
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      {/* // Бүх хуудсыг төвлөрүүлэх div (Tailwind CSS ашигласан). */}
      <form // Бүртгэлийн форм.
        onSubmit={handleRegister} // Submit хийхэд handleRegister функцийг дуудна.
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md" // Формын загвар.
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Бүртгүүлэх</h1>
        {/* // Гарчиг. */}
        {error && ( // Хэрвээ error state утгатай бол:
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {/* // Алдааны мессежийг улаан өнгөөр харуулах div. */}
            {error} {/* // Алдааны мессеж. */}
          </div>
        )}
        <label className="block mb-2 text-sm font-medium">Имэйл</label>
        {/*  // Имэйл талбарын label.*/}
        <input
          type="email" // Имэйл оролтын төрөл.
          value={email} // State-ээр удирдагдах утга (controlled input).
          onChange={(e) => setEmail(e.target.value)} // Утга өөрчлөгдөхөд state-ийг шинэчлэх.
          className="w-full border rounded p-2 mb-4" // Оролтын талбарын загвар.
          required // Заавал бөглөх шаардлагатай.
        />
        <label className="block mb-2 text-sm font-medium">Нууц үг</label>{" "}
        {/* //Нууц үг талбарын label.*/}
        <input
          type="password" // Нууц үг оролтын төрөл (утгыг нууцлах).
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
        <label className="block mb-2 text-sm font-medium">Овог</label>{" "}
        {/* // Овог талбарын label. */}
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
        <label className="block mb-2 text-sm font-medium">Нэр</label>{" "}
        {/* // Нэр талбарын label. */}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
        <button // Бүртгүүлэх товч.
          type="submit" // Товч дарахад формын submit үйлдлийг гүйцэтгэнэ.
          disabled={loading} // loading үед товчийг идэвхгүй болгоно.
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2" // Товчны загвар.
        >
          {loading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}{" "}
          {/* // loading төлвөөс хамаарч товчны текстийг өөрчилнө. */}
        </button>
      </form>
    </div>
  );
}
