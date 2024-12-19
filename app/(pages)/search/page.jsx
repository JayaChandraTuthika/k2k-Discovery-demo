"use client";
import Header from "@/components/Header";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

const validateInputs = (goal, identifier, searchQuery) => {
  let inputs = [];
  if (!goal || goal === "") {
    inputs.push({
      valid: false,
      message: "Please enter a goal",
    });
  }
  if (!identifier || identifier === "") {
    inputs.push({
      valid: false,
      message: "Please enter an identifier",
    });
  }
  if (!searchQuery || searchQuery === "") {
    inputs.push({
      valid: false,
      message: "Please enter a search query",
    });
  }
  if (inputs.length > 0) {
    if (inputs.length === 1) {
      return inputs[0];
    } else {
      return {
        valid: false,
        message: "Please fill in all fields",
      };
    }
  } else {
    return {
      valid: true,
      message: "All fields are valid",
    };
  }
};

const Search = () => {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const onStartInvestigate = async () => {
    const validation = validateInputs(goal, identifier, searchQuery);
    if (validation.valid) {
      toast({
        description: validation.message,
        className: "success-toast",
      });
      const graphId = uuidv4();
      const payload = {
        goal,
        identifier,
        searchQuery,
        graphId,
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
        router.push(
          "/investigate?graphId=" +
            graphId +
            "&&search=" +
            searchQuery +
            "&&identifier=" +
            identifier
        );
      } catch (error) {
        console.log("error", error);
      }
    } else {
      toast({
        description: validation.message,
        className: "failed-toast",
      });
    }
    // const graphId = uuidv4();

    // router.push(
    //   "/investigate?graphId=" +
    //     graphId +
    //     "&&search=" +
    //     searchQuery +
    //     "&&identifier=" +
    //     identifier
    // );

    // router.push("/investigate");
  };

  return (
    <main className="search-bg">
      <Header loggedIn={true} />
      <div className="header-text">
        <h2>OSINT Search</h2>
        <button
          disabled
          title="this feature is coming soon"
          style={{ cursor: "not-allowed" }}
        >
          Reports
        </button>
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
              <SelectItem value="Brand Monitoring">Brand Monitoring</SelectItem>
              <SelectItem value="Dark Web Mentions">
                Dark Web Mentions
              </SelectItem>
              <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
              <SelectItem value="Threat Intelligence">
                Threat Intelligence
              </SelectItem>
              <SelectItem value="Market Analysis">Market Analysis</SelectItem>
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
