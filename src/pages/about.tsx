import Container from "@/UI/Container";
import React from "react";
import Image from "next/image";
import { BiCodeAlt } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import Bas from '../../public/images/Bas.jpg';
import Korn from '../../public/images/Korn.jpg'
import P from '../../public/images/P.jpg';
import Win from '../../public/images/Win.jpg'
import { MdBusinessCenter } from "react-icons/md";
import { FaFlask } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";

function about() {
  return (
    <div>
      <Container className="overflow-y-auto h-[calc(100vh-6rem)]">
        <div className="text-center border-b border-slate-500 pb-4 mt-6">
          <div className="text-center">
            <img
              src="https://avatars.githubusercontent.com/u/52005995?v=4"
              className="mx-auto mb-4 w-32 rounded-lg"
              alt="Avatar"
            />
          </div>
          <h5 className="mb-2 text-xl font-medium leading-tight">
            Yottrakul Suwannasri
          </h5>
          <p className="text-neutral-500 dark:text-neutral-400 flex justify-center items-center">
            <BiCodeAlt className="text-2xl mr-2" />
            <span>Web Developer</span>
          </p>
          <p className="text-2xl flex justify-center items-center mt-2">
            <a href="https://github.com/yottrakul">
              <AiFillGithub className="hover:text-gray-400 cursor-pointer hover:scale-125 duration-300" />
            </a>
          </p>
        </div>

        <div className="text-center border-b border-slate-500 pb-4 mt-6">
          <div className="text-center">
            <Image src={Bas} alt={'Avarta Bas'} className="mx-auto mb-4 w-32 h-32 rounded-lg object-cover"/>
          </div>
          <h5 className="mb-2 text-xl font-medium leading-tight">
            Eakkaluck kenkrue
          </h5>
          <p className="text-neutral-500 dark:text-neutral-400 flex justify-center items-center">
            <MdBusinessCenter className="text-2xl mr-2" />
            <span>Project Management</span>
          </p>
          <p className="text-2xl flex justify-center items-center mt-2">
            <AiFillGithub className="hover:text-gray-400 cursor-pointer hover:scale-125 duration-300" />
          </p>
        </div>

        <div className="text-center border-b border-slate-500 pb-4 mt-6">
          <div className="text-center">
          <Image src={Korn} alt={'Avarta Korn'} className="mx-auto mb-4 w-32 h-32 rounded-lg object-cover"/>
          </div>
          <h5 className="mb-2 text-xl font-medium leading-tight">
            Alongkorn Lucksanaviboon
          </h5>
          <p className="text-neutral-500 dark:text-neutral-400 flex justify-center items-center">
            <FaFlask className="text-2xl mr-2" />
            <span>Testing</span>
          </p>
          <p className="text-2xl flex justify-center items-center mt-2">
            <AiFillGithub className="hover:text-gray-400 cursor-pointer hover:scale-125 duration-300" />
          </p>
        </div>

        <div className="text-center border-b border-slate-500 pb-4 mt-6">
          <div className="text-center">
            <Image src={P} alt={'Avarta P'} className="mx-auto mb-4 w-32 h-32 rounded-lg object-cover"/>
          </div>
          <h5 className="mb-2 text-xl font-medium leading-tight">
          Sasiwat Pattaravanattanan
          </h5>
          <p className="text-neutral-500 dark:text-neutral-400 flex justify-center items-center">
            <FaPaintBrush className="text-2xl mr-2" />
            <span>UX/UI</span>
          </p>
          <p className="text-2xl flex justify-center items-center mt-2">
            <AiFillGithub className="hover:text-gray-400 cursor-pointer hover:scale-125 duration-300" />
          </p>
        </div>

        <div className="text-center pb-4 mt-6">
          <div className="text-center">
            <Image src={Win} alt={'Avarta Win'} className="mx-auto mb-4 w-32 h-32 rounded-lg object-cover"/>  
          </div>
          <h5 className="mb-2 text-xl font-medium leading-tight">
            Assawin Kengkanna
          </h5>
          <p className="text-neutral-500 dark:text-neutral-400 flex justify-center items-center">
            <FaPaintBrush className="text-2xl mr-2" />
            <span>UX/UI</span>
          </p>
          <p className="text-2xl flex justify-center items-center mt-2">
            <AiFillGithub className="hover:text-gray-400 cursor-pointer hover:scale-125 duration-300" />
          </p>
        </div>
      </Container>
    </div>
  );
}

export default about;
