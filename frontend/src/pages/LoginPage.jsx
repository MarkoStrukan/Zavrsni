import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../lib/api";
import { ShipWheelIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin.js";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const {isPending, error, loginMutation} = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="night"
    >
      <div
        className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
        rounded-xl shadow-lg overflow-hidden"
      >
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-3">
            <ShipWheelIcon className="size-10 text-primary" />
            <span
              className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r
              from-primary to-secondary tracking-wider"
            >
              TalkNest
            </span>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome back</h2>
                <p className="text-sm opacity-60">Sign in to your account</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="form-control w-full space-y-3">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="namesurname@example.com"
                    className="input input-bordered w-full"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control w-full space-y-3">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="input input-bordered w-full"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm opacity-60">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Texting-bro.png" alt="Connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with people worldwide</h2>
              <p className="opacity-70">
                Meet new people, make friends, and have great conversations from around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;