import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className=" bg-slate-900 border-t border-slate-700 py-4">
            <div className="mx-auto w-full max-w-7xl px-4 flex justify-center text-sm">
                © {new Date().getFullYear()}
                <Link to="/" className="hover:underline hover:text-indigo-400">
                    BookBase
                </Link>
                . All Rights Reserved.
            </div>
        </footer>
    );
}