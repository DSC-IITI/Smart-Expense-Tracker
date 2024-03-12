'use client'
import Image from "next/image";
import Link from "next/link";
import Router from 'next/router'
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
export default function SignIn() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <main
      className={`relative m-auto flex h-[100vh] w-full flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-50 pl-2 pr-2`}
    >
      <div className="absolute inset-x-0 top-[-55px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]"></div>
      <div className="absolute z-50 m-auto flex w-[380px] flex-1 flex-col justify-center p-6 sm:w-[468px] sm:p-10">
        <Link href="https://expense.fyi">
          <h1 className="flex flex-col items-center text-3xl">
            <Image
              className="active:scale-95"
              src="/icons/logo.png"
              width={50}
              height={50}
              alt="expense.fyi logo"
            />
            <span className="mt-2 font-black text-gray-900">
              Smart Expense Tracker
            </span>
          </h1>
        </Link>
        <p className="mb-6 mt-3 text-center text-sm font-medium text-zinc-600">
          Use your google sign in to securely sign in.
        </p>
        
        
        {session?.user ? (
         
         <Link href="/">
    <div className="flex justify-center items-center">
      <button
        type="button"
        className="bg-gray-900 text-white rounded-md hover:bg-gray-500 p-2"
      >
        Go to Home
      </button>
    </div>
  </Link>

           

            
         
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='bg-gray-900 text-white rounded-md hover:bg-gray-500 p-2'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      {/* </div> */}
        <p className="text-center text-sm font-medium text-gray-700">
          Don{"'"}t have an account?{" "}
          <Link
            href={"/signup"}
            className="border-b-[1px] border-gray-700 pb-[1px] font-bold hover:border-gray-500 hover:text-gray-600"
          >
            Sign up
          </Link>{" "}
          for free.
        </p>
      </div>
    </main>
  );
}
