import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../context/authContext";

export interface UserLoginData {
  username: string;
  password: string;
}

export default function Login() {
  const [inputs, setInputs] = useState<UserLoginData>({
    username: "",
    password: "",
  });
  const [err, setErr] = useState<unknown | string>("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login!(inputs);
      navigate("/");
    } catch (e) {
      const catchErr = e as AxiosError;
      setErr(catchErr.response?.data);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-10 min-h-screen">
      <h1 className="uppercase text-4xl font-bold text-center">Login page</h1>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          className="border px-2 py-4 w-80"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          className="border px-2 py-4 w-80"
          name="password"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Login"
          className="px-2 py-4 bg-cyan-600 text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
        />
        {typeof err === "string" && (
          <p className="text-red-600 font-semibold">{err}</p>
        )}
        <span className="text-xs text-neutral-500 text-center mt-12">
          Don't have an account?{" "}
          <Link to="/register">
            <b className="underline">Register here.</b>
          </Link>
        </span>
      </form>
    </div>
  );
}
