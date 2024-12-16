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
  const [searchQuery, setSearchQuery] = useState("");

  const onStartInvestigate = async () => {
    const payload = {
      goal,
      identifier,
      searchQuery,
    };
    console.log("Payload", payload);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const response = await fetch(apiUrl + "startSearch", options);
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
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
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Organisation">Organisation</SelectItem>
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
                <SelectItem value="phoneNumber">Phone number</SelectItem>
                <SelectItem value="domain">Domain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="input-group test">
            <label htmlFor="">Search query</label>
            <input
              type="text"
              placeholder="Enter your query.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
