import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
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
          Use your email address to securely sign in.
        </p>
        <form className="grid w-full grid-cols-1 items-center gap-4 text-gray-800">
          <label className="mb-1 block">
            <span className="mb-2 block text-sm font-semibold leading-6">
              Email Address
            </span>
            <input
              className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              autoFocus
              inputMode="email"
              autoComplete="email"
              type="email"
              placeholder="tim@apple.com"
              required
            />
          </label>
          <button className="bg-gray-900 text-white rounded-md hover:bg-gray-500 p-2">
            Sign Up
          </button>
          <p className="text-center text-sm font-medium text-gray-700">
            Already Registered?{" "}
            <Link
              href={"/signin"}
              className="border-b-[1px] border-gray-700 pb-[1px] font-bold hover:border-gray-500 hover:text-gray-600"
            >
              Sign In
            </Link>{" "}
            for free.
          </p>
        </form>
      </div>
    </main>
  );
}
