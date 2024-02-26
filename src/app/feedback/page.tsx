"use client";
//To change the state and adding type
import { useState,FormEvent,ChangeEvent } from "react";
//To redirect to the other page
import { useRouter } from "next/navigation";

//Inital state value declared globally
const initState = {
    name:"",
    email:"",
    message:""
};

//A react component used for 'POST' method in the name of form in dynamic routeHandler
export default function Feedback() {
    const [data,setData] = useState(initState);
    const router = useRouter();

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(JSON.stringify(data));
        const { name,email,message } = data;

        //Sending data to API (which is created in routeHandler)
        const res = await fetch('http://localhost:3000/api/feedback',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                name,email,message
            })
        })

        const result = await res.json();
        console.log(result);

        router.push('/thank-you')
    };

    //For setting the state value from the value stored in the input of the form
    const handleChange = (e: ChangeEvent <HTMLInputElement | HTMLTextAreaElement > ) => {
        const name = e.target.name;

        setData((prevData) => ({
            ...prevData,
            [name]: e.target.value
        }))
    };


    const canSave = [...Object.values(data)].every(Boolean);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl p-6" >
            <h1 className="text-4xl mb-4" >Contact Us</h1>
            <label className="text-2xl mb-1" htmlFor="name" >Name:</label>
            <input
             className="p-3 mb-6 text-2xl rounded-2xl text-black"
             type="text"
             id="name"
             name="name"
             placeholder="jane"
             pattern="([A-Z][\w+.]{1,})"
             value={data.name}
             onChange={handleChange}
             autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="email"> email:</label>
            <input
            className="p-3 mb-6 text-2xl rounded-2xl text:black"
            type="email"
            name="email"
            placeholder="Jane@yoursite.com"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z]{2,}$"
            value={data.email}
            onChange={handleChange}
            />

            <label className="text-2xl mb-1" htmlFor="message">Message:</label>
            <textarea
            className="p-3 mb-6 text-2xl rounded-2xl text-black "
            id="message"
            name="message"
            placeholder="Your Message here..."
            rows={5}
            cols={33}
            value={data.message}
            onChange={handleChange}
            />

           {canSave &&  <button
            className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disable:hidden "
            disabled={!canSave}
            >Submit</button>}
        </form>
    )
};