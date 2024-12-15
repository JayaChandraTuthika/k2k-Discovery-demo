"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GetToKnow = () => {
  const router = useRouter();
  const [describes, setDescribes] = useState("Individual Researcher");
  const [primaryUse, setPrimaryUse] = useState("Personal Research");
  const [experience, setExperience] = useState("Beginner");

  const onSignUp = (e) => {
    e.preventDefault();
    console.log(describes);
    console.log(primaryUse);
    console.log(experience);
    router.push("/search");
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
        <h3>Tell Us About Yourself</h3>
        <div className="input-group">
          <label htmlFor="">What best describes you?</label>
          <Select
            defaultValue="Individual Researcher"
            onValueChange={(val) => setDescribes(val)}
          >
            <SelectTrigger className="w-full select-btn">
              <SelectValue placeholder="What best describes you?" />
            </SelectTrigger>
            <SelectContent className="options-menu">
              <SelectItem value="Individual Researcher">
                Individual Researcher
              </SelectItem>
              <SelectItem value="Business Professional">
                Business Professional
              </SelectItem>
              <SelectItem value="Government Agency">
                Government Agency
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="input-group">
          <label htmlFor="">What's your primary use for K2K Discovery?</label>
          <Select
            defaultValue="Personal Research"
            onValueChange={(val) => setPrimaryUse(val)}
          >
            <SelectTrigger className="w-full select-btn">
              <SelectValue placeholder="What best describes you?" />
            </SelectTrigger>
            <SelectContent className="options-menu">
              <SelectItem value="Personal Research">
                Personal Research
              </SelectItem>
              <SelectItem value="Professional Investigations">
                Professional Investigations
              </SelectItem>
              <SelectItem value="Security Assessment">
                Security Assessment
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="input-group">
          <label htmlFor="">How experienced are you with OSINT tools?</label>
          <Select
            defaultValue="Beginner"
            onValueChange={(val) => setExperience(val)}
          >
            <SelectTrigger className="w-full select-btn">
              <SelectValue placeholder="What best describes you?" />
            </SelectTrigger>
            <SelectContent className="options-menu">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button type="submit" className="submit">
          Complete Setup
        </button>
      </form>
    </main>
  );
};

export default GetToKnow;
