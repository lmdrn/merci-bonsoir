"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isPress = pathname === "/press";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" aria-label="Merci Bonsoir — accueil">
        <Image
          src="/images/logo-white.png"
          alt="Merci Bonsoir"
          width={140}
          height={44}
          className="h-7 w-auto"
          priority
        />
      </Link>

      <div className="flex items-center gap-6 text-xs tracking-[0.2em] uppercase font-semibold">
        <a
          href="/#music"
          className="opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          Écouter
        </a>
        <a
          href="/#video"
          className="opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          Clip
        </a>
        <Link
          href="/press"
          className={`${isPress ? "opacity-100" : "opacity-60"} hover:opacity-100 transition-opacity duration-200`}
        >
          Press
        </Link>
      </div>
    </nav>
  );
}