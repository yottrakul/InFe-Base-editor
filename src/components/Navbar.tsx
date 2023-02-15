import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BsChatSquareTextFill,
  BsFillLightbulbFill,
  BsBraces,
  BsList,
  BsLinkedin,
} from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { NextPage } from "next";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  const handleBackDrop = (e: any) => {
    if (e.target.id === "wrapper") {
      toggleNav();
    }
  }

    return (
      <div className="w-full h-24 shadow-xl z-[100] bg-[#1A1B1F]">
        <div className="flex justify-between items-center w-full h-full px-4 md:px-8 py-4 2xl:px-16">
          <Logo on={false} />
          <div className="font-bold text-2xl md:hidden"></div>
          <MenuList />
          <div onClick={toggleNav} className="md:hidden">
            <BsList className="cursor-pointer" size={30} />
          </div>
        </div>

        <div
          onClick={handleBackDrop}
          id="wrapper"
          className={
            showNav
              ? "fixed top-0 left-0 w-full h-screen bg-white/20 ease-in duration-500 md:hidden z-10"
              : ""
          }
        >
          <div
            className={
              showNav
                ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#202123] p-10 ease-in duration-500 md:hidden"
                : "fixed left-[-100%] top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#202123] p-10 ease-in duration-500"
            }
          >
            <div>
              <Logo on={true} />
            </div>
            <div className="border-b border-white my-4">
              <p className="w-[85%] md:w-[90%] py-4">
                Inference Engine by Assawin group
              </p>
            </div>
            <div className="flex flex-col py-4">
              <ul className="uppercase">
                <Link onClick={toggleNav} href="/">
                  <li className="py-4 text-sm">Chat</li>
                </Link>
                <Link onClick={toggleNav} href="/facts">
                  <li className="py-4 text-sm">Facts</li>
                </Link>
                <Link onClick={toggleNav} href="/rules">
                  <li className="py-4 text-sm">Rule</li>
                </Link>
                <Link onClick={toggleNav} href="/about">
                  <li className="py-4 text-sm">About us</li>
                </Link>
              </ul>
            </div>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#a7a4fa]">
                Let's Connect
              </p>
              <div className="flex items-center gap-4 my-4 w-full sm:w-[80%]">
                <div className="group rounded-full shadow-md shadow-gray-600 p-3 cursor-pointer ">
                  <FiGithub className="group-hover:scale-125 ease-in duration-300" />
                </div>
                <div className="rounded-full shadow-md shadow-gray-600 p-3 cursor-pointer hover:scale-110">
                  <BsLinkedin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Logo: NextPage<{ on: boolean }> = ({ on }) => {
    return (
      <div className="flex flex-col text-center items-center">
        <Image
          className="mb-2"
          priority
          height={40}
          width={40}
          src="/images/logo.svg"
          alt="Logo website"
        />
        <div className={on ? "text-xl md:inline" : "hidden text-xl md:inline"}>
          <span>InFe</span>
        </div>
      </div>
    );
  };

  function MenuList() {
    return (
      <ul className="hidden md:flex gap-10 lg:gap-16 xl:gap-28">
        <Link className="group flex flex-col gap-2 w-20 h-20 " href="/">
          <BsChatSquareTextFill className="transition duration-300 ease-in-out delay-150 group-hover:scale-110 group-hover:-translate-y-1 self-center my-2 text-3xl text-slate-400 group-hover:text-white" />
          <li className="text-sm text-slate-400 hover:text-white uppercase group-hover:text-white text-center">
            Chat
          </li>
        </Link>
        <Link className="group flex flex-col gap-2 w-20 h-20 " href="/facts">
          <BsFillLightbulbFill className="transition duration-300 ease-in-out delay-150 group-hover:scale-110 group-hover:-translate-y-1 self-center my-2 text-3xl text-slate-400 group-hover:text-white" />
          <li className="text-sm text-slate-400 hover:text-white uppercase group-hover:text-white text-center">
            Facts
          </li>
        </Link>
        <Link className="group flex flex-col gap-2 w-20 h-20 " href="/rules">
          <FaBrain className="transition duration-300 ease-in-out delay-150 group-hover:scale-110 group-hover:-translate-y-1 self-center my-2 text-3xl text-slate-400 group-hover:text-white" />
          <li className="text-sm text-slate-400 hover:text-white uppercase group-hover:text-white text-center">
            Rules
          </li>
        </Link>
        <Link className="group flex flex-col gap-2 w-20 h-20 " href="/about">
          <BsBraces className="transition duration-300 ease-in-out delay-150 group-hover:scale-110 group-hover:-translate-y-1 self-center my-2 text-3xl text-slate-400 group-hover:text-white" />
          <li className="text-sm text-slate-400 hover:text-white uppercase group-hover:text-white text-center">
            Credit
          </li>
        </Link>
      </ul>
    );
  }

export default Navbar;
