import React, { useState } from "react";

export default function CouponDistribution() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", score: 85, status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", score: 65, status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", score: 92, status: "Active" },
  ]);

  const [history, setHistory] = useState([]);

  const sendCoupon = (customer) => {
    const newEntry = {
      id: Date.now(),
      name: customer.name,
      email: customer.email,
      coupon: "20% Discount",
      date: new Date().toLocaleString(),
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">Coupon Distribution</h1>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Participation Score</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Coupon</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              const eligible = customer.score >= 80;
              return (
                <tr key={customer.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${customer.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{customer.score}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {eligible ? (
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        🎉 Eligible for 20% Discount
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Not Eligible</span>
                    )}
                  </td>
                  <td className="p-3">
                    {eligible && (
                      <button
                        onClick={() => sendCoupon(customer)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Send Coupon
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* History Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Coupon History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No coupons sent yet.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="p-3 bg-white shadow rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-sm text-gray-600">{entry.email}</p>
                  <p className="text-sm text-green-600">✅ {entry.coupon}</p>
                </div>
                <span className="text-xs text-gray-400">{entry.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
