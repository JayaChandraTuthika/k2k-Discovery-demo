"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Signup = () => {
  const router = useRouter();

  const onSignUp = (e) => {
    e.preventDefault();
    router.push("/get-to-know");
  };
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

      <form action="" className="login-form" onSubmit={onSignUp}>
        <h3>Create Your Account</h3>
        <div className="input-group">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter email" />
        </div>
        <div className="input-group">
          <label htmlFor="">Password</label>
          <input type="text" placeholder="Enter password" />
        </div>
        <div className="input-group">
          <label htmlFor="">Confirm Password</label>
          <input type="text" placeholder="Confirm password" />
        </div>
        <button type="submit" className="submit">
          Sign Up
        </button>
        <p className="end-text">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
