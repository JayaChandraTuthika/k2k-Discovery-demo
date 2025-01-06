"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const onSignUp = (e) => {
    e.preventDefault();
    // router.push("/get-to-know");
    // handleGoogleSignIn();
  };
  const handleSubmit = async () => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      // Handle error (e.g., show error message)
      console.error(result.error);
    } else {
      // Redirect to dashboard or home page
      router.push("/dashboard");
    }
  };

  const handleGoogleSignIn = async () => {
    signIn(
      "google",
      // { redirect: false }
      { callbackUrl: "/signup" }
    );
  };

  useEffect(() => {
    if (status === "authenticated") {
      let existingUser = localStorage.getItem("unq_user");
      let user = {
        userToken: "xyz",
        user_id: 123,
        emailId: "test@gmai.com",
        user_name: "John Doe",
        role: "admin",
      };
      if (!existingUser) {
      }
      console.log(session);
      user = {
        userToken: "xyz",
        user_id: 123,
        emailId: session.user.email,
        user_name: session.user.name,
        role: "user",
      };
      localStorage.setItem("unq_user", JSON.stringify(user));
      router.push("/get-to-know");
    }
  }, [status]);
  console.log(status);
  return (
    <main className="login-bg">
      <Link href="/">
        <Image src="/img/infosec-logo-1.svg" alt="logo" height={50} width={120} className="logo-image" />
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
        <div className="social-login">
          <button type="button" className="icon" variant="outline" onClick={handleGoogleSignIn}>
            <Image src="/icon/google-color.svg" alt="logo" height={40} width={40} className="google-logo" />
          </button>
        </div>
        <p className="end-text">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
