'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { login, logout } from "@/lib/auth-action";
import { Session } from "next-auth";
import { CircleUserRound } from "lucide-react";

export default function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 shadow-md py-4 border-b">
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-white font-bold text-2xl" style={{ fontFamily: "vamos, sans-serif" }}>
            DEVAID
          </span>
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-sky-500">Home</Link>
          <Link href="/api-illustrator" className="text-white hover:text-sky-500">API Illustrator</Link>
          <Link href="/JSONFormatter" className="text-white hover:text-sky-500">JSON Formatter</Link>
          <Link href="/moreTools" className="text-white hover:text-sky-500">More Tools</Link>

          {session ? (
            <div className="relative" ref={dropdownRef}>
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User"
                  width={32}
                  height={32}
                  className="cursor-pointer rounded-full"
                  onClick={() => setOpen((prev) => !prev)}
                />
              ) : (
                <CircleUserRound
                  className="text-white cursor-pointer"
                  size={32}
                  onClick={() => setOpen((prev) => !prev)}
                />
              )}

              {open && (
                <div className="absolute top-11 -right-11/12 mt-2 w-36 bg-gray-900 border-1 rounded shadow-lg z-50">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-950"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-gray-800 py-1 px-3 rounded hover:bg-gray-950 text-white cursor-pointer"
              onClick={login}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
