"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <Link href="/">
      <header className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Tripzy Logo" width={126} height={40} />
        </div>
      </header>
    </Link>
  );
};
export default Header;
