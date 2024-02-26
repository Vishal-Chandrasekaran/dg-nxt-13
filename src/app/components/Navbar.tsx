import React from "react";
//for the navigation to home for the name and the social handles
import Link from "next/link";
//the symbols of social handles from font awesome
import { FaYoutube,FaTwitter,FaGithub,FaLaptop } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      {/*Prose plugin by tailwind css for vanila css you cannot control*/}
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        {/*Now the h1 will be big and responsive*/}
        <h1 className="text-3xl font=bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            href="/"
            className="text-white/90 no-underline hover:text-white"
          >
            Web Dev Wannabe
          </Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle ga[-4 text-white text-4xl lg: text-5xl">
          <Link className="text-white/90 hover:text-white" href="https://www.youtube.com" >
            <FaYoutube/>
          </Link>
          <Link className="text-white/90 hover:text-white" href="https://www.udemy.com" >
            <FaLaptop/>
          </Link>
          <Link className="text-white/90 hover:text-white" href="https://www.github.com" >
            <FaGithub/>
          </Link>
          <Link className="text-white/90 hover:text-white" href="https://www.twitter.com" >
            <FaTwitter/>
          </Link>
        </div>
      </div>
    </nav>
  );
}
