import "./about.css";
import "./cart.css";
import "./contact.css";
import CartLink from "@/components/CartLink";

export default function AboutPage() {
  return <main className="about-page"><header><a className="logo" href="/">TAMBOLAHUB</a><CartLink /></header><section className="contact-title"><h1>Let’s Make Your Event More Exciting</h1><p>Whether you’re planning a wedding, kitty party, corporate event, or a bulk order, we’re here to help.</p></section><section className="about-values"><h2>What we believe</h2><div><p><b>Bring people together</b>The best game is one that makes everyone lean in.</p><p><b>Make it memorable</b>Small rituals can turn an ordinary evening into a tradition.</p><p><b>Play beautifully</b>Good design belongs wherever people gather.</p></div></section></main>;
}
