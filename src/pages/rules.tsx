import Container from "@/UI/Container";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdEditNote } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import CreateRuleBox from "@/components/CreateRuleBox";
import { Fact } from "./facts";
import axios from "axios";

// const fetcher = (url: string) => axios.get(url).then(res => res.data)

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
  postFact_2: Fact | null;
};

const defaultRules: Array<Rule> = [];
const baseURL = "https://vercel-inferance-engine.vercel.app/api/infer_engine";
const baseRuleURL = "https://vercel-inferance-engine.vercel.app/api/rules";

function rules() {
  const [showAddRule, setShowAddRule] = useState(false);
  // fetch rule และ fact เพื่อนำมาใช้ต่อใน CreateRuleBox

  const [rules, setRules] = useState(defaultRules);
  // แก้ไข Rule
  const [showEditRule, setShowEditRule] = useState(false);
  const [rule, setRule]: [Rule | null, any] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setRules(res.data);
    });
  }, []);

  const deleteRule = (id: string) => {
    // ติดต่อ DB
    axios.delete(`${baseRuleURL}/${id}`).then((res) => {
      console.log(res.data);
    });

    setRules((prev) => {
      return prev.filter((rule) => {
        return rule.id !== id;
      });
    });
  };

  const addRule = (rule: Rule) => {
    // ติดต่อ DB
    const result = rules.concat(rule);
    setRules(result);
  };

  const editRule = (ruleIn: Rule) => {
    // ติดต่อ db

    const index = rules.findIndex((rule) => {
      return rule.id === ruleIn.id;
    });

    if (index < 0) {
      return;
    }

    setRules((prev) => {
      prev[index] = ruleIn;
      return [...prev];
    });
  };

  const listRules = rules.map((rule) => {
    return (
      <tr
        key={rule.id}
        className="border-b border-gray-500"
      >
        <td className="font-bold text-yellow-500 px-6 py-4">
          {rule.preFact_1.label}
        </td>
        <td>{rule.preExp ? rule.preExp : "->"}</td>
        <td className="font-bold text-yellow-500">
          {rule.preFact_2 ? rule.preFact_2.label : "-"}
        </td>
        <td className="font-bold text-green-500">
          {rule.postFact_1.label ?? "DevMode"}
        </td>
        <td>{rule.postExp ? rule.postExp : "-"}</td>
        <td className="font-bold text-green-500">
          {rule.postFact_2 ? rule.postFact_2.label : "-"}
        </td>
        <td className="flex items-center justify-center  py-4">
          <MdEditNote
            onClick={() => {
              setRule(rule);
              setShowEditRule(true);
            }}
            className="cursor-pointer mr-2"
            size={30}
          />
          <BsTrashFill
            onClick={() => deleteRule(rule.id)}
            className="cursor-pointer text-red-600"
            size={20}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Head>
        <title>Infe | Rule</title>
      </Head>

      {/* <Modal show={true}/> */}
      {showAddRule ? (
        <CreateRuleBox onClose={setShowAddRule} onCreate={addRule} />
      ) : null}
      {showEditRule && rule ? (
        <CreateRuleBox
          onClose={setShowEditRule}
          onEdit={editRule}
          rule={rule}
        />
      ) : null}

      <div className="h-[calc(100vh-6rem)]">
        <Container className="pt-4 h-full w-full overflow-x-auto">
        <table className="relative w-full table-auto border-collapse text-center md:rounded-t-xl overflow-hidden">
          <thead className="sticky">
            <tr className="bg-[#40414E] text-xl">
              <th className="md:py-3">1st Premise</th>
              <th className="md:py-3">Operation</th>
              <th className="md:py-3">2nd Premise</th>
              <th className="md:py-3">1st Conclude</th>
              <th className="md:py-3">Operation Conclude</th>
              <th className="md:py-3">2nd Conclude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listRules}
          </tbody>
        </table>
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
