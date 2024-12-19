import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ loggedIn }) => {
  return (
    <nav className="header-desktop">
      <Link href="/">
        <Image
          src={"/img/infosec-logo-1.svg"}
          height={50}
          width={120}
          alt="logo"
        />
      </Link>

      <div className="links">
        {loggedIn ? (
          <Link href="/" className="login">
            Logout
          </Link>
        ) : (
          <>
            <Link href="/signup" className="sign-up">
              Signup
            </Link>
            <Link href="/login" className="login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
