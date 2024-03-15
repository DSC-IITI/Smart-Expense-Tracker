'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
export default function Home() {
  // const { data: session } = useSession();
  // const [providers, setProviders] = useState(null);
  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);
  
  return (

    <main>
      <div className="h-screen bg-gradient-to-br from-sky-100 via-white to-sky-100 pl-2 pr-2 text-gray-800">
    <div className="pt-16 mx-auto mb-16  max-w-md px-3 text-center sm:max-w-lg sm:px-0">
      <h1 className="pt-4	text-4xl font-black leading-[1.15] tracking-[-0.03em] text-black sm:text-5xl sm:leading-[1.15]">
        Effortlessly Track and Manage{" "}
        <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
          Expenses.
        </span>
      </h1>
      <p className="mt-5 text-base font-normal leading-6 tracking-tight sm:text-lg">
        Our easy-to-use platform allows you to track and categorize your
        spending, giving you a clear picture of your financials.
      </p>
    </div>
    </div>
  </main>
  );
}
