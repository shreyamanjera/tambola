"use client";

import Image from "next/image";
import Link from "next/link";
import CartLink from "@/components/CartLink";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import "./cart.css";

const rupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export default function CartPage() {
  const { items, subtotal, incrementItem, decrementItem, removeItem, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal - discount;

  const placeOrder = () => {
    if (items.length === 0) return;

    const orderDetails = items
      .map((item) => `${item.name} — Quantity: ${item.quantity} — ${rupees(item.price * item.quantity)}`)
      .join("\n");

    const subject = encodeURIComponent("New Tambola Board Order Request");
    const body = encodeURIComponent(
      `Hello,\n\nA new Tambola board order has been requested.\n\n${orderDetails}\n\nSubtotal: ${rupees(subtotal)}\nDiscount: ${rupees(discount)}\nDelivery: Free\nTotal: ${rupees(total)}\n\nPlease contact the customer to confirm delivery details.`
    );

    window.location.href = `mailto:srishti.kandwal94@gmail.com?subject=${subject}&body=${body}`;
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <>
      {orderPlaced && (
        <div className="order-confirmation">
          <p>Order placed!</p>
          <span>A request for your order has been sent to the owner.</span>
          <button onClick={() => setOrderPlaced(false)}>Close</button>
        </div>
      )}
      <div className="offer">
        Sign up and get 10% off your first order.{" "}
        <Link href="/profile">Sign Up Now</Link>
      </div>
      <main className="shop">
        <nav className="nav">
          <input
            className="search"
            placeholder="⌕  Search for boards..."
          />
          <Link className="brand" href="/">
            TAMBOLAHUB
          </Link>
          <div className="nav-right">
            <Link href="/boards">Shop</Link>
            <Link href="/about">Contact</Link>
            <CartLink className="cart" />
          </div>
        </nav>
        <div className="crumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Cart</span>
        </div>
        <h1 className="title">YOUR CART</h1>
        {items.length === 0 ? (
          <section className="empty-cart">
            <p>Your cart is empty.</p>
            <Link className="checkout" href="/boards">
              Continue Shopping
            </Link>
          </section>
        ) : (
          <div className="layout">
            <section className="items">
              {items.map((item) => (
                <article className="item" key={item.id}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={140}
                    height={116}
                  />
                  <div>
                    <h2>{item.name}</h2>
                    <p>Premium hard-base finish</p>
                    <p>
                      Product total: {rupees(item.price * item.quantity)}
                    </p>
                    <strong className="price">{rupees(item.price)}</strong>
                  </div>
                  <div
                    className="qty"
                    aria-label={`Quantity for ${item.name}`}
                  >
                    <button
                      type="button"
                      onClick={() => decrementItem(item.id)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementItem(item.id)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove"
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ⌫
                  </button>
                </article>
              ))}
            </section>
            <aside className="summary">
              <h2>Order Summary</h2>
              <div className="line">
                <span>Subtotal</span>
                <strong>{rupees(subtotal)}</strong>
              </div>
              <div className="line">
                <span>Discount (10%)</span>
                <strong className="discount">
                  −{rupees(discount)}
                </strong>
              </div>
              <div className="line">
                <span>Delivery Fee</span>
                <strong>Free</strong>
              </div>
              <div className="line total">
                <span>Total</span>
                <strong>{rupees(total)}</strong>
              </div>
              <div className="promo">
                <input placeholder="⌑  Add promo code" />
                <button type="button">Apply</button>
              </div>
              <button
                className="checkout"
                type="button"
                onClick={placeOrder}
              >
                Proceed to Checkout&nbsp; →
              </button>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
