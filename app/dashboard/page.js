import ExpenseComp from "../components/expenseComp";
import IncomeComp from "../components/incomeComp";
import React from "react";

const page = () => {
  return (
    <div className="relative h-screen bg-gradient-to-br from-sky-100 via-white to-sky-100 pl-2 pr-2 text-gray-800">
      <div className="h-5"></div>
      <div className="relative p-4 mx-4 border-2 border-gray-500 rounded-xl flex items-center justify-between">
        <h1
          className="mb-4 mt-4 font-bold"
          style={{ fontSize: "2.1em", fontWeight: "800" }}
        >
          Dashboard
        </h1>
        <div className="text-gray-600 text-md hover:bg-gray-300 rounded-md h-12 flex items-center mx-2 p-4">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="pl-2 pr-2 mx-2">
        <h2 className="mb-4 mt-4 font-bold">Summary</h2>
        <div className="mb-8 grid grid-cols-1 gap-1 md:gap-8 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-300 p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Total Income</h3>
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold mr-1">₹</span>
              <span className="text-lg">0</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Available Balance</h3>
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold mr-1">₹</span>
              <span className="text-lg">0</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Total Spent</h3>
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold mr-1">₹</span>
              <span className="text-lg">0</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Total Investment</h3>
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold mr-1">₹</span>
              <span className="text-lg">0</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col">
          <IncomeComp/>
          <ExpenseComp/>
        </div>
      </div>
    </div>
  );
};

export default page;