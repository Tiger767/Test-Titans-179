import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import SignIn from "./SignIn";

jest.mock("../firebase-config", () => {
  return {
    auth: {
      signInWithEmailAndPassword: jest.fn(),
    },
  };
});

describe("SignIn", () => {
  it("should render the SignIn component", () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    expect(getByText("Welcome back.")).toBeInTheDocument();
  });

  it("should handle login with correct email and password", async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/signin"]}>
        <Route path="/signin" component={SignIn} />
        <Route path="/jane-hopkins-dashboard" render={() => <div>Jane Hopkins Dashboard</div>} />
      </MemoryRouter>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const signInButton = getByText("Sign in");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(signInButton);
    });

    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith("test@test.com", "password123");
    expect(getByText("Jane Hopkins Dashboard")).toBeInTheDocument();
  });

  it("should display an error message if login fails", async () => {
    auth.signInWithEmailAndPassword.mockRejectedValue(new Error("Failed to sign in"));

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const signInButton = getByText("Sign in");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(signInButton);
    });

    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith("test@test.com", "password123");
    expect(getByText("Failed to sign in")).toBeInTheDocument();
  });
});
