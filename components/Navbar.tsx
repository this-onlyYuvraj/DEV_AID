"use client"
import Link from "next/link";
import Image from "next/image";
import { login, logout } from "@/lib/auth-action";
import { Session } from "next-auth";
export default function Navbar({session}: {session: Session | null}){
    return <nav className="bg-gray-900 shadow-md py-4 border-b">
         <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
            <Link href="/" className="flex items-center space-x-2" >
                {/* <Image src={"/next.svg"} alt="Logo" width={100} height={50} /> */}
                <span className="text-white font-bold text-2xl" style={{ fontFamily: "vamos, sans-serif" }}>DEV AID</span>
            </Link>
            <div className="flex items-center space-x-4">
                <Link href="/api-illustrator" className="text-white hover:text-sky-500">Api Illustrator</Link>
                <Link href="/JSONFormatter" className="text-white hover:text-sky-500">JSON Formatter</Link>
                <Link href="/moreTools" className="text-white hover:text-sky-500">More Tools</Link>
                {session?(
                    <button className="bg-gray-800 py-1 px-2 rounded hover:bg-black-900 text-white cursor-pointer" onClick={logout} >
                    Sign Out
                    </button>
                    ):(
                        <button
                        className="bg-gray-800 py-1 px-2 rounded hover:bg-black-900 text-white cursor-pointer" onClick={login}>Sign In</button>
                    )
                }   
            </div>
        </div>
    </nav>
}