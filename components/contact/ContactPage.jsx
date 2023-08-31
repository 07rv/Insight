"use client";

import Container from "../blog/Container";
import { useState } from "react";
import Link from "next/link";

const ContactPage = () => {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorField, setErrorField] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputHandler = (name, value) => {
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorField((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const setErrorMessage = (name, value) => {
    setErrorField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const checkAndSetValidationsErrors = () => {
    var hasError = false;
    Object.keys(inputField).map((field) => {
      if (field === "email") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter emailId");
        }
      } else if (field === "message") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter message");
        }
      } else if (field === "name") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter full name");
        }
      }
    });
    return hasError;
  };

  const submitButton = async () => {
    setIsLoading(true);
    if (!checkAndSetValidationsErrors()) {
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({
          name: inputField.name,
          email: inputField.email,
          message: inputField.message,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 1) {
            setIsLoading(false);
            setResponse(true);
            const timer = setTimeout(() => {
              setResponse("");
            }, 3000);
          } else {
            setIsLoading(false);
            setResponse(false);
            setResponse(true);
            const timer = setTimeout(() => {
              setResponse("");
            }, 3000);
          }
        });
    }
    setIsLoading(false);
  };
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        Contact
      </h1>
      <div className="prose mx-auto mt-6 text-center dark:prose-invert ">
        <div className="font-Cinzel font-semibold">
          <p>
            A dedicated and versatile software engineer with a strong foundation
            in multiple programming languages including JavaScript, SCSS, C#,
            TypeScript, Python, and C++. My experience spans across various
            cutting-edge technologies such as React, MongoDB, MySQL, and
            Angular. With a passion for problem-solving and innovation, I thrive
            in dynamic work environments.
          </p>
          <p>
            Proficiency extends to both front-end and back-end development,
            allowing me to create seamless user interfaces and robust
            server-side functionalities. I have a deep understanding of various
            tools and frameworks, enabling me to efficiently build and maintain
            applications that meet high standards of performance and user
            experience.
          </p>
        </div>
      </div>
      <div className="my-10 grid md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-5xl font-semibold dark:text-white font-Italianno">
            Insight
          </h2>
          <p className="mt-5 max-w-sm">
            Connecting through words: Explore insights, stories, and ideas on
            our contact page, where you can reach out, collaborate, and be part
            of our vibrant community.
          </p>

          <div className="mt-5">
            <div className="text-dark-600 mt-2 flex items-center space-x-2 dark:text-gray-400">
              <Link href={process.env.NEXT_PUBLIC_GITHUB} target="_blank">
                <button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                  Github
                </button>
              </Link>
            </div>
            <div className="text-dark-600 mt-2 flex items-center space-x-2 dark:text-gray-400">
              <Link href={process.env.NEXT_PUBLIC_LEETCODE} target="_blank">
                <button className="text-white bg-[#6f7761] hover:bg-[#505449]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#505449]/90 mr-2 mb-2">
                  Leet Code
                </button>
              </Link>
            </div>
            <div className="text-dark-600 mt-2 flex items-center space-x-2 dark:text-gray-400">
              <Link href={process.env.NEXT_PUBLIC_LINKEDIN} target="_blank">
                <button className="text-white bg-[#2583f5] hover:bg-[#3b84de]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#3b84de]/90 mr-2 mb-2">
                  LinkedIn
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="my-10">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                autoComplete="false"
                name="name"
                id="name"
                className={`w-full rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800 focus:ring-4 dark:bg-gray-900 dark:text-white   dark:placeholder:text-gray-200  ${
                  errorField && errorField.name
                    ? "border-red-600 ring-red-100 focus:border-red-600 dark:ring-0"
                    : "border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
                }`}
                defaultValue={inputField.name}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.name && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.name}</small>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                name="email"
                autoComplete="false"
                className={`w-full rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800 focus:ring-4 dark:bg-gray-900 dark:text-white   dark:placeholder:text-gray-200  ${
                  errorField && errorField.email
                    ? "border-red-600 ring-red-100 focus:border-red-600 dark:ring-0"
                    : "border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
                }`}
                defaultValue={inputField.email}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.email && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.email}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                className={`h-36 w-full rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800   focus:ring-4 dark:bg-gray-900  dark:text-white dark:placeholder:text-gray-200  ${
                  errorField && errorField.message
                    ? "border-red-600 ring-red-100 focus:border-red-600 dark:ring-0"
                    : "border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
                }`}
                defaultValue={inputField.message}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.message && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.message}</small>
                </div>
              )}
            </div>

            <button
              onClick={submitButton}
              className="w-full rounded-md bg-gray-900 px-7 py-4 font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-offset-2 dark:bg-white dark:text-black "
            >
              {isLoading ? (
                <svg
                  className="mx-auto h-5 w-5 animate-spin text-white dark:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </div>

          {response === true && (
            <div className="mt-3 text-center text-sm text-green-500">
              {"Success. Message sent successfully"}
            </div>
          )}
          {response === false && (
            <div className="mt-3 text-center text-sm text-red-500">
              {"Something went wrong. Please try later."}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
