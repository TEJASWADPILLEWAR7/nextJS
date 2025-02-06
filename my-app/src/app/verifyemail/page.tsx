"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    setToken(urlToken || "");
  }, []);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      console.log("Email verified successfully:", response.data);
    } catch (error) {
      setError(true);
      console.error("Email verification failed:", error);
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="text-2xl bg-orange-500 text-white font-semibold p-2 mt-2 rounded">
        {token ? `Token: ${token}` : "No token found"}
      </h2>

      {verified && (
        <div>
          <h2 className="bg-green-500 text-white p-2">
            Email verified successfully
          </h2>
          <Link href="/login" className="text-2xl text-blue-600">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="bg-red-600 text-white p-2">
            Email verification failed
          </h2>
          <Link href="/signup" className="text-2xl text-blue-600">
            Sign up again
          </Link>
        </div>
      )}
    </div>
  );
}
