import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface UserRegisterData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [inputs, setInputs] = useState<UserRegisterData>({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState<unknown | string>("");

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", inputs);
      navigate('/login')
    } catch (e) {
      const catchErr = e as AxiosError;
      setErr(catchErr.response?.data);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-10 min-h-screen">
      <h1 className="uppercase text-4xl font-bold text-center">
        Register page
      </h1>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <input
          required
          name="username"
          type="text"
          placeholder="username"
          className="border px-2 py-4 w-80"
          onChange={handleChange}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="email"
          className="border px-2 py-4 w-80"
          onChange={handleChange}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="password"
          className="border px-2 py-4 w-80"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Register"
          className="px-2 py-4 bg-cyan-600 text-white transition-opacity hover:opacity-90"
        />
        {typeof err === "string" && (
          <p className="text-red-600 font-semibold">{err}</p>
        )}
        <span className="text-xs text-neutral-500 text-center mt-12">
          Do you have an account?{" "}
          <Link to="/login">
            <b className="underline">Log in.</b>
          </Link>
        </span>
      </form>
    </div>
  );
}
