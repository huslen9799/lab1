import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="p-4">
      <p>Тоолуур: {count}</p>
      <button 
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setCount(count + 1)}>
        Нэмэх
      </button>
    </div>
  );
}