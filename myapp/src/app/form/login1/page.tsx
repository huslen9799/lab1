// src/app/form/login1/page.tsx
"use client"; // Энэ файл нь клиент талд (Client Component) ажиллахыг заана (Next.js 13+).

import { useState, useEffect } from "react"; // React-н state болон side effects-ийг удирдах хукуудыг импортлоно.
import { useRouter } from "next/navigation"; // Next.js-н маршрутчлалын (navigation) хукыг импортлоно.
import { sendRequest } from "@/utils/api"; // API-н хүсэлт илгээх функцийг импортлоно.

interface LoginUser {
  // Амжилттай нэвтэрсэн хэрэглэгчийн мэдээллийн төрлийг тодорхойлох интерфейс.
  user_id: number; // Хэрэглэгчийн ID.
  email: string; // Хэрэглэгчийн имэйл.
  user_role: string; // Хэрэглэгчийн үүрэг (role).
  first_name: string; // Хэрэглэгчийн нэр.
  last_name: string; // Хэрэглэгчийн овог.
}

export default function LoginPage() {
  // Нэвтрэх хуудасны үндсэн React функц (component).
  const router = useRouter(); // Маршрутчлалыг удирдахын тулд useRouter хукыг ашиглана.

  const [email, setEmail] = useState(""); // Имэйл талбарын state. Эхний утга нь хоосон string.
  const [password, setPassword] = useState(""); // Нууц үг талбарын state.
  const [loading, setLoading] = useState(false); // Хүсэлт илгээж байгаа эсэхийг илэрхийлэх state.
  const [error, setError] = useState(""); // Алдааны мессежийг хадгалах state.

  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Нэвтэрсэн эсэхийг шалгаж байгаа үеийг илэрхийлэх state.

  // Нэвтэрсэн хэрэглэгч байгаа эсэхийг шалгах
  useEffect(() => {
    // Component анх render хийгдэхэд нэг удаа ажиллах side effect.
    // Client side-д ажиллаж байгааг шалгах
    if (typeof window !== "undefined") {
      // Код browser-т ажиллаж байгаа эсэхийг шалгана.
      const loggedInUser = localStorage.getItem("login"); // localStorage-аас "login" түлхүүрийг татаж авна.
      if (loggedInUser) {
        // Хэрвээ "login" утгатай байвал (нэвтэрсэн гэсэн үг)
        // Хэрэглэгч нэвтэрсэн бол dashboard руу шилжүүлэх
        router.push("/form/dashboard"); // Хэрэглэгчийг dashboard хуудас руу шилжүүлнэ.
      }
    }
    setIsCheckingAuth(false); // Шалгалт дууссан тул state-ийг false болгоно.
  }, [router]); // router-ийг dependency-д оруулна // useEffect нь router-ийн утга өөрчлөгдөхөд дахин ажиллана.

  // Хэрвээ нэвтэрсэн эсэхийг шалгаж байгаа бол ямар ч UI харуулалгүй
  if (isCheckingAuth) return null; // Нэвтэрсэн эсэхийг шалгаж байх үед component юу ч render хийхгүй (UI blinking-ээс сэргийлнэ).

  const handleLogin = async (e: React.FormEvent) => {
    // Нэвтрэх товчийг дарахад ажиллах асинхрон функц.
    e.preventDefault(); // Формын үндсэн submit үйлдлийг зогсооно.
    setError(""); // Өмнөх алдааны мессежийг цэвэрлэнэ.
    setLoading(true); // Loading төлөвийг true болгоно.

    try {
      // API хүсэлт илгээх хэсэг: try-catch блок дотор алдааг барина.
      const response = await sendRequest<LoginUser[]>( // sendRequest функцийг дуудаж, хариуг LoginUser[] төрлөөр хүлээж авна.
        {
          // Хүсэлтээр илгээх өгөгдөл (RequestBody).
          action: "login", // Серверийн үйлдлийн нэр.
          email, // Имэйл утга.
          password, // Нууц үг утга.
        },
        "/api/auth/login/" // Хүсэлт илгээх endpoint.
      );

      if (response.resultCode === 8110) {
        // Серверээс ирсэн resultCode нь амжилттай нэвтэрснийг илэрхийлэх код байвал:
        const user = response.data[0]; // Хариуны data массивын эхний элементийг хэрэглэгчийн мэдээлэл болгож авна.
        // Save login info to localStorage
        localStorage.setItem("login", JSON.stringify(user)); // Хэрэглэгчийн мэдээллийг JSON болгож localStorage-д хадгална.

        // Redirect to dashboard
        router.push("/form/dashboard"); // Хэрэглэгчийг dashboard хуудас руу шилжүүлнэ.
      } else {
        // Бусад тохиолдолд (нэвтрэлт амжилтгүй болсон эсвэл өөр код ирсэн бол):
        setError(response.resultMessage || "Нэвтрэхэд алдаа гарлаа."); // API-н алдааны мессежийг харуулна, эсвэл ерөнхий мессеж харуулна.
      }
    } catch (err: unknown) {
      // API хүсэлтийн үед (HTTP, сүлжээний) алдаа гарсан тохиолдолд:
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
      <form // Нэвтрэх форм.
        onSubmit={handleLogin} // Submit хийхэд handleLogin функцийг дуудна.
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md" // Формын загвар.
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Нэвтрэх</h1>{" "}
        {/* // Гарчиг. */}
        {error && ( // Хэрвээ error state утгатай бол:
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {/* // Алдааны мессежийг улаан өнгөөр харуулах div. */}
            {error} {/* // Алдааны мессеж. */}
          </div>
        )}
        <label className="block mb-2 text-sm font-medium">Имэйл</label>{" "}
        {/* // Имэйл талбарын label. */}
        <input
          type="email" // Имэйл оролтын төрөл.
          value={email} // State-ээр удирдагдах утга (controlled input).
          onChange={(e) => setEmail(e.target.value)} // Утга өөрчлөгдөхөд state-ийг шинэчлэх.
          className="w-full border rounded p-2 mb-4" // Оролтын талбарын загвар.
          required // Заавал бөглөх шаардлагатай.
        />
        <label className="block mb-2 text-sm font-medium">Нууц үг</label>{" "}
        {/* // Нууц үг талбарын label. */}
        <input
          type="password" // Нууц үг оролтын төрөл.
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
        <button // Нэвтрэх товч.
          type="submit" // Товч дарахад формын submit үйлдлийг гүйцэтгэнэ.
          disabled={loading} // loading үед товчийг идэвхгүй болгоно.
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2" // Товчны загвар.
        >
          {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          {/* // loading төлвөөс хамаарч товчны текстийг өөрчилнө. */}
        </button>
      </form>
    </div>
  );
}
