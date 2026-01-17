import React from "react";
import Link from "next/link";

// ตัวอย่างการ import Component ที่มีอยู่มาลอง test (ถ้ามี)
// import Title from '@/components/title/Title';

export default function TestPage() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">🧪 หน้า Test Page</h1>
      <p className="mb-6">
        หน้านี้ถูกสร้างขึ้นแบบ Hardcode ใน Next.js เพื่อทดสอบระบบ
      </p>

      <div className="p-6 bg-gray-100 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">ทดสอบ Tailwind CSS</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click Me
        </button>
      </div>

      <div className="border-t pt-4">
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
          &larr; กลับหน้าหลัก (Home)
        </Link>
      </div>
    </div>
  );
}
