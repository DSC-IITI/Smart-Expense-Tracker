'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dialog } from '@headlessui/react'
import { Transition,Fragment } from "@headlessui/react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/navbar";
const page = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [name,setName]=useState('a');
    const [date,setDate]=useState("");
    const [amount,setAmount]=useState(0);
    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }
      const [startDate, setStartDate] = useState(new Date());
    
    const [allPosts, setAllPosts] = useState([]);
    const fetchPosts = async () => {
        const response = await fetch("/api/income");
        console.log('yo');
        const fundsdata = await response.json();   
        // const filteredPosts = fundsdata.filter((item) => item.creator._id ===session?.user.id);
        console.log('ri');
        setAllPosts(fundsdata);
      };
    
    useEffect(() => {
      fetchPosts();
    });

    const handleDelete = async (post) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this fund?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/income/${post._id.toString()}`, {
            method: "DELETE",
          });
  
          const filteredPosts = Income.filter((item) => item._id !== post._id);
  
          setAllPosts(filteredPosts);
          console.log('ho');
        }
          catch (error) {
          console.log(error);
        }
      }
    };
    
    const createPrompt = async () => {

        const mid = await session?.user.id;
      
        try {
          const response = await fetch("/api/income/new", {
            method: "POST",
            body: JSON.stringify({
             name:name,
             amount:amount,
             date:startDate,
             
              userId: mid,
              
            }),
          });
    
          if (response.ok) {
            router.push("/Income");
          }
          console.log('hi');
        } catch (error) {
          console.log(error);
        } 
        setAmount("");
        setDate("");
        setName("");
      };
      const updatePrompt = async (post) => {
        try {
          const response = await fetch(`/api/income/${post._id.toString()}`, {
            method: "PATCH",
            body: JSON.stringify({
              name:'b',
             date:new Date().toISOString().substring(0, 10),
             amount:5,
             
            }),
          });
    
          if (response.ok) {
            // router.push("/Income");
          }
        } catch (error) {
          console.log(error);
        } finally {
          // setIsSubmitting(false);
          console.log("Edited.");
        }
      };
  return (
    <div className="bg-gradient-to-br from-sky-100 via-white to-sky-100">

 
      <div >
      <Navbar/>

       <div className="flex items-center ">
        <button
          type="button"
          onClick={openModal}
          className="m-2 p-4 bg-red-900 text-white rounded-md hover:bg-gray-700"
          
        >
          Add new income
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  my-7 py-10 font-medium leading-6 text-gray-900"
                  >
                    Add New Expense
                  </Dialog.Title>
                  <div className="my-2">
                    <textarea onChange={(e) => setName(e.target.value)} placeholder="Name of Expense" className="text-sm font-medium leading-6 text-gray-600"></textarea>
                  </div>
                  <div className="my-2">
                    <input onChange={(e) => setAmount(e.target.value)}  placeholder="Expense (eq. 100)" className="text-sm font-medium leading-6 text-gray-600 border-black"></input>
                  </div>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>{createPrompt();  closeModal();}}
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>



    <div class="mt-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
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
           Amount
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        {allPosts.map((post) => (
          <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-medium text-gray-900">{post.name}</th>
            <td class="px-6 py-4">{post.date}</td>
            <td class="px-6 py-4">{post.amount}</td>
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
            <button onClick={()=>{handleDelete(post)}}>delete</button>
        <button onClick={()=>{updatePrompt(post)}}>Edit</button>
            </td>
          </tr>
 ))}
         
         
        </tbody>
      </table>
    </div>

    </div>
  )
}

export default page;