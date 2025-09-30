"use client";

import Layout from "@/components/Layout";
import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => {
    if (count > 0) setCount(count - 1); // 0-оос доош буурахгүй
  };
  const reset = () => setCount(0);
  const double = () => setCount(count * 2);
  const half = () => setCount(Math.floor(count / 2));

  return (
    <Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold">Динамик Тоолуур</h1>
      <p className="text-2xl font-semibold">Тоолуур: {count}</p>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={decrease}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Хасах
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Тэглэх
        </button>
        <button
          onClick={increase}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Нэмэх
        </button>
        <button
          onClick={double}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          ×2
        </button>
        <button
          onClick={half}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          ÷2
        </button>
      </div>
    </div>
    </Layout>
  );
}
