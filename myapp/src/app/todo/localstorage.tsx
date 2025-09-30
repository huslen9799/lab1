"use client";
import { useState, useEffect } from "react";

export default function LocalStorageExample() {
  const [name, setName] = useState("");

  // LocalStorage-с унших
  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) {
      setName(saved);
    }
  }, []);

  // LocalStorage-д хадгалах
  const saveName = () => {
    localStorage.setItem("username", name);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">👤 LocalStorage Demo</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)} // 🔹 event
        placeholder="Enter your name"
        className="border px-2 py-1"
      />
      <button
        onClick={saveName}
        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Save
      </button>
      <p>Saved: {name}</p>
    </div>
  );
}
