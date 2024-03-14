'use client'
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
    const [name,setName]=useState('a');
    const [date,setDate]=useState(new Date().toISOString().substring(0, 10));
    const [amount,setAmount]=useState(0);
    
    const [allPosts, setAllPosts] = useState([]);
    const fetchPosts = async () => {
        const response = await fetch("/api/income");
        const fundsdata = await response.json();   
        const filteredPosts = fundsdata.filter((item) => item.creator._id ===session?.user.id);
        
        setAllPosts(filteredPosts);
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
    
    const createPrompt = async (e) => {
        e.preventDefault();

        const mid = await session?.user.id;
      
        try {
          const response = await fetch("/api/income/new", {
            method: "POST",
            body: JSON.stringify({
             name:name,
             amount:amount,
             date:date,
             
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
            router.push("/Income");
          }
        } catch (error) {
          console.log(error);
        } finally {
          // setIsSubmitting(false);
          console.log("Edited.");
        }
      };
  return (
    <div>
      <button onClick={createPrompt} className='mt-5 w-full black_btn'>
          Larva
      </button>

      <div className='mt-16 prompt_layout'>
      {allPosts.map((post) => (
        <div>
        <div>{post.name}</div>
        <div>{post._id}</div>
        <button onClick={()=>{handleDelete(post)}}>delete</button>
        <button onClick={()=>{updatePrompt(post)}}>Edit</button>
        </div>
      ))}
    </div>
    </div>
  )
}

export default page;