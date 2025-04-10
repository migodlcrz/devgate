"use client";

import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted", loginForm);
  };

  return (
    <Card
      title="Login"
      description="Enter your credentials to access the site."
      className="gap-4"
    >
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-100">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-black">Email</span>
          <input
            type="text"
            placeholder="name@example.com"
            className="border-[0.1px] border-gray-300 rounded-lg p-2"
            onChange={(e) => {
              setLoginForm({ ...loginForm, email: e.target.value });
            }}
          />
          <span className="font-bold text-black">Password</span>
          <input
            type="password"
            className="border-[0.1px] border-gray-300 rounded-lg p-2"
            onChange={(e) => {
              setLoginForm({ ...loginForm, password: e.target.value });
            }}
          />
        </div>
        <Button type="submit">Login</Button>{" "}
      </form>
    </Card>
  );
};

export default LoginForm;
