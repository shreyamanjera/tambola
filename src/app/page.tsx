"use client";

import Image from "next/image";
import { useState } from "react";
import CartLink from "@/components/CartLink";
import "./photo.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <main><div className="grain" /><div className="page">
    <header><button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><span className="menu-lines"><i /><i /><i /></span>Menu</button><div className="header-actions"><a className="profile-button" href="/profile">Profile</a><CartLink /></div></header>
    <button className={`drawer-scrim ${menuOpen ? "open" : ""}`} aria-label="Close menu" onClick={closeMenu} />
    <aside className={`side-nav ${menuOpen ? "open" : ""}`}><h2>Explore</h2><a href="/boards" onClick={closeMenu}>Explore Boards</a><a href="/boards#bulk-orders" onClick={closeMenu}>Bulk Orders</a><a href="/about" onClick={closeMenu}>Contact Us</a></aside>
    <section className="hero hero-landscape"><Image src="/tambola-hero-landscape.png" alt="Friends enjoying a Tambola game night around a table" width={1536} height={864} priority sizes="(max-width: 900px) 100vw, 900px" /><div className="hero-overlay"><div><div className="hero-brand">TAMBOLAHUB</div><h1>Turn Every Gathering Into an Unforgettable Tambola Experience</h1><p>Tambola Boards perfect for Kitty Parties, Weddings, Corporate Events, Birthdays, Festivals and Family Gatherings.</p></div></div></section>
    <section className="perfect-for"><h2>Perfect for</h2><div className="event-list"><span><i>💍</i>Weddings</span><span><i>🫖</i>Kitty Parties</span><span><i>🏢</i>Corporate Events</span><span><i>🎂</i>Birthday Parties</span><span><i>🎓</i>Schools</span><span><i>🏘️</i>Housing Societies</span></div></section>
    <section className="why-boards"><p>WHY OUR BOARDS?</p><div className="why-content"><Image src="/why-our-boards-material.png" alt="Close-up of the premium black board material" width={1024} height={1365} /><div className="why-features"><span><i>✦</i>Premium rectangular design</span><span><i>✦</i>Thick, durable material</span><span><i>✦</i>Luxury finish</span><span><i>✦</i>Clear, easy-to-read numbers</span><span><i>✦</i>Six tickets on one board</span><span><i>✦</i>Unique number combinations</span></div></div></section>
  </div></main>;
}
