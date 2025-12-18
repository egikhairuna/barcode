"use client";

import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    const btn = btnRef.current;
    if (!btn) return;

    const x = Math.random() * 260 - 130;
    const y = Math.random() * 140 - 70;

    btn.style.transform = `translate(${x}px, ${y}px) rotate(${
      Math.random() * 360
    }deg)`;
  };

  return (
    <div className="flex flex-wrap min-h-screen overflow-hidden">
      {/* KIRI */}
      <div className="w-full sm:w-8/12">
        <div className="container mx-auto h-full p-10">
          <nav className="flex justify-between items-center">
            <div className="text-4xl font-black text-pink-600 rotate-[-2deg]">
              BAR<span className="text-green-500">KODE</span>
            </div>
          </nav>

          <header className="mt-20">
            <h1 className="text-5xl font-extrabold mb-6 animate-pulse">
              Barcode Generator
            </h1>

            <div className="w-24 h-3 bg-gradient-to-r from-pink-500 to-yellow-400 mb-10"></div>

            <Link href="">
              <button
                ref={btnRef}
                onMouseEnter={moveButton}
                onMouseDown={moveButton}
                className="evil-btn"
              >
                KLIK DISINI
              </button>
            </Link>
          </header>
        </div>
      </div>
      <a
        href="/barcode-generator"
        className="w-full sm:w-4/12 h-64 sm:h-screen object-cover transition-all"
      >
        <img
          src="https://jamesboogie.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-18-at-10.26.32.jpeg"
          alt="temen"
          href="/barcode-generator"
        />
      </a>

      {/* STYLE NORAK */}
      <style>{`
        .evil-btn {
          font-size: 22px;
          font-weight: 900;
          padding: 18px 30px;
          border-radius: 18px;
          border: 4px dashed hotpink;
          background: linear-gradient(
            45deg,
            red,
            yellow,
            lime,
            cyan,
            magenta
          );
          background-size: 300% 300%;
          color: black;
          cursor: pointer;
          animation: rainbow 1s infinite linear;
          transition: transform 0.1s ease;
          text-shadow: 2px 2px white;
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
