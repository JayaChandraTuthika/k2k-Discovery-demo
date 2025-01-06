"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AppSession = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AppSession;
