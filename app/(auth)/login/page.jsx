import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <main className="login-bg">
      <Link href="/">
        <Image
          src="/img/infosec-logo-1.svg"
          alt="logo"
          height={50}
          width={120}
          className="logo-image"
        />
      </Link>

      <form action="" className="login-form">
        <h3>Welcome back</h3>
        <div className="input-group">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter email" />
        </div>
        <div className="input-group">
          <label htmlFor="">Password</label>
          <input type="text" placeholder="Enter password" />
        </div>
        <button type="submit" className="submit">
          Sign In
        </button>
        <p className="end-text">
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
