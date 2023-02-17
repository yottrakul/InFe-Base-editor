import Container from "@/UI/Container";
import Head from "next/head";
import { useState } from "react";
import { MdEditNote } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import CreateFactBox from "@/components/CreateFactBox";

export type Fact = {
  id: string;
  label: string;
  fact: string | null;
};

const DUMMY: Array<Fact> = [
  {
    id: "c9d81192-d6b9-4be9-b71b-486e6e7e86e6",
    label: "w",
    fact: null,
  },
  {
    id: "4c1e3067-23f3-4f3c-bc31-2d4c70430166",
    label: "e",
    fact: null,
  },
  {
    id: "d46e14c0-5bf1-4f8f-b1d4-fe36486b454a",
    label: "c",
    fact: null,
  },
  {
    id: "58a9cc71-3caa-4ac8-ad55-3e67d378fe5d",
    label: "f",
    fact: null,
  },
];

function facts() {
  const [showAddFact, setShowAddFact] = useState(false);
  const [facts, setFacts] = useState(DUMMY);
  // แก้ไข Fact
  const [showEditFact, setShowEditFact] = useState(false);
  const [fact, setFact]: [Fact|null, any] = useState(null);

  //useStateFetch
  const deleteFact = (id: string) => {
    // ติดต่อ DB
    setFacts(prev => {
      return prev.filter(fact => {
        return fact.id !== id
      })
    })
  }

  const addFact = (fact: Fact) => {
    // ติดต่อ DB
    const result = facts.concat(fact);
    setFacts(result)
  }

  const editFact = (factIn: Fact) => {
    // ติดต่อ db

    const index = facts.findIndex(fact => {
      return fact.id === factIn.id
    })

    if(index < 0) {
      return;
    }

    setFacts(prev => {
      prev[index] = factIn;
      return prev
    })
  }

  const listFacts = facts.map((fact) => {
    return (
      <li key={fact.id} className="bg-[#40414E] rounded-xl flex justify-between px-4 py-2 items-center mb-2 cursor-default">
        <span className="font-bold">{fact.label}</span>
        <span className="md:text-xl">{fact.fact? fact.fact : '-'}</span>
        <div className="flex items-center">
          <MdEditNote onClick={() => {
            setFact(fact);
            setShowEditFact(true);
          }} className="cursor-pointer mr-2" size={30} />
          <BsTrashFill onClick={() => deleteFact(fact.id)} className="cursor-pointer text-red-600" size={20} />
        </div>
      </li>
    );
  });

  return (
    <>
      <Head>
        <title>Infe | Fact</title>
      </Head>

      {/* <Modal show={true}/> */}
      {showAddFact ? <CreateFactBox onClose={setShowAddFact} onCreate={addFact}/> : null}
      {showEditFact && fact ? <CreateFactBox onClose={setShowEditFact} onEdit={editFact} fact={fact}/> : null}

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
              {listFacts.length > 0? listFacts:'Fact empty'}
            </ul>
          </div>
        </Container>
        <div className="group rounded-full bg-blue-500 fixed bottom-0 right-0 p-4 mr-6 mb-6 lg:mr-10 lg:mb-10 hover:bg-blue-400 duration-300 shadow-lg shadow-black/50 cursor-pointer">
          <GoPlus
            onClick={() => setShowAddFact(true)}
            className="group-hover:scale-125 duration-150"
            size={20}
          />
        </div>
      </div>
    </>
  );
}

export default facts;
