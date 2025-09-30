// Энэ хуудсыг client component болгохын тулд заавал бичнэ.
// Хэрэв "use client" байхгүй бол зөвхөн server component болно.
"use client";

import Layout from "@/components/Layout";
// React-аас useState hook-ийг import хийж байна.
import { useState } from "react";

// Default export хийсэн функц бол бидний хуудасны component.
export default function CounterPage() {
  // useState(0) → count-ийн анхны утгыг 0 гэж тогтоож байна.
  // count → одоогийн утга хадгална.
  // setCount → state-г шинэчлэх зориулалттай функц.
  const [count, setCount] = useState(0);

  // Component-ийн JSX буцааж байна.
  return (
    <Layout>
    // flex, flex-col → column чиглэлтэй уян контейнер
    // items-center → доторх элементүүдийг голлуулна
    // gap-4 → элементүүдийн хооронд 1rem (16px) зай авна
    <div className="flex flex-col items-center gap-4">
      {/* Гарчиг */}
      <h1 className="text-2xl font-bold">Counter App</h1>

      {/* Одоогийн count-ийн утгыг харуулах */}
      <p className="text-xl">Current count: {count}</p>

      {/* Товчнуудыг нэг мөрөнд байрлуулах flex контейнер */}
      <div className="flex gap-2">
        {/* Increase товч */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          // onClick event → товч дарахад setCount(count + 1) ажиллана
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>

        {/* Decrease товч */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          // count-ийг 1-ээр хасна
          onClick={() => setCount(count - 1)}
        >
          Decrease
        </button>

        {/* Reset товч */}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          // count-ийг анхны утга (0) болгож сэргээх
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
    </Layout>
  );
}
