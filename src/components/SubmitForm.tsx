import React, { useState } from "react";
import axios from "axios";

const SubmitForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/create-checkout-session");

      if (response.data.sessionUrl) {
        window.location.href = response.data.sessionUrl; // Redirect to Stripe checkout
      } else {
        throw new Error("No session URL returned");
      }
    } catch (err: any) {
      console.error("Stripe Checkout Error:", err);
      setError("Failed to redirect to Stripe. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Enter the Raffle Draw</h2>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Redirecting..." : "Buy Ticket ($1)"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SubmitForm;
