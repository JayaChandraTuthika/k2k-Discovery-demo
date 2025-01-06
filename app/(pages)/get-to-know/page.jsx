"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";

const mockQuestionData = [
  {
    question: "What best describes you?",
    answers: ["Individual Researcher", "Business Professional", "Government Agency"],
  },
  {
    question: "What's your primary use for K2K Discovery?",
    answers: ["Personal Research", "Professional Investigations", "Security Assessment"],
  },
  {
    question: "How experienced are you with OSINT tools?",
    answers: ["Beginner", "Intermediate", "Expert"],
  },
];

const GetToKnow = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const [describes, setDescribes] = useState("Individual Researcher");
  const [primaryUse, setPrimaryUse] = useState("Personal Research");
  const [experience, setExperience] = useState("Beginner");
  const [questionData, setQuestionData] = useState([]);

  const onSubmitDetails = async (e) => {
    e.preventDefault();
    // console.log(describes);
    // console.log(primaryUse);
    // console.log(experience);
    console.log(questionData);
    // const response = await fetch("/api/submitEnquiry", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(questionData),
    //   });
    // const data = await response.json();
    router.push("/search");
  };

  const getQuestionData = async (user) => {
    // const response = await fetch("/api/getQuestionData", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ user: user }),
    // });
    // const data = await response.json();
    const data = [...mockQuestionData];
    console.log(data);
    setQuestionData(data);
  };

  const setAnswer = (index, answer) => {
    setQuestionData((prev) => {
      const newQueData = prev.map((que, queIndex) => (queIndex === index ? { ...que, selectedAnswer: answer } : que));
      return newQueData;
    });
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      const user = session.user;
      getQuestionData(user);
    }
  }, [sessionStatus]);

  return (
    <main className="login-bg">
      <Link href="/">
        <Image src="/img/infosec-logo-1.svg" alt="logo" height={50} width={120} className="logo-image" />
      </Link>

      <form action="" className="login-form" onSubmit={onSubmitDetails}>
        <h3>Tell Us About Yourself</h3>
        {questionData.map((que, queIndex) => {
          return (
            <div className="input-group" key={queIndex}>
              <label htmlFor="">{que.question}</label>
              <Select defaultValue={que.answers[0]} onValueChange={(val) => setAnswer(queIndex, val)}>
                <SelectTrigger className="w-full select-btn">
                  <SelectValue placeholder={que.question} />
                </SelectTrigger>
                <SelectContent className="options-menu">
                  {que.answers.map((ans) => (
                    <SelectItem key={ans} value={ans}>
                      {ans}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })}
        {/* <div className="input-group">
          <label htmlFor="">What best describes you?</label>
          <Select defaultValue="Individual Researcher" onValueChange={(val) => setDescribes(val)}>
            <SelectTrigger className="w-full select-btn">
              <SelectValue placeholder="What best describes you?" />
            </SelectTrigger>
            <SelectContent className="options-menu">
              <SelectItem value="Individual Researcher">Individual Researcher</SelectItem>
              <SelectItem value="Business Professional">Business Professional</SelectItem>
              <SelectItem value="Government Agency">Government Agency</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="input-group">
          <label htmlFor="">What's your primary use for K2K Discovery?</label>
          <Select defaultValue="Personal Research" onValueChange={(val) => setPrimaryUse(val)}>
            <SelectTrigger className="w-full select-btn">
              <SelectValue placeholder="What best describes you?" />
            </SelectTrigger>
            <SelectContent className="options-menu">
              <SelectItem value="Personal Research">Personal Research</SelectItem>
              <SelectItem value="Professional Investigations">Professional Investigations</SelectItem>
              <SelectItem value="Security Assessment">Security Assessment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="input-group">
          <label htmlFor="">How experienced are you with OSINT tools?</label>
          <Select defaultValue="Beginner" onValueChange={(val) => setExperience(val)}>
            <SelectTrigger className="w-full select-btn">
              <SelectValue placeholder="What best describes you?" />
            </SelectTrigger>
            <SelectContent className="options-menu">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <button type="submit" className="submit">
          Complete Setup
        </button>
      </form>
    </main>
  );
};

export default GetToKnow;
