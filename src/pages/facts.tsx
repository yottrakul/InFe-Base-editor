import Container from "@/UI/Container";
import Head from "next/head";
import {useState} from "react";
import { MdEditNote } from "react-icons/md"
import {BsTrashFill} from "react-icons/bs"
import {GoPlus} from "react-icons/go"
import CreateFactBox from "@/components/CreateFactBox";

function facts() {
  const [showAddFact, setShowAddFact] = useState(false)

  return (
    <>
      <Head>
        <title>Infe | Fact</title>
      </Head>

      {/* <Modal show={true}/> */}
      {showAddFact ? <CreateFactBox onClose={setShowAddFact}/> : null}

      <div className="h-[calc(100vh-6rem)]">
        <Container className="pt-4 px-2 h-full w-full">
          {/* หัวตาราง */}
          <div className="bg-[#40414E] text-white text-2xl flex justify-between rounded-xl px-4 py-2 uppercase overflow-auto">
            <h3>Name</h3>
            <h3>Description</h3>
            <h3>Edit</h3>
          </div>
          {/* หัวตาราง */}
          <div className="h-[calc(100%-4.5rem)] mt-5 overflow-auto">
            <ul>
              <li className="bg-[#40414E] rounded-xl flex justify-between px-4 py-2 items-center mb-2 cursor-default">
                <span className="font-bold">Q</span>
                <span className="md:text-xl">Rainy</span>
                <div className="flex items-center">
                <MdEditNote className="cursor-pointer mr-2" size={30}/>
                <BsTrashFill className="cursor-pointer text-red-600" size={20} />
                </div>
              </li>
            </ul>
          </div>
        </Container>
        <div className="group rounded-full bg-blue-500 fixed bottom-0 right-0 p-4 mr-6 mb-6 lg:mr-10 lg:mb-10 hover:bg-blue-400 duration-300 shadow-lg shadow-black/50 cursor-pointer">
            <GoPlus onClick={() => setShowAddFact(true)} className="group-hover:scale-125 duration-150" size={20}/>
        </div>
        
      </div>
    </>
  );
}

export default facts;
