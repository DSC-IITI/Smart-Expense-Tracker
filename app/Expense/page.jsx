"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [name, setName] = useState("a");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [amount, setAmount] = useState(0);

  const [allPosts, setAllPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await fetch("/api/expense");
    const fundsdata = await response.json();
    const filteredPosts = fundsdata.filter(
      (item) => item.creator._id === session?.user.id
    );

    setAllPosts(filteredPosts);
  };

  useEffect(() => {
    fetchPosts();
  });

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this Expense?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/expense/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = Expense.filter((item) => item._id !== post._id);

        setAllPosts(filteredPosts);
        console.log("ho");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createPrompt = async (e) => {
    e.preventDefault();

    const mid = await session?.user.id;

    try {
      const response = await fetch("/api/expense/new", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          amount: amount,
          date: date,

          userId: mid,
        }),
      });

      if (response.ok) {
        router.push("/Expense");
      }
      console.log("hi");
    } catch (error) {
      console.log(error);
    }
  };
  const updatePrompt = async (post) => {
    try {
      const response = await fetch(`/api/expense/${post._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: "b",
          date: new Date().toISOString().substring(0, 10),
          amount: 5,
        }),
      });

      if (response.ok) {
        router.push("/Expense");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSubmitting(false);
      console.log("Edited.");
    }
  };
  return (
    // <div>
    //   <button onClick={createPrompt} className='mt-5 w-full black_btn'>
    //       Larva
    //   </button>

    //   <div className='mt-16 prompt_layout'>
    //   {allPosts.map((post) => (
    //     <div>
    //     <div>{post.name}</div>
    //     <div>{post._id}</div>
    //     <button onClick={()=>{handleDelete(post)}}>delete</button>
    //     <button onClick={()=>{updatePrompt(post)}}>Edit</button>
    //     </div>
    //   ))}
    // </div>
    // </div
    <>
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Date
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td class="px-6 py-4">Nov.4 2022</td>
            <td class="px-6 py-4">helen@sailboatui.com</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-3 w-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Paid
              </span>
            </td>
            <td class="flex justify-end gap-4 px-6 py-4 font-medium">
              <a href="">Delete</a>
              <a href="" class="text-primary-700">
                Edit
              </a>
            </td>
          </tr>
          <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td class="px-6 py-4">Nov.4 2022</td>
            <td class="px-6 py-4">helen@sailboatui.com</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-3 w-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Paid
              </span>
            </td>
            <td class="flex justify-end gap-4 px-6 py-4 font-medium">
              <a href="">Delete</a>
              <a href="" class="text-primary-700">
                Edit
              </a>
            </td>
          </tr>
          <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td class="px-6 py-4">Nov.4 2022</td>
            <td class="px-6 py-4">helen@sailboatui.com</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-3 w-3"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
                Canceled
              </span>
            </td>
            <td class="flex justify-end gap-4 px-6 py-4 font-medium">
              <a href="">Delete</a>
              <a href="" class="text-primary-700">
                Edit
              </a>
            </td>
          </tr>
          <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td class="px-6 py-4">Nov.4 2022</td>
            <td class="px-6 py-4">helen@sailboatui.com</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-3 w-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Paid
              </span>
            </td>
            <td class="flex justify-end gap-4 px-6 py-4 font-medium">
              <a href="">Delete</a>
              <a href="" class="text-primary-700">
                Edit
              </a>
            </td>
          </tr>
          <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td class="px-6 py-4">Nov.4 2022</td>
            <td class="px-6 py-4">helen@sailboatui.com</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-3 w-3"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Paid
              </span>
            </td>
            <td class="flex justify-end gap-4 px-6 py-4 font-medium">
              <a href="">Delete</a>
              <a href="" class="text-primary-700">
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default page;
