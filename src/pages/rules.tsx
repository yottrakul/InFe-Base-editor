import Container from "@/UI/Container";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdEditNote } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import CreateRuleBox from "@/components/CreateRuleBox";
import { Fact } from "./facts";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then(res => res.data)

type Rule = {
  id: string;
  preFactId_1: string;
  preExp: string | null;
  preFactId_2: string | null;
  postFactId_1: string;
  postExp: string | null;
  postFactId_2: string | null;
  preFact_1: Fact;
  preFact_2: Fact | null;
  postFact_1: Fact;
  postFact_2: Fact | null
};

const DUMMY: Array<Rule> = [
  {
    "id": "6c3c6db3-6aa6-4987-8b0f-1673702e45a4",
    "preFactId_1": "6b0d9e6b-c3d9-480a-870d-67ffe058b7a7",
    "preExp": null,
    "preFactId_2": null,
    "postFactId_1": "c0bde0c6-5eff-4b08-9f62-e848ed8f9331",
    "postExp": null,
    "postFactId_2": null,
    "postFact_1": {
        "id": "c0bde0c6-5eff-4b08-9f62-e848ed8f9331",
        "label": "x",
        "fact": null
    },
    "postFact_2": null,
    "preFact_1": {
        "id": "6b0d9e6b-c3d9-480a-870d-67ffe058b7a7",
        "label": "q",
        "fact": null
    },
    "preFact_2": null
},
{
    "id": "cf01ee19-533d-4020-a66e-1711e45e1d94",
    "preFactId_1": "57559697-a107-43ba-8e2b-4ef694e70343",
    "preExp": null,
    "preFactId_2": null,
    "postFactId_1": "ffaeec72-e90f-4961-81b3-56f254d99721",
    "postExp": null,
    "postFactId_2": null,
    "postFact_1": {
        "id": "ffaeec72-e90f-4961-81b3-56f254d99721",
        "label": "y",
        "fact": null
    },
    "postFact_2": null,
    "preFact_1": {
        "id": "57559697-a107-43ba-8e2b-4ef694e70343",
        "label": "m",
        "fact": null
    },
    "preFact_2": null
},
{
    "id": "0d355bea-f3e1-4850-9505-4ab5deb6a17a",
    "preFactId_1": "c9d81192-d6b9-4be9-b71b-486e6e7e86e6",
    "preExp": "AND",
    "preFactId_2": "c0bde0c6-5eff-4b08-9f62-e848ed8f9331",
    "postFactId_1": "72545dca-5f1c-46c8-ba73-28a44f3a5664",
    "postExp": "AND",
    "postFactId_2": "7104251a-f159-4c39-8994-1bae3d67f864",
    "postFact_1": {
        "id": "72545dca-5f1c-46c8-ba73-28a44f3a5664",
        "label": "g",
        "fact": null
    },
    "postFact_2": {
        "id": "7104251a-f159-4c39-8994-1bae3d67f864",
        "label": "z",
        "fact": null
    },
    "preFact_1": {
        "id": "c9d81192-d6b9-4be9-b71b-486e6e7e86e6",
        "label": "w",
        "fact": null
    },
    "preFact_2": {
        "id": "c0bde0c6-5eff-4b08-9f62-e848ed8f9331",
        "label": "x",
        "fact": null
    }
},
]

const defaultRules: Array<Rule> = [];
const baseURL = 'http://localhost:8000/api/infer_engine/';
const baseRuleURL = 'http://localhost:8000/api/rules';

function rules() {
  const [showAddRule, setShowAddRule] = useState(false);
  // fetch rule และ fact เพื่อนำมาใช้ต่อใน CreateRuleBox
  
  const [rules, setRules] = useState(defaultRules);
  // แก้ไข Rule
  const [showEditRule, setShowEditRule] = useState(false);
  const [rule, setRule]: [Rule|null, any] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then(res => {
      setRules(res.data);
    })
  }, [])

  const deleteRule = (id: string) => {
    // ติดต่อ DB
    axios.delete(`${baseRuleURL}/${id}`).then(res => {
      console.log(res.data)
    });

    setRules(prev => {
      return prev.filter(rule => {
        return rule.id !== id
      })
    })
  }

  const addRule = (rule: Rule) => {
    // ติดต่อ DB
    const result = rules.concat(rule);
    setRules(result)
  }

  const editRule = (ruleIn: Rule) => {
    // ติดต่อ db

    const index = rules.findIndex(rule => {
      return rule.id === ruleIn.id
    })

    if(index < 0) {
      return;
    }

    setRules(prev => {
      prev[index] = ruleIn;
      return [...prev]
    })
  }

  const listRules = rules.map((rule) => {
    return (
      <li key={rule.id} className="bg-[#40414E] rounded-xl flex justify-between px-4 py-2 items-center mb-2 cursor-default">
        <span className="font-bold w-4 text-yellow-500">{rule.preFact_1.label}</span>
        <span >{rule.preExp? rule.preExp:'->'}</span>
        <span className="font-bold w-4 text-yellow-500">{rule.preFact_2? rule.preFact_2.label:'-'}</span>
        <span className="font-bold text-green-500">{rule.postFact_1.label??"DevMode"}</span>
        <span >{rule.postExp? rule.postExp:'-'}</span>
        <span className="font-bold text-green-500">{rule.postFact_2? rule.postFact_2.label:'-'}</span>
        <div className="flex items-center">
          <MdEditNote onClick={() => {
            setRule(rule);
            setShowEditRule(true);
          }} className="cursor-pointer mr-2" size={30} />
          <BsTrashFill onClick={() => deleteRule(rule.id)} className="cursor-pointer text-red-600" size={20} />
        </div>
      </li>
    );
  });

  return (
    <>
      <Head>
        <title>Infe | Rule</title>
      </Head>

      {/* <Modal show={true}/> */}
      {showAddRule ? <CreateRuleBox onClose={setShowAddRule} onCreate={addRule}/> : null}
      {showEditRule && rule ? <CreateRuleBox onClose={setShowEditRule} onEdit={editRule} rule={rule}/> : null}

      <div className="h-[calc(100vh-6rem)]">
        <Container className="pt-4 px-2 h-full w-full">
          {/* หัวตาราง */}
          <div className="bg-[#40414E] text-white text-sm flex justify-between rounded-xl px-4 py-2 uppercase overflow-auto">
            <h3 className="bg-[#2b2c30] rounded p-1">F1</h3>
            <h3 className="bg-[#2b2c30] rounded p-1">OP.</h3>
            <h3 className="bg-[#2b2c30] rounded p-1">F2</h3>
            <h3 className="bg-[#2b2c30] rounded p-1">F1_C</h3>
            <h3 className="bg-[#2b2c30] rounded p-1">OP.</h3>
            <h3 className="bg-[#2b2c30] rounded p-1">F2_C</h3>
            <h3 className="bg-[#2b2c30] rounded p-1">Edit</h3>
          </div>
          {/* หัวตาราง */}
          <div className="h-[calc(100%-4.5rem)] mt-5 overflow-auto">
            <ul>
              {listRules.length > 0? listRules:'Rules empty'}
            </ul>
          </div>
        </Container>
        <div className="group rounded-full bg-blue-500 fixed bottom-0 right-0 p-4 mr-6 mb-6 lg:mr-10 lg:mb-10 hover:bg-blue-400 duration-300 shadow-lg shadow-black/50 cursor-pointer">
          <GoPlus
            onClick={() => setShowAddRule(true)}
            className="group-hover:scale-125 duration-150"
            size={20}
          />
        </div>
      </div>
    </>
  );
}

export default rules;
