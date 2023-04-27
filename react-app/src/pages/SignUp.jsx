import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/FooterAlt";
import PageIllustration from "../partials/PageIllustration";
import Banner from "../partials/Banner";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

function SignUp() {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSignup = async () => {
    createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log(userCredential);
        if (selectedOption === "Jane Hopkins") {
          history.push("/jane-hopkins-dashboard");
        } else if (selectedOption === "Bavaria") {
          history.push("/bavaria-dashboard");
        } else if (selectedOption === "FDA") {
          history.push("/fda-dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                <h1 className="h1">Create Your Account</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-700 border-dotted grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-400">
                    Register with your Company
                  </div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>

                <p className="block text-gray-300 text-sm font-medium mb-1">
                  Select Company<span className="text-red-600">*</span>
                </p>

                <div className=" flex btn-sign relative">
                  <form className="text-black pb-3 ">
                    <label for="dashboard-names"></label>
                    <select
                      className="p-20 py-3 w-max bg-zinc-300 text-lg font-medium rounded-md shadow"
                      name="dashboard-options"
                      id="dashboard-names"
                      onChange={(event) =>
                        setSelectedOption(event.target.value)
                      }
                    >
                      <option value="Jane Hopkins">Jane Hopkins</option>
                      <option value="Bavaria">Bavaria</option>
                      <option value="FDA">FDA</option>
                    </select>
                  </form>
                </div>

                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="full-name"
                      >
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="full-name"
                        type="text"
                        className="form-input w-full text-gray-300"
                        placeholder="First and last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="company-name"
                      >
                        Select Company <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="company-name"
                        type="text"
                        className="form-input w-full text-gray-300"
                        placeholder="Your company or app name"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Work Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-300"
                        placeholder="you@yourcompany.com"
                        onChange={(event) => {
                          setLoginEmail(event.target.value);
                        }}
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
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-300"
                        placeholder="Password (at least 10 characters)"
                        onChange={(event) => {
                          setLoginPassword(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                        onClick={handleSignup}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Already have a login?{" "}
                  <Link
                    to="/signin"
                    className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <Banner />
    </div>
  );
}

export default SignUp;
