import "./profile.css";
import CartLink from "@/components/CartLink";

export default function ProfilePage() {
  return <><CartLink /><main className="signin-page"><section className="signin-card"><a className="brand" href="/">TAMBOLAHUB</a><p className="eyebrow">Welcome back</p><h1>Sign in</h1><form><div className="field"><label htmlFor="username">Username</label><input id="username" name="username" type="text" autoComplete="username" placeholder="Enter your username" required /></div><div className="field"><div className="field-row"><label htmlFor="password">Password</label><a className="forgot" href="#forgot-password">Forgot password?</a></div><input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required /></div><button className="signin" type="submit">SIGN IN&nbsp; →</button></form><p className="signup">New to TambolaHub? <a href="#create-account">Create an account</a></p></section></main></>;
}
