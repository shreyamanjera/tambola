"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  return (
    <button
      className="back-button"
      type="button"
      onClick={() => {
        if (
          typeof window !== "undefined" &&
          document.referrer &&
          new URL(document.referrer).origin === window.location.origin
        ) {
          router.back();
        } else {
          window.location.assign("/");
        }
      }}
      aria-label="Go back to the previous page"
    >
      <span aria-hidden="true">←</span> Back
    </button>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href="/">TAMBOLAHUB</Link>
        <p>Make every gathering memorable.</p>
      </div>
      <div className="footer-contact">
        <span>Contact</span>
        <a href="tel:+919818481094">+91 98184 81094</a>
        <a href="mailto:srishti.kandwal94@gmail.com">srishti.kandwal94@gmail.com</a>
      </div>
    </footer>
  );
}
