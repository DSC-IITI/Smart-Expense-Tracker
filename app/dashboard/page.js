"use client"
import { DonutChart } from '@tremor/react';
import { BarChart } from '@tremor/react';
import React from "react";
import { useState,useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

    
export const Dashboard = () => {
  const { data: session } = useSession();
  const chartdata = [
    {
      name: 'Amphibians',
      'Number of threatened species': 2488,
    },
    {
      name: 'Birds',
      'Number of threatened species': 1445,
    },
    {
      name: 'Crustaceans',
      'Number of threatened species': 743,
    },
    {
      name: 'Ferns',
      'Number of threatened species': 281,
    },
    {
      name: 'Arachnids',
      'Number of threatened species': 251,
    },
    {
      name: 'Corals',
      'Number of threatened species': 232,
    },
    {
      name: 'Algae',
      'Number of threatened species': 98,
    },
  ];
  
  const datahero = [
    {
      name: 'Noche Holding AG',
      value: 9800,
    },
    {
      name: 'Rain Drop AG',
      value: 4567,
    },
    {
      name: 'Push Rail AG',
      value: 3908,
    },
    {
      name: 'Flow Steal AG',
      value: 2400,
    },
    {
      name: 'Tiny Loop Inc.',
      value: 2174,
    },
    {
      name: 'Anton Resorts Holding',
      value: 1398,
    },
  ];
  const [income, setIncome] = useState(0);
  const fetchPosts = async () => {
      const response = await fetch("/api/income");
      console.log('yo');
      const fundsdata = await response.json();   
      const filteredPosts = fundsdata.filter((item) => item.creator._id ===session?.user.id);
      let inc=0;
      filteredPosts.map((item)=>{
       inc=inc+item.amount;
      })
      console.log('ri');
      setIncome(inc);
    };
    const [expense, setExpense] = useState(0);
  const fetchPostsTo = async () => {
      const response = await fetch("/api/expense");
      console.log('yo');
      const fundsdata = await response.json();   
      const filteredPosts = fundsdata.filter((item) => item.creator._id ===session?.user.id);
      let inc=0;
      filteredPosts.map((item)=>{
       inc=inc+item.amount;
      })
      console.log('ri');
      setExpense(inc);
    };
  
  
  useEffect(() => {
    fetchPosts();
    fetchPostsTo();
  });
  



  return (
    <div className="relative   pl-2 pr-2 text-gray-800">
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
              <span className="text-lg">{income}</span>
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
              <span className="text-lg">{expense}</span>
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



        </div>
      </div>


      <div className="mx-auto space-y-12">
      <div className="space-y-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          donut variant 1
        </span>
        <div className="flex justify-center">
        <BarChart
    data={chartdata}
    index="name"
    categories={['Number of threatened species']}
    colors={['blue']}
    
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
  />

          
        </div>
      </div>
      <div className="space-y-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          pie variant
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={datahero}
            variant="pie"
            fontSize="100"
            // valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
    </div>

    </div>
  );
};

export default Dashboard;