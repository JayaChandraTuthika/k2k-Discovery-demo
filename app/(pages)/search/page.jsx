"use client";
import Header from "@/components/Header";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [identifier, setIdentifier] = useState("");

  const onStartInvestigate = () => {
    router.push("/investigate");
  };

  return (
    <main className="search-bg">
      <Header />
      <div className="header-text">
        <h2>OSINT Search</h2>
        <button>Reports</button>
      </div>
      <div className="form">
        <p className="text-1">Select a goal for investigation</p>
        <div className="input-group">
          <label htmlFor="">Select a goal</label>

          <Select defaultValue="" onValueChange={(val) => setGoal(val)}>
            <SelectTrigger className="w-full select-btn">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent className="options-menu">
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="oraganisation">Organisation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="row-inputs">
          <div className="input-group search-select">
            <label htmlFor="">Select an Identifier</label>
            <Select defaultValue="" onValueChange={(val) => setIdentifier(val)}>
              <SelectTrigger className="w-full select-btn">
                <SelectValue placeholder="Identifier" />
              </SelectTrigger>
              <SelectContent className="options-menu">
                <SelectItem value="username">Username</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="Phone number">Phone number</SelectItem>
                <SelectItem value="domain">Domain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="input-group test">
            <label htmlFor="">Enter text</label>
            <input type="text" placeholder="Type Something.." />
          </div>
          <button className="search-btn" onClick={onStartInvestigate}>
            Search
          </button>
        </div>
        <div className="search-history">
          <h2>Search history</h2>
          <div className="list">
            <div className="item">
              <p>John Doe</p>
              <button>Rerun</button>
            </div>
            <div className="item">
              <p>test@gmail.com</p>
              <button>Rerun</button>
            </div>
            <div className="item">
              <p>example.com</p>
              <button>Rerun</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Search;
