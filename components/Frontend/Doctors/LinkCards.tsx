import Link from "next/link";
import React from "react";

const LinkCards = ({ className }: { className?: string }) => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      <Link
        href="#"
        className={`rounded-md px-6 py-3 flex gap-4 bg-slate-800 text-slate-50 ${className}`}
      >
        <h2>Anxieté</h2>
        <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        href="#"
        className={`rounded-md px-6 py-3 flex gap-4 bg-slate-800 text-slate-50 ${className}`}
      >
        <h2>Anxieté</h2>
        <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        href="#"
        className={`rounded-md px-6 py-3 flex gap-4 bg-slate-800 text-slate-50 ${className}`}
      >
        <h2>Anxieté</h2>
        <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        href="#"
        className={`rounded-md px-6 py-3 flex gap-4 bg-slate-800 text-slate-50 ${className}`}
      >
        <h2>Anxieté</h2>
        <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        href="#"
        className={`rounded-md px-6 py-3 flex gap-4 bg-slate-800 text-slate-50 ${className}`}
      >
        <h2>Anxieté</h2>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
};

export default LinkCards;
