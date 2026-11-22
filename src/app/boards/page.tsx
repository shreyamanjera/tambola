"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartLink from "@/components/CartLink";
import { CartProduct, useCart } from "@/context/CartContext";
import "./boards.css";
import "./luxury.css";

const products: Array<CartProduct & { eyebrow: string; displayPrice: string; originalPrice?: string; discount?: string; description: string; details: string[]; images: string[]; bulkOnly?: boolean; bulkAnchor?: boolean }> = [
  { id: "saddle-brown-20-board-set", name: "Saddle Brown-Base Tambola Boards Set (20 Boards)", eyebrow: "PREMIUM TAMBOLA COLLECTION", price: 300, displayPrice: "₹300", description: "A reusable set of premium pink Tambola boards, designed for memorable game nights and made to last.", details: ["20 boards in every packet", "Sturdy hard-base finish", "Reusable and easy to mark"], image: "/premium-board-set-user-supplied.png", images: ["/premium-board-set-user-supplied.png", "/premium-board-set-2.jpeg"] },
  { id: "saddle-brown-500-board-set", name: "Saddle Brown-Base Tambola Boards Set (500 Boards)", eyebrow: "PREMIUM TAMBOLA COLLECTION", price: 7000, displayPrice: "₹7000", description: "A reusable set of premium pink Tambola boards, designed for memorable game nights and made to last.", details: ["500 boards in every bulk order", "Sturdy hard-base finish", "Reusable and easy to mark"], image: "/bulk-board-stack-3d-enhanced.png", images: ["/bulk-board-stack-3d-enhanced.png"], bulkOnly: true, bulkAnchor: true },
  { id: "saddle-brown-1000-board-set", name: "Saddle Brown-Base Tambola Boards Set (1000 Boards)", eyebrow: "PREMIUM TAMBOLA COLLECTION", price: 14000, originalPrice: "MRP ₹15000", displayPrice: "₹14000", description: "A reusable set of premium brown hard-base Tambola boards, crafted for large celebrations and bulk events.", details: ["1000 boards in every bulk order", "Sturdy hard-base finish", "Reusable and easy to mark"], image: "/bulk-board-stack-3d-enhanced.png", images: ["/bulk-board-stack-3d-enhanced.png"], bulkOnly: true },
  { id: "brown-base-30-board-set", name: "Brown-Base Tambola Boards Set — 30 Boards", eyebrow: "PREMIUM TAMBOLA COLLECTION", price: 450, displayPrice: "₹450", discount: "10% OFF", description: "A reusable set of premium pink Tambola boards, designed for memorable game nights and made to last.", details: ["30 boards in every packet", "Sturdy hard-base finish", "Reusable and easy to mark"], image: "/premium-board-set-user-supplied.png", images: ["/premium-board-set-user-supplied.png", "/premium-board-set-2.jpeg"] },
  { id: "brown-base-50-board-set", name: "Brown-Base Tambola Boards Set — 50 Boards", eyebrow: "PREMIUM TAMBOLA COLLECTION", price: 750, displayPrice: "₹750", discount: "12% OFF", description: "A reusable set of premium pink Tambola boards, designed for memorable game nights and made to last.", details: ["50 boards in every packet", "Sturdy hard-base finish", "Reusable and easy to mark"], image: "/premium-board-set-user-supplied.png", images: ["/premium-board-set-user-supplied.png", "/premium-board-set-2.jpeg"] },
];

export default function BoardsPage() {
  const { addItem } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const addToCart = (product: CartProduct) => {
    addItem(product);
    setAdded(product.id);
    window.setTimeout(() => setAdded(current => current === product.id ? null : current), 1800);
  };

  return <main className="boards-page"><header><Link className="logo" href="/">TAMBOLAHUB</Link><CartLink /></header>{products.map(product => <section className={`product ${product.bulkOnly ? "bulk-product" : ""}`} id={product.bulkAnchor ? "bulk-orders" : undefined} key={product.id}><div className={`photos ${product.images.length === 1 ? "one-photo" : ""}`}>{product.images.map((image, imageIndex) => <Image key={image} src={image} alt={`${product.name} ${imageIndex + 1}`} width={700} height={525} />)}</div><div><span>{product.eyebrow}</span><h1>{product.name}</h1><strong>{product.originalPrice && <del>{product.originalPrice}</del>}{product.displayPrice}</strong>{product.discount && <em className="discount">{product.discount}</em>}<p>{product.description}</p><div className="details">{product.details.map(detail => <div key={detail}>{detail}</div>)}</div><button onClick={() => addToCart(product)}>{added === product.id ? "✓ Added to Cart" : "Add to Cart"}</button><small aria-live="polite">{added === product.id ? `${product.name} added to cart.` : ""}</small></div></section>)}</main>;
}
