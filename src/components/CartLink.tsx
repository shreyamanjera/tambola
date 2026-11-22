"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartLink({ className = "cart-button" }: { className?: string }) {
  const { itemCount } = useCart();
  return <Link className={className} href="/cart" aria-label={`Cart with ${itemCount} items`}>Cart ({itemCount})</Link>;
}
