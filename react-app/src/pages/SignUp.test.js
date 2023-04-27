import React from "react";
import { Link } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import SignUp from "./SignUp";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("../firebase-config", () => ({
  auth: jest.fn(),
}));

describe("SignUp", () => {
  beforeEach(() => {
    render(<SignUp />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page header", () => {
    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveTextContent("Create Your Account");
  });

  it("should select company option", () => {
    const companySelect = screen.getByLabelText("Select Company*");
    fireEvent.change(companySelect, { target: { value: "Bavaria" } });
    expect(companySelect.value).toBe("Bavaria");
  });

  it("should handle user sign up with selected company option", async () => {
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    const emailInput = screen.getByLabelText("Work Email *");
    const passwordInput = screen.getByLabelText("Password *");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    createUserWithEmailAndPassword.mockImplementationOnce(() =>
      Promise.resolve()
    );

    const companySelect = screen.getByLabelText("Select Company*");
    fireEvent.change(companySelect, { target: { value: "Bavaria" } });

    fireEvent.click(signUpButton);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@test.com",
      "password"
    );
    expect(window.location.href).toContain("/bavaria-dashboard");
  });

  it("should show error message on sign up failure", async () => {
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    const emailInput = screen.getByLabelText("Work Email *");
    const passwordInput = screen.getByLabelText("Password *");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const error = new Error("Sign up failed");
    createUserWithEmailAndPassword.mockImplementationOnce(() =>
      Promise.reject(error)
    );

    fireEvent.click(signUpButton);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@test.com",
      "password"
    );

    const errorMessage = await screen.findByText("Sign up failed");
    expect(errorMessage).toBeInTheDocument();
  });
});
