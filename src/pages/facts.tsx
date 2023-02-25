import Container from "@/UI/Container";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdEditNote } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import CreateFactBox from "@/components/CreateFactBox";
import axios, { AxiosError } from "axios";

export type Fact = {
  id: string;
  label: string;
  fact: string | null;
};

const defaultFact: Array<Fact> = [
];

function facts() {
  const [showAddFact, setShowAddFact] = useState(false);
  const [facts, setFacts] = useState(defaultFact);
  useEffect(() => {
    axios.get('http://localhost:8000/api/facts').then(res => {
      setFacts(res.data);
    })
  }, [])
  // แก้ไข Fact
  const [showEditFact, setShowEditFact] = useState(false);
  const [fact, setFact]: [Fact|null, any] = useState(null);

  //useStateFetch
  const deleteFact = (id: string) => {
    // ติดต่อ DB
    axios.delete(`http://localhost:8000/api/facts/${id}`);
    setFacts(prev => {
      return prev.filter(fact => {
        return fact.id !== id
      })
    })
  }

  const addFact = async (fact: Fact) => {
    // ติดต่อ DB
    try {
      console.log(fact)
      const res = await axios.post('http://localhost:8000/api/facts', fact)
      const result = facts.concat(res.data);
      setFacts(result)
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  const editFact = (factIn: Fact) => {
    // ติดต่อ db
    try {
      const res = axios.put(`http://localhost:8000/api/facts/${factIn.id}`, factIn)
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
    } catch (error: any) {
      console.log(error.response.data)
    }
    

    

    
  }

  const listFacts = facts.map((fact) => {
    return (
      <tr key={fact.id} className="border-b border-gray-500">
        <td className="font-bold">{fact.label}</td>
        <td className="md:text-xl">{fact.fact? fact.fact : '-'}</td>
        <td className="flex items-center justify-center py-4">
          <MdEditNote onClick={() => {
            setFact(fact);
            setShowEditFact(true);
          }} className="cursor-pointer mr-2" size={30} />
          <BsTrashFill onClick={() => deleteFact(fact.id)} className="cursor-pointer text-red-600" size={20} />
        </td>
      </tr>
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
        <Container className="pt-4 h-full w-full overflow-x-auto">
        <table className="relative w-full table-auto border-collapse text-center md:rounded-t-xl overflow-hidden">
          <thead>
            <tr className="bg-[#40414E] text-xl">
              <th className="md:py-3">Name</th>
              <th className="md:py-3">Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listFacts}
          </tbody>
        </table>
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
