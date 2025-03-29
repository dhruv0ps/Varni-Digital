'use client'

import React, { useState } from "react";
import TextElement from "../_components/Elements/textElement";
import ButtonElement from "../_components/Elements/buttonElement";

const Login = () => {
    // State to store input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State to store error messages
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Email and password validation regex patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Basic email validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/; // At least 1 uppercase, 1 number, 1 special char, min 8 characters

    // Validate email and password
    const validateForm = () => {
        let valid = true;

        // Reset errors
        setEmailError("");
        setPasswordError("");

        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            valid = false;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character.");
            valid = false;
        }

        return valid;
    };

    // Handle form submission
    const handleSubmit = () => {
        // Only proceed if form is valid
        if (validateForm()) {
            console.log("Email:", email);
            console.log("Password:", password);
            // You can proceed with further login logic (e.g., calling an API)
        }
    };

    // Handle input change for email
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Reset email error when the user starts typing
        if (emailError) {
            setEmailError("");
        }
    };

    // Handle input change for password
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        // Reset password error when the user starts typing
        if (passwordError) {
            setPasswordError("");
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-100">
            <div className="login-container p-6 bg-white rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-center mb-6 text-xl font-semibold">Login</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Email input */}
                    <TextElement
                        label="Email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={handleEmailChange}  // Reset error on input change
                        variant="primary"
                        size="medium"
                        className="mb-4"
                        type="email"  // Add type="email" for email validation
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Email error message */}

                    {/* Password input */}
                    <TextElement
                        label="Password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={handlePasswordChange}  // Reset error on input change
                        variant="primary"
                        size="medium"
                        className="mb-4"
                        type="password"  // Add type="password" for password field
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>} {/* Password error message */}

                    {/* Submit button */}
                    <div className="w-full flex justify-center">
                        <ButtonElement
                            label="Login"
                            variant="primary"
                            rounded="xl"
                            type="button"  // 'button' type to prevent form submission when clicked
                            onClick={handleSubmit}  // Call handleSubmit when the button is clicked
                            disabled={!!emailError || !!passwordError || !email || !password}  // Disable button if errors exist
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
