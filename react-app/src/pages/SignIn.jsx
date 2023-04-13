import React from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

import Header from "../components/Header";
import Footer from "../components/FooterAlt";
import PageIllustration from "../partials/PageIllustration";
import Banner from "../partials/Banner";

function SignIn() {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <div className=" flex btn-sign relative ">
                  <form className="text-black">
                    <label className="" for="dashboard-names"></label>
                    <select
                      className="p-20 py-3 w-max bg-zinc-300 text-lg font-medium rounded-md shadow"
                      name="dashboard-options"
                      id="dashboard-names"
                    >
                      <option value="Jane Hopkins">Jane Hopkins</option>
                      <option value="Bavaria">Bavaria</option>
                      <option value="FDA">FDA</option>
                    </select>
                  </form>
                </div>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-700 border-dotted grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-400">Sign in with your email</div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-300"
                        placeholder="you@yourcompany.com"
                        onChange={(event) => {setLoginEmail(event.target.value)}}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-300"
                        placeholder="Password (at least 10 characters)"
                        onChange={(event) => {setLoginPassword(event.target.value)}}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">
                            Keep me signed in
                          </span>
                        </label>
                        <Link
                          to="/reset-password"
                          className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={handleLogin}>
                        Sign in
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <Footer />
        </section>
      </main>

      <Banner />
    </div>
  );
}

export default SignIn;
